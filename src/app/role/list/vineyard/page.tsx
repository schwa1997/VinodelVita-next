"use client"

import ListVineyardsAsAgronomist from "@/app/components/List/AgoDisplayVineyards";
import ListVineyards from "@/app/components/List/ListVineyard";

const ListVineyardByRoles = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      {role === "admin" || role === "agronomists" ? (
        <ListVineyardsAsAgronomist />
      ) : (
        <div id="form" className="tw-overflow-y-scroll">
          <ListVineyards />
        </div>
      )}
    </>
  );
};
export default ListVineyardByRoles;
