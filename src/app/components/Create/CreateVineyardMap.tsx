"use client"

import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Button, Form, Input, Select } from 'antd';
import { AreaType, GeometryType } from '@/app/type';
import { getAreas, postVineyard } from '@/app/server/api/apis';
import ResultContainer from '../Result';


const VineyardMap: React.FC = () => {
    const [geometry, setGeometry] = useState<GeometryType>();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [areas, setAreas] = useState<AreaType[]>();
    const [selectedArea, setSelectedArea] = useState<AreaType>();
    const [isFormVisible, setIsFormVisible] = useState(true);
    const toggleFormVisibility = () => {
        setIsFormVisible((prevValue) => !prevValue);
    };
    const handleCoordinateChange = (index: number, subIndex: number, value: number) => {
        if (geometry) {
            // Deep copy the geometry object to avoid mutating the original state
            const updatedGeometry = JSON.parse(JSON.stringify(geometry));
            // Check if the coordinates array is defined and has the expected structure
            if (
                Array.isArray(updatedGeometry.coordinates) &&
                Array.isArray(updatedGeometry.coordinates[0]) &&
                updatedGeometry.coordinates[0][index] !== undefined &&
                updatedGeometry.coordinates[0][index][subIndex] !== undefined
            ) {
                if (subIndex === 0) {
                    updatedGeometry.coordinates[0][index][0] = value;
                } else if (subIndex === 1) {
                    updatedGeometry.coordinates[0][index][1] = value;
                }

                // Update the state with the modified geometry object
                setGeometry(updatedGeometry);
            } else {
                console.error('Invalid coordinates structure:', updatedGeometry.coordinates);
            }
        }
    };

    const handleDeleteCoordinate = (index: number) => {
        if (geometry) {
            // Create a new array with the selected coordinate pair removed
            const updatedCoordinates = [...geometry.coordinates[0]]; // Create a shallow copy
            updatedCoordinates.splice(index, 1); // Remove the specified coordinate pair

            // Update the state with the new array
            const updatedGeometry = { ...geometry, coordinates: [updatedCoordinates] };
            setGeometry(updatedGeometry);
        }
    };
    const handleSelect = (value: string) => {
        if (areas) {
            setSelectedArea(areas.find((item: { id: string }) => item.id === value));
        }
    };
    const handleSubmit = async (values: any) => {
        const { name, winetype, areanumber, yearofplanning, area } = values;
        console.log(geometry);
        if (geometry) {
            try {
                const response = await postVineyard(
                    name,
                    winetype,
                    areanumber,
                    yearofplanning,
                    area,
                    geometry,
                );
                console.log('Response:', response);
                setSubmitSuccess(true);
            } catch (error) {
                console.error('Failed to submit vineyard:', error);
            }
        }
    };
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 5,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    useEffect(() => {
        getAreas().then((res) => {
            setAreas(res);
        });
    }, []);
    useEffect(() => {
        let map: L.Map | null = null;
        let areaPolygon: L.Polygon | null = null;
        let vineyardPolygon: L.Polygon | null = null;

        if (!map) {
            map = L.map('map');
            if (selectedArea) {
                // Show selectedArea polygon and set map view accordingly
                map.setView(
                    [
                        selectedArea.geometry.coordinates[0][0][0],
                        selectedArea.geometry.coordinates[0][0][1],
                    ],
                    19,
                );
                console.log(selectedArea, 'selectedArea');
                areaPolygon = L.polygon(selectedArea.geometry.coordinates[0], {
                    color: 'purple',
                    weight: 3,
                    fillColor: 'pink',
                    fillOpacity: 0.4,
                }).addTo(map);

                areaPolygon.bindPopup(selectedArea.name).openPopup();

                // // Remove any existing vineyardPolygon when showing selectedArea
                // if (vineyardPolygon) {
                //     vineyardPolygon.remove();
                //     vineyardPolygon = null;
                // }

                // Add click event listener to the map within the area polygon
                // areaPolygon.on('click', (event: L.LeafletMouseEvent) => {
                //     const { lat, lng } = event.latlng;
                //     setGeometry((prevGeometry: any) => [...prevGeometry, [lat, lng]]);
                // });
                areaPolygon.on('click', (event: L.LeafletMouseEvent) => {
                    const { lat, lng } = event.latlng;
                    setGeometry((prevGeometry: GeometryType | undefined) => {
                        if (!prevGeometry) {
                            return {
                                type: 'Polygon',
                                coordinates: [[[lat, lng]]],
                            };
                        }

                        return {
                            ...prevGeometry,
                            coordinates: [[...prevGeometry.coordinates[0], [lat, lng]]],
                        };
                    });
                });
            } else {
                if (navigator.geolocation) {
                    // Get user's current position and show vineyardPolygon
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            if (map) {
                                map.setView([latitude, longitude], 19);

                                // Remove any existing areaPolygon when showing vineyardPolygon
                                if (areaPolygon) {
                                    areaPolygon.remove();
                                    areaPolygon = null;
                                }

                                if (geometry?.coordinates[0]) {
                                    vineyardPolygon = L.polygon(geometry.coordinates[0], {
                                        color: 'purple',
                                        weight: 3,
                                        fillColor: 'pink',
                                        fillOpacity: 0.4,
                                    }).addTo(map);
                                }
                            }
                        },
                        (error) => {
                            console.error('Error getting current position:', error);
                        },
                    );
                }
            }
            if (geometry?.coordinates[0]) {
                vineyardPolygon = L.polygon(geometry.coordinates[0], {
                    color: 'purple',
                    weight: 3,
                    fillColor: 'red',
                    fillOpacity: 0.5,
                }).addTo(map);
            }

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map);

            // Add click event listener to the map
            map.on('click', (event: L.LeafletMouseEvent) => {
                const { lat, lng } = event.latlng;
                setGeometry((prevGeometry: GeometryType | undefined) => {
                    if (!prevGeometry) {
                        return {
                            type: 'Polygon',
                            coordinates: [[[lat, lng]]],
                        };
                    }

                    return {
                        ...prevGeometry,
                        coordinates: [[...prevGeometry.coordinates[0], [lat, lng]]],
                    };
                });
            });
        }

        return () => {
            if (map) {
                map.remove();
                map = null;
            }
            if (vineyardPolygon) {
                vineyardPolygon.remove();
                vineyardPolygon = null;
            }
            if (areaPolygon) {
                areaPolygon.remove();
                areaPolygon = null;
            }
        };
    }, [selectedArea, geometry, setGeometry]);
    return (
        <>
            <Button
                id="button"
                className="tw-z-50 tw-border tw-fixed tw-bottom-0 tw-left-2 tw-border-indigo-500 tw-bg-customPurple tw-text-purple-500 tw-rounded-md tw-px-4 tw-pb-2 tw-m-2 tw-transition tw-duration-500 tw-ease select-none tw-hover:bg-indigo-600 tw-focus:outline-none tw-focus:shadow-outline"
                onClick={toggleFormVisibility}
            >
                {isFormVisible ? 'Hide Form' : 'Show Form'}
            </Button>
            <div id="map" className="tw-fixed tw-h-screen tw-w-screen tw-z-0 tw-top-28 tw-left-0" />
            {submitSuccess && <ResultContainer />}
            {!submitSuccess && isFormVisible && (
                <div
                    id="form"
                    className="tw-container tw-rounded-xl tw-w-1/3 tw-bg-customPurple/70 hover:tw-bg-customPurple tw-absolute tw-text-white tw-top-44 md:tw-top-32 tw-left-4 tw-pt-10 tw-pl-2 tw-pr-6"
                >
                    <Form
                        {...formItemLayout}
                        name="vineyard infomation"
                        style={{
                            maxWidth: 600,
                        }}
                        scrollToFirstError
                        onFinish={handleSubmit}
                    >
                        {' '}
                        <Form.Item
                            key="area"
                            name="area"
                            label="Select Area"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Vineyard Name',
                                },
                                {
                                    type: 'string',
                                    message: 'Please enter a valid string',
                                },
                            ]}
                        >
                            {areas && (
                                <Select
                                    defaultActiveFirstOption
                                    onChange={(value) => handleSelect(value)}
                                >
                                    {areas.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>{' '}
                        {selectedArea && (
                            <Form.Item
                                key="areanumber"
                                name="areanumber"
                                label="Area Order"
                                initialValue={selectedArea.vineyards.length + 1}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the Vineyard Name',
                                    },
                                    {
                                        type: 'number',
                                        message: 'Please enter a valid string',
                                    },
                                ]}
                            >
                                <Input placeholder="Vineyard Area Order" />
                            </Form.Item>
                        )}
                        <Form.Item
                            key="name"
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Vineyard Name',
                                },
                                {
                                    type: 'string',
                                    message: 'Please enter a valid string',
                                },
                            ]}
                        >
                            <Input placeholder="Vineyard Name" />
                        </Form.Item>
                        <Form.Item
                            key="winetype"
                            name="winetype"
                            label="Wine Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Vineyard Name',
                                },
                                {
                                    type: 'string',
                                    message: 'Please enter a valid string',
                                },
                            ]}
                        >
                            <Select defaultActiveFirstOption>
                                <Select.Option value="Red Wine">Red Wine</Select.Option>
                                <Select.Option value="White Wine">White Wine</Select.Option>
                                <Select.Option value="Rosé Wine">Rosé Wine</Select.Option>
                                <Select.Option value="Sparkling Wine">Sparkling Wine</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            key="yearofplanning"
                            name="yearofplanning"
                            label="Year Of Planning"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Vineyard Name',
                                },
                                {
                                    type: 'string',
                                    message: 'Please enter a valid number',
                                },
                            ]}
                        >
                            <Input placeholder="Vineyard Year Of Planning" />
                        </Form.Item>
                        {geometry &&
                            geometry.coordinates[0].map((coordinatePair, index: number) => (
                                <div key={index}>
                                    <Form.Item label={`Latitude ${index + 1}`}>
                                        <Input
                                            value={coordinatePair[0]}
                                            onChange={(e) =>
                                                handleCoordinateChange(
                                                    index,
                                                    0,
                                                    parseFloat(e.target.value) || 0,
                                                )
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item label={`Longitude ${index + 1}`}>
                                        <Input
                                            value={coordinatePair[1]}
                                            onChange={(e) =>
                                                handleCoordinateChange(
                                                    index,
                                                    1,
                                                    parseFloat(e.target.value) || 0,
                                                )
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        key="deleteButton"
                                        name="deleteButton"
                                        label="Delete"
                                    >
                                        <Button
                                            id="button"
                                            onClick={() => handleDeleteCoordinate(index)}
                                        >
                                            Delete This Point
                                        </Button>
                                    </Form.Item>
                                </div>
                            ))}
                        <Form.Item label="Submit">
                            <Button key="submit" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
            {submitSuccess && <ResultContainer />}
        </>
    );
};

export default VineyardMap;
