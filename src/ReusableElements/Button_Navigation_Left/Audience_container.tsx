import React, { useState } from "react";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import OkayIcon from "../../Componets/Navigation/icons/Okay.svg";
import "./Audience_container.css";

type Props = {
  item: any;
  grpI: number;
  itemI: any;
  dragging: any;
  handleDragStart(e: any, params: any): any;
  handleDragEnter(e: any, params: any): any;
  getStyles(params: any): any;
};

const AudienceContainer = (props: Props) => {
  const [isOpenDropDown, setOpenDropDown] = React.useState(false);
  const [isActiveDropDown, setIsActiveDropDown] = useState(false);

  const handleClickDropDown = () => {
    setOpenDropDown(!isOpenDropDown);
    setIsActiveDropDown((current) => !current);
  };

  const params = {
    grpI: props.grpI,
    itemI: props.itemI,
  };

  console.log(props.item.variable_type);

  // if (props.item.variable_type === "numerical") {
  //   console.log(props.item.min, props.item.max);
  // } else {
  //   props.item.values.map((item: any) => {
  //     console.log(item);
  //     // item.map((element: any) => {
  //     //   console.log(element);
  //     // });
  //   });
  // }

  function Allfunctions() {
    handleClickDropDown();
  }

  return (
    <>
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
              <li>{props.item.selector}</li>
            </div>

            <button
              type="button"
              onClick={() => {
                Allfunctions();
              }}
            >
              {isActiveDropDown ? (
                <img
                  src={ArrrowupIcon}
                  className="Dropdown_plus_sign"
                  alt="Dropdown_plus_sign"
                ></img>
              ) : (
                <img
                  src={ArrrowdownIcon}
                  className="Dropdown_plus_sign"
                  alt="Dropdown_plus_sign"
                ></img>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={isActiveDropDown ? "filters_all" : "hidden"}>
        {props.item.variable_type === "numerical" ? (
          <div className="MinMax_container">
            <div className="price-input">
              <div className="all_button">
                <button>
                  All
                  <input type="checkbox"></input>
                </button>
              </div>
              <div className="field">
                <div className="filed_container">
                  <div className="Min">
                    <span>Min</span>
                    <input
                      type="number"
                      className="input-min"
                      value={props.item.min}
                    />
                  </div>
                  <div className="Max">
                    <span>Max</span>
                    <input
                      type="number"
                      className="input-max"
                      value={props.item.max}
                    />
                  </div>
                </div>

                <div className="slider">
                  <div className="progress"></div>
                </div>

                <div className="range-input">
                  <input
                    type="range"
                    className="range-min"
                    min={props.item.min}
                    max={props.item.max}
                    value={props.item.min}
                  />
                  <input
                    type="range"
                    className="range-max"
                    min={props.item.min}
                    max={props.item.max}
                    value={props.item.max}
                  />
                </div>
              </div>
              <div className="Delete_button">
                <button>Delete filter</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="categorical">
            <div className="all_button">
              <button>
                All
                <input type="checkbox"></input>
              </button>
            </div>
            <div className="items_list">
              {props.item.values.map((item: any, key: any) => (
                <li key={item.id}>
                  {item.value}
                  <button>
                    <img src={OkayIcon} alt=""></img>
                  </button>
                </li>
              ))}
            </div>

            <div className="Delete_button">
              <button>Delete filter</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AudienceContainer;

/* {isActiveDropDown && props.item.values?.map((e: any) => <li>{e}</li>)} */
