import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Button, Form, Input } from 'antd';
import { GeometryType } from '@/app/type';
import { NewAreaForm } from './NewAreaForm';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 16,
        },
        sm: {
            span: 16,
        },
    },
};

const AreaMap: React.FC = () => {
    const [geometry, setGeometry] = useState<GeometryType | undefined>();
    const [isFormVisible, setIsFormVisible] = useState(true);
    const toggleFormVisibility = () => {
        setIsFormVisible((prevValue) => !prevValue);
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

    useEffect(() => {
        let map: L.Map | null = null;
        let areaPolygon: L.Polygon | null = null;
        if (!map) {
            map = L.map('map');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        map?.setView([latitude, longitude], 19);
                        if (geometry?.coordinates[0]) {
                            areaPolygon = L.polygon(geometry.coordinates[0], {
                                color: 'purple',
                                weight: 3,
                                fillColor: 'pink',
                                fillOpacity: 0.4,
                            }).addTo(map!);
                            areaPolygon.bindPopup('New Area').openPopup();
                        }
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    },
                );
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
            if (areaPolygon) {
                areaPolygon.remove();
                areaPolygon = null;
            }
        };
    }, [geometry]);

    return (
        <>
            <Button
                id="button"
                className="tw-z-50 tw-fixed tw-bottom-0 tw-left-2 tw-bg-customPurple/60 tw-text-purple-500 tw-rounded-md tw-px-4 tw-pb-2 tw-m-2 hover:tw-bg-customPurple"
                onClick={toggleFormVisibility}
            >
                {isFormVisible ? 'Hide Geometry Form' : 'Show Geometry Form'}
            </Button>
            <div id="map" className="tw-fixed tw-h-screen tw-w-screen tw-z-0 tw-top-28 tw-left-0" />
            {geometry && <NewAreaForm type={geometry?.type} coordinates={geometry?.coordinates} />}
            {isFormVisible && (
                <div
                    id="form"
                    className="tw-container tw-rounded-xl tw-w-1/3 tw-bg-customPurple/70 hover:tw-bg-customPurple tw-absolute tw-text-white tw-top-44 md:tw-top-32 tw-left-4 tw-pt-10 tw-pl-2 tw-pr-6"
                >
                    <Form {...formItemLayout}>
                        {geometry &&
                            geometry.coordinates[0].map((coordinatePair, index) => (
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
                    </Form>
                </div>
            )}
        </>
    );
};

export default AreaMap;
