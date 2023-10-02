import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

import { useFormik } from 'formik';

import { GeometryType } from '@/app/type';
import { createArea } from '@/app/server/api/apis';
import ResultContainer from '../Result';

export const NewAreaForm = (geometry: GeometryType) => {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submissionError, setSubmissionError] = useState(null); // State to handle submission errors
    const [visible, setVisible] = useState(true);
    const handleClose = () => {
        setVisible(false);
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            geometry,
        },
        onSubmit: async (values) => {
            // Add 'async' here
            const { name, code } = values;
            // const geoJsonPolygon = {
            //     type: 'Polygon',
            //     coordinates: [geometry],
            // };
            // const data = {
            //     name,
            //     code,
            //     geometry: geoJsonPolygon,
            // };
            if (!values.name || !values.code) {
                console.error('Missing required fields in data:', values);
                return;
            }

            try {
                if (geometry) {
                    const response = await createArea(name, code, geometry);
                    console.log('Response:', response);
                    setSubmitSuccess(true);
                }
            } catch (error: any) {
                setSubmissionError(error.message);
                console.error('Failed to submit area:', error);
            }
        },
    });

    return (
        <>
            {!submitSuccess && visible && (
                <>
                    <form
                        id="Container"
                        className="tw-z-50 tw-fixed md:tw-right-8 tw-top-1/4 tw-right-1/4 tw-transform  tw-bg-gradient-to-b tw-from-violet-300 tw-via-purple-300 tw-to-violet-50 tw-rounded-lg tw-shadow-md tw-p-6 sm:tw-p-8"
                        onSubmit={formik.handleSubmit}
                    >
                        {submissionError && (
                            <p className="tw-text-red-600 tw-mb-4">{submissionError}</p>
                        )}
                        <button
                            className="tw-absolute tw-top-2 tw-right-2 tw-text-black tw-rounded-full tw-outline-none tw-shadow-md"
                            onClick={handleClose}
                        >
                            X
                        </button>

                        <div className="tw-mb-4">
                            <label htmlFor="name" className="tw-block tw-font-bold">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded"
                            />
                        </div>
                        <div className="tw-mb-4">
                            <label htmlFor="email" className="tw-block tw-font-bold">
                                Code
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="code"
                                onChange={formik.handleChange}
                                value={formik.values.code}
                                className="tw-w-full tw-px-3 tw-py-2 tw-border tw-rounded"
                            />
                        </div>
                        <button
                            id="button"
                            type="submit"
                            className="tw-bg-customPurple tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-w-full sm:tw-w-auto"
                        >
                            Submit
                        </button>
                    </form>
                </>
            )}
            {submitSuccess && <ResultContainer />}
        </>
    );
};
