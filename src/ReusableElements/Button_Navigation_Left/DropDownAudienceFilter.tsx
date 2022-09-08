import React, { useEffect, useRef, useState } from "react";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import "./Button.css";
import "./DropDownAudienceFilter.css";

function DropdownAudienceFilter() {
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleClick();
      }}
      className="button_audition_filter"
    >
      {isActive ? (
        <img src={ArrrowupIcon} className="Dropdown_plus_sign"></img>
      ) : (
        <img src={ArrrowdownIcon} className="Dropdown_plus_sign"></img>
      )}

      {isOpen && (
        <div className="Dropdown" id="Dropdown_audience_filter">
          <div className="Dropdown_box" id="Dropdown_audience_filter_box">
            <div>
              <li>This is an element</li>
              <li>This is an element</li>
              <li>This is an element</li>
              <li>This is an element</li>
            </div>
            <div className="button_with_all_graphs_container">
              <button className="button_with_all_graphs">See All Graphs</button>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

export default DropdownAudienceFilter;
