import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";
import "./DragnDrop.css";
import React, { useState, useRef } from "react";
// import DropdownAudienceFilter from "./DropDownAudienceFilter";
import PlusIcon from "../../Componets/Navigation/icons/Plus.svg";
import Format from "../../Data/format.json";
import SlideButton from "./SlideButton";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import Audience_container from "./Audience_container";

interface DataProps {
  data: any;
}
type IItem = {
  add: string;
  logo: string;
  id: string;
  description: string;
  category: string;
};
interface IGroup {
  items: IItem[];
  title: string;
}

export const DragNDrop: React.FC<DataProps> = ({ data }) => {
  const [list, setList] = useState(data);
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [drop, setDrop] = useState(0);
  // const [isOpenDropDown, setOpenDropDown] = React.useState(false);
  // const [isActiveDropDown, setIsActiveDropDown] = useState(false);

  // const handleClickDropDown = () => {
  //   setOpenDropDown(!isOpenDropDown);
  //   setIsActiveDropDown((current) => !current);
  // };

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  const handleDrop = () => {
    setDrop(drop + 1);
    console.log(drop);
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
    if (e.target !== dragNode.current)
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

  const xx = [
    {
      id: "1",
      // logo: DefaultIcon,
      description: "Segment",
      add: PlusIcon,
      filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
      category: " A bar",
    },
    {
      id: "2",
      // logo: GenderIcon,
      description: "Gender",
      add: PlusIcon,
      filters: [
        "This is another text that I have to make ",
        "18-30",
        "31-40",
        "41-50",
        "51-60",
        "61+",
        "unknown",
      ],
      category: " A bar",
    },
    {
      id: "3",
      // logo: DefaultIcon,
      description: "Age Group",
      add: PlusIcon,
      filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
      category: " A bar",
    },
    {
      id: "4",
      // logo: DefaultIcon,
      description: "Region",
      add: PlusIcon,
      filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
      category: " A bar",
    },
    {
      id: "5",
      // logo: DefaultIcon,
      description: "Tier",
      add: PlusIcon,
      filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
      category: "blabla",
    },
    {
      id: "6",
      // logo: DefaultIcon,
      description: "Offer Copy",
      add: PlusIcon,
      filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
      category: "blabla",
    },
  ] as unknown as IItem[];

  let CategoryArray = [];

  let dictionary = Object.assign(
    {},
    ...xx.map(
      (x) => ({
        [x.category]: { id: x.id, description: x.description },
      })
      // CategoryArray = [...CategoryArray, [x.category]]
    )
  );

  // console.log(dictionary);

  const handleDragEnd = () => {
    // console.log("Ending drag");

    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    handleDrop();
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

  // const [selectedFilters, setSelectedFilters] = useState<any>();
  // console.log(selectedFilters);

  return (
    <div className="entire_slider_audience">
      <SlideButton>
        <div className="drag-n-drop">
          {list.map((grp: IGroup, grpI: number) => {
            // console.log(grp.items);
            if (grp.title === "audition_bar") {
              return (
                <div
                  key={grp.title}
                  onDragEnter={
                    dragging && !grp.items.length
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
                      style={{
                        backgroundColor: isActive ? "#d9d9d9" : "white",
                      }}
                    >
                      <div
                        className={
                          isActive
                            ? "PlusIcon_container_open"
                            : "PlusIcon_container"
                        }
                      >
                        <div className="PlusIcon"></div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="Dropdown_Audience_Main_Group">
                      <div className="Dropdown_Audience">
                        <div className="Dropdown_box_Audience">
                          {grp.items.map((item, itemI: number) => (
                            <div
                              key={item.id}
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
                              className={
                                dragging
                                  ? getStyles({ grpI, itemI })
                                  : "dnd-item"
                              }
                              id="Dropdown_container"
                            >
                              <div className="Dropdown_filter_container">
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
                // {isOpen && (<div></) }
                <div
                  key={grp.title}
                  onDragEnter={
                    dragging && !grp.items.length
                      ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                      : undefined
                  }
                  className="dropDown_row_bar"
                >
                  {isOpen ? (
                    <div className="Dropdown_is_open">
                      <div className="filter_droppable_container" ref={this}>
                        {drop == 0 && (
                          <div className="filter_info">drop filters here</div>
                        )}

                        {grp.items.map((item: any, itemI: any) => (
                          <Audience_container
                            dragging={dragging}
                            grpI={grpI}
                            itemI={itemI}
                            handleDragStart={(e: any, params: any) =>
                              handleDragStart(e, params)
                            }
                            handleDragEnter={(e: any, params: any) =>
                              handleDragEnter(e, params)
                            }
                            // handleClickDropDown={handleClickDropDown}
                            getStyles={(params: any) => getStyles(params)}
                            // isActiveDropDown={isActiveDropDown}
                            item={item}
                            key={item.audience_id}
                          ></Audience_container>

                          // <div
                          //   key={item.id}
                          //   draggable
                          //   onDragStart={(e) =>
                          //     handleDragStart(e, { grpI, itemI })
                          //   }
                          //   onDragEnter={
                          //     dragging
                          //       ? (e) => {
                          //           handleDragEnter(e, { grpI, itemI });
                          //         }
                          //       : undefined
                          //   }
                          //   className={
                          //     dragging ? getStyles({ grpI, itemI }) : "dnd-item"
                          //   }
                          //   id="Dropdown_container"
                          // >
                          //   <div className="Dropdown_filter_container">
                          //     <img src={item.logo}></img>
                          //     <li>{item.description}</li>
                          //   </div>

                          //   <button
                          //     type="button"
                          //     onClick={() => {
                          //       handleClickDropDown();
                          //     }}
                          //   >
                          //     {isActiveDropDown ? (
                          //       <img
                          //         src={ArrrowupIcon}
                          //         className="Dropdown_plus_sign"
                          //       ></img>
                          //     ) : (
                          //       <img
                          //         src={ArrrowdownIcon}
                          //         className="Dropdown_plus_sign"
                          //       ></img>
                          //     )}
                          //   </button>

                          //   {selectedFilters?.map((e: any) => (
                          //     <li>{e}</li>
                          //   ))}
                          // </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="Dropdown_is_not_open">
                      <div className="filter_droppable_container">
                        {grp.items.map((item: any, itemI: any) => (
                          <Audience_container
                            dragging={dragging}
                            grpI={grpI}
                            itemI={itemI}
                            handleDragStart={(e: any, params: any) =>
                              handleDragStart(e, params)
                            }
                            handleDragEnter={(e: any, params: any) =>
                              handleDragEnter(e, params)
                            }
                            // handleClickDropDown={handleClickDropDown}
                            getStyles={(params: any) => getStyles(params)}
                            // isActiveDropDown={isActiveDropDown}
                            item={item}
                            key={item.audience_id}
                          ></Audience_container>
                          // <div
                          //   key={item.id}
                          //   draggable
                          //   onDragStart={(e) =>
                          //     handleDragStart(e, { grpI, itemI })
                          //   }
                          //   onDragEnter={
                          //     dragging
                          //       ? (e) => {
                          //           handleDragEnter(e, { grpI, itemI });
                          //         }
                          //       : undefined
                          //   }
                          //   className={
                          //     dragging ? getStyles({ grpI, itemI }) : "dnd-item"
                          //   }
                          //   id="Dropdown_container"
                          // >
                          //   <div className="this_is_for_entire_button">
                          //     <div className="Dropdown_filter_container">
                          //       <img src={item.logo}></img>
                          //       <li>{item.description}</li>
                          //       {/* <li>{item.filter}</li> */}
                          //     </div>

                          //     {/* <DropdownAudienceFilter
                          //       filters={item.filters}
                          //       setSelectedFilters={(selectedFilters: any) =>
                          //         setSelectedFilters(selectedFilters)
                          //       }
                          //       handleClickDropDown={(
                          //         handleClickDropDown: any
                          //       ) => handleClickDropDown(handleClickDropDown)}
                          //     /> */}
                          //   </div>

                          //   <button
                          //     type="button"
                          //     onClick={() => {
                          //       handleClickDropDown();
                          //     }}
                          //   >
                          //     {isActiveDropDown ? (
                          //       <img
                          //         src={ArrrowupIcon}
                          //         className="Dropdown_plus_sign"
                          //       ></img>
                          //     ) : (
                          //       <img
                          //         src={ArrrowdownIcon}
                          //         className="Dropdown_plus_sign"
                          //       ></img>
                          //     )}
                          //   </button>

                          //   {/* <div
                          //     style={{
                          //       border: "1px solid black",
                          //       width: "100%",
                          //       height: "100px",
                          //     }}
                          //   > */}
                          //   {selectedFilters?.map((e: any) => (
                          //     <li>{e}</li>
                          //   ))}
                          //   {/* </div> */}
                          // </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </SlideButton>
    </div>
  );
};

export default DragNDrop;
