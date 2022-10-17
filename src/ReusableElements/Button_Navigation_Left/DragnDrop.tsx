import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";
import "./DragnDrop.css";
import React, { useState, useRef, useContext } from "react";
import SlideButton from "./SlideButton";
// import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import AudienceContainer from "./Audience_container";
import FilterContext, { GeneralSelector } from "../../Data/FilterContext";
import SegmentIcon from "../../Componets/Filters/icons/Segment.svg";
import PlusIcon from "../../Componets/Filters/icons/Plus.svg";

interface DataProps {}
// type IItem = {
//   selector: string;
//   variable_type: string;
//   category: string;
//   id: string;
//   values: GeneralSelector;
// };
export interface IGroup {
  items: GeneralSelector[];
  title: string;
}

export const DragNDrop: React.FC<DataProps> = () => {
  const { data, setData } = useContext(FilterContext);

  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [drop, setDrop] = useState(0);
  // const [data, setList] = useState(data as any);
  // const [audienceBar, setAudienceBar] = useState(data[0]);
  const [listAudience, setListAudience] = useState();
  // const [listBig, setListBig] = useState(data);
  // const [listFilter, setListFilter] = useState();
  // let { id, client, country, cluster } = useParams();

  // console.log(cluster);
  // console.log(data);

  // useEffect(() => {
  //   // setList(() => data);
  // }, [data]);
  // console.log(data);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  const handleDrop = () => {
    setDrop(drop + 1);
    // console.log(drop);
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
      // setList((oldList: any) => {
      //   let newList = JSON.parse(JSON.stringify(oldList));
      //   newList[params.grpI].items.splice(
      //     params.itemI,
      //     0,
      //     newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
      //   );
      //   dragItem.current = params;
      //   localStorage.setItem("List", JSON.stringify(newList));
      //   return newList;
      // });
      setData((oldList: any) => {
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

  // function handleRemoveBig(id: any) {
  //   console.log(listBig);

  //   // setListBig((ps: any) => [...ps.filter((obj: any) => id !== obj)]);
  //   // console.log(listBig);
  // }
  // console.log(data);

  return (
    <div className="entire_slider_audience">
      <SlideButton>
        <div className="drag-n-drop">
          {data.map((grp: IGroup, grpI: number) => {
            // console.log(grp.items);
            if (grp.title === "audition_bar") {
              return (
                <div
                  // className="filterbuttonAudience"
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
                          {grp.items !== null &&
                            grp.items.map((item, itemI: number) => (
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
                                className={
                                  dragging
                                    ? getStyles({ grpI, itemI })
                                    : "dnd-item"
                                }
                                key={item.id}
                                id="Dropdown_container"
                              >
                                <div>
                                  <img
                                    className="Dropdown_plus_sign"
                                    src={SegmentIcon}
                                    alt="Dropdown_plus_sign"
                                  ></img>
                                </div>
                                <div className="Dropdown_filter_container">
                                  <li>{item.selector}</li>
                                  {/* <li>{item.category}</li> */}
                                </div>

                                <div className="Dropdown_plus_sign_container">
                                  <button>
                                    <img
                                      className="Dropdown_plus_sign"
                                      src={PlusIcon}
                                      alt="Dropdown_plus_sign"
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
                        {drop === 0 && (
                          <div className="filter_info">drop filters here</div>
                        )}

                        {grp.items.map((item: GeneralSelector, itemI: any) => (
                          <>
                            <AudienceContainer
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
                              key={item.id}
                              listAudience={listAudience}
                              setListAudience={(item: any) =>
                                setListAudience(item)
                              }
                            ></AudienceContainer>
                          </>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="Dropdown_is_not_open">
                      <div className="filter_droppable_container">
                        {grp.items.map((item: GeneralSelector, itemI: any) => (
                          <>
                            {/* {console.log(grp.items)} */}
                            {/* {console.log(newArray)} */}
                            <AudienceContainer
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
                              key={item.id}
                              listAudience={listAudience}
                              setListAudience={(item: any) =>
                                setListAudience(item)
                              }
                            ></AudienceContainer>
                          </>
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
