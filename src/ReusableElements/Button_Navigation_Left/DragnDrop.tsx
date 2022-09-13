import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";
import "./DragnDrop.css";
import React, { useState, useRef } from "react";
import DropdownAudienceFilter from "./DropDownAudienceFilter";
import PlusIcon from "../../Componets/Navigation/icons/Plus.svg";
import Format from "../../Data/format.json";

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

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  const dragItem = useRef<any>();
  const dragNode = useRef<any>();

  const handleDragStart = (e: any, params: any) => {
    // console.log("drag starting", params);
    dragItem.current = params; // now everytime I drag something I set the useref so I have directions
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e: any, params: any) => {
    // console.log("Entering drag", params);
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

  console.log(dictionary);

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
                dragging && !grp.items.length
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
                      <li>{item.filter}</li>
                    </div>
                    <div className="Dropdown_plus_sign_container">
                      <button>
                        <DropdownAudienceFilter filter={item.filters} />
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
