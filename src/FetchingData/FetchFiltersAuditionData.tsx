import React, { useState, useEffect } from "react";
import Format from "../Data/format.json";

function FetchdataFilter() {
  console.log(Format);
  return (
    <div>
      {/* {Format.map((item: any) => (
        <div>
          <div className="Dropdown_filter_container">
            <li>{item.audience}</li>
            <li>{item.filters}</li>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default FetchdataFilter;
