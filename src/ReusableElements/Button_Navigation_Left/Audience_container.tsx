import React, { useState } from "react";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import "./Audience_container.css";

type Props = {
  item: any;
  grpI: number;
  itemI: any;
  dragging: any;
  handleDragStart(e: any, params: any): any;
  handleDragEnter(e: any, params: any): any;
  getStyles(params: any): any;
  //   handleClickDropDown():any
  //   isActiveDropDown: boolean,
};

const Audience_container = (props: Props) => {
  const [isOpenDropDown, setOpenDropDown] = React.useState(false);
  const [isActiveDropDown, setIsActiveDropDown] = useState(false);

  const handleClickDropDown = () => {
    setOpenDropDown(!isOpenDropDown);
    setIsActiveDropDown((current) => !current);
  };

  /*       const [selectedFilters, setSelectedFilters] = useState<any>();
  console.log(selectedFilters); */
  const params = {
    grpI: props.grpI,
    itemI: props.itemI,
  };
  return (
    <div
      draggable
      onDragStart={(e) => props.handleDragStart(e, params)}
      onDragEnter={
        props.dragging
          ? (e) => {
              props.handleDragEnter(e, params);
            }
          : undefined
      }
      className={props.dragging ? props.getStyles(params) : "dnd-item"}
      id={
        isActiveDropDown
          ? "Dropdown_container_arrow_button_open"
          : "Dropdown_container"
      }
    >
      <div className="Filter_on_left_side_contianer">
        <div
          className={
            isActiveDropDown
              ? "Filter_on_left_side_active"
              : "Filter_on_left_side"
          }
        >
          <div className="Dropdown_filter_container">
            <img src={props.item.logo}></img>
            <li>{props.item.description}</li>
          </div>

          <button
            type="button"
            onClick={() => {
              handleClickDropDown();
            }}
          >
            {isActiveDropDown ? (
              <img src={ArrrowupIcon} className="Dropdown_plus_sign"></img>
            ) : (
              <img src={ArrrowdownIcon} className="Dropdown_plus_sign"></img>
            )}
          </button>
        </div>

        <div className={isActiveDropDown ? "filters_all" : "hidden"}>
          <div>All</div>
          {isActiveDropDown &&
            props.item.filters?.map((e: any) => <li>{e}</li>)}
          <div>Delete filter</div>
        </div>
      </div>
    </div>
  );
};

export default Audience_container;
