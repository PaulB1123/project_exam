import React, { useEffect, useRef, useState } from "react";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import "./Button.css";
import "./DropDownAudienceFilter.css";

interface DataDropdwon {
  filter: any;
}

const DropdownAudienceFilter: React.FC<DataDropdwon> = ({ filter }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  return (
    <div className="button_audition_filter">
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        {isActive ? (
          <img src={ArrrowupIcon} className="Dropdown_plus_sign"></img>
        ) : (
          <img src={ArrrowdownIcon} className="Dropdown_plus_sign"></img>
        )}
      </button>
      {isOpen && (
        <div className="Dropdown" id="Dropdown_audience_filter">
          <div className="Dropdown_box" id="Dropdown_audience_filter_box">
            <div className="Dropdown_filters_content">
              <ul className="Dropdown_filters_content_main_container">
                <div className="Dropdown_filters_content_checklist_container">
                  <label>None</label>
                  <input
                    type="checkbox"
                    className="Dropdown_filters_content_checklist"
                  ></input>
                </div>
                <div className="Dropdown_filters_content_checklist_container">
                  <label> All</label>
                  <input
                    type="checkbox"
                    className="Dropdown_filters_content_checklist"
                  ></input>
                </div>
              </ul>
              <ul className="filter_content">
                {filter.map((item: any) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
            <div className="button_with_all_graphs_container">
              <button className="button_with_all_graphs">Delete filter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownAudienceFilter;
