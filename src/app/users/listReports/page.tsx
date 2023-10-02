"use client";

import ListReportsAsAgronomist from "@/app/components/List/listReportsAsAgronomist";
import ListReports from "@/app/components/List/listReportsAsUsers";

const ListReportByRoles = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="tw-grid tw-place-content-center">
        {role === "admin" || role === "agronomists" ? (
          <ListReportsAsAgronomist />
        ) : (
          <ListReports />
        )}
      </div>
    </>
  );
};
export default ListReportByRoles;
