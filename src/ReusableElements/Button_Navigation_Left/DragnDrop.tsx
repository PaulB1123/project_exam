import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";
import "./DragnDrop.css";
import React, { useState, useRef } from "react";
import DropdownAudienceFilter from "./DropDownAudienceFilter";

interface DataProps {
  data: any;
}

export const DragNDrop: React.FC<DataProps> = ({ data }) => {
  const [list, setList] = useState(data);
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const handleDragStart = (e: any, params: any) => {
    console.log("drag starting", params);
    dragItem.current = params; // now everytime I drag something I set the useref so I have directions
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e: any, params: any) => {
    console.log("Entering drag", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) console.log("Target is not the same");
    setList((oldList: any) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[params.grpI].items.splice(
        params.itemI,
        0,
        newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
      );
      dragItem.current = params;
      localStorage.setItem("List", JSON.stringify(newList));
      return newList;
    });
  };

  const handleDragEnd = () => {
    // console.log("Ending drag");

    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params: any) => {
    const currentItem: any = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      //    console.log(currentItem.grpI, params.grpI, currentItem.itemI, params.itemI)
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp: any, grpI: any) => {
        // console.log(grp.items);
        if (grp.title === "audition_bar") {
          return (
            <div
              key={grp.title}
              onDragEnter={
                dragging && !grp.items.lenght
                  ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                  : undefined
              }
              className="dropDown_button"
            >
              <button
                type="button"
                className="buttonaudience"
                onClick={() => {
                  handleClick();
                }}
              >
                <div
                  className="filterbuttonAudience"
                  style={{ backgroundColor: isActive ? "#d9d9d9" : "white" }}
                >
                  <div className="PlusIcon_container">
                    <div className="PlusIcon"></div>
                  </div>
                </div>
              </button>
              {isOpen && (
                <div className="Dropdown_Audience_Main_Group">
                  <div className="Dropdown_Audience">
                    <div className="Dropdown_box_Audience">
                      {grp.items.map((item: any, itemI: any) => (
                        <div
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, { grpI, itemI })
                          }
                          onDragEnter={
                            dragging
                              ? (e) => {
                                  handleDragEnter(e, { grpI, itemI });
                                }
                              : undefined
                          }
                          key={item}
                          className={
                            dragging ? getStyles({ grpI, itemI }) : "dnd-item"
                          }
                          id="Dropdown_container"
                        >
                          <div className="Dropdown_filter_container">
                            {/* <li>{item.id}</li> */}
                            {/* <li>{itemI}</li> */}
                            <img src={item.logo}></img>
                            <li>{item.description}</li>
                          </div>
                          <div className="Dropdown_plus_sign_container">
                            <button>
                              <img
                                className="Dropdown_plus_sign"
                                src={item.add}
                              ></img>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        } else {
          return (
            <div
              key={grp.title}
              onDragEnter={
                dragging && !grp.items.lenght
                  ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                  : undefined
              }
              className="dropDown_row_bar"
            >
              <div className="filter_droppable_container">
                {grp.items.map((item: any, itemI: any) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                    onDragEnter={
                      dragging
                        ? (e) => {
                            handleDragEnter(e, { grpI, itemI });
                          }
                        : undefined
                    }
                    className={
                      dragging ? getStyles({ grpI, itemI }) : "dnd-item"
                    }
                    id="Dropdown_container"
                  >
                    <div className="Dropdown_filter_container">
                      {/* <li>{grpI}</li> */}
                      {/* <li>{item.id}</li> */}
                      <img src={item.logo}></img>
                      <li>{item.description}</li>
                    </div>
                    <div className="Dropdown_plus_sign_container">
                      <button>
                        <DropdownAudienceFilter />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default DragNDrop;
