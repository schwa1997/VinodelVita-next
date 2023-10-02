"use client"

import NotFoundPage from "@/app/components/404";
import EditAreaMap from "@/app/components/Edit/EditAreaMap";

const EditArea = () => {
    const role = localStorage.getItem('role');
    return (
        <>
            {role === 'admin' || role === 'agronomists' ? (
                <NotFoundPage />
            ) : (
                <div id="form" className="tw-overflow-y-scroll">
                    <EditAreaMap />
                </div>
            )}
        </>
    );
};
export default EditArea;
