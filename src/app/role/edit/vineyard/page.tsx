"use client"

import NotFoundPage from "@/app/components/404";
import EditVineyardMap from "@/app/components/Edit/EditVineyardMap";


const EditVineyard = () => {
    const role = localStorage.getItem('role');
    return (
        <>
            {role === 'admin' || role === 'agronomists' ? (
                <NotFoundPage />
            ) : (
                <div id="form" className="tw-overflow-y-scroll">
                    <EditVineyardMap />
                </div>
            )}
        </>
    );
};
export default EditVineyard;
