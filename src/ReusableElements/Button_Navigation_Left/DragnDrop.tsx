import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";
import "./DragnDrop.css";
import React, { useState, useRef, useContext, useEffect } from "react";
import SlideButton from "./SlideButton";
import AudienceContainer from "./Audience_container";
import FilterContext, { GeneralSelector } from "../../Data/FilterContext";
import SegmentIcon from "../../Componets/Filters/icons/Segment.svg";
import PlusIcon from "../../Componets/Filters/icons/Plus.svg";
import {
  GlobalModal,
  MODAL_TYPES,
  useGlobalModalContext,
} from "../../Componets/Dashboard/Modals/GlobalModal";
import AudienceDownAudience from "../../Componets/Navigation/icons/ArrowDownAudience.svg";

// interface DataProps {}

type Props = {
  // id: string;
  name: string;
  id: string;
};

export interface IGroup {
  items: GeneralSelector[];
  title: string;
}

export const DragnDrop = (name: Props, id: Props) => {
  const { data, setData, setArrayLeft, setArrayRight } =
    useContext(FilterContext);
  const { arrayData, audience, deleteItemAudience } = useGlobalModalContext();

  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [drop, setDrop] = useState(0);

  const [listAudience, setListAudience] = useState();

  const [openModal, setOpenModal] = React.useState(false);
  const { showModal } = useGlobalModalContext();

  // useEffect(() => {
  //   console.log(id);
  // }, [id]);
  // console.log(id);
  // console.log(name.id);

  const createModal = () => {
    showModal(MODAL_TYPES.CREATE_MODAL, {
      title: "Create instance form",
      confirmBtn: "Save",
    });
  };

  const deleteModal = () => {
    showModal(MODAL_TYPES.DELETE_MODAL);
  };

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  // console.log(arrayData);

  if (arrayData.length > 0) {
    data[0].items = arrayData;
  }

  // console.log(data);

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
      setData((oldList: any) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        localStorage.setItem("List", JSON.stringify(newList));
        console.log(newList);
        return newList;
      });
    // console.log(data[0].items);
    setArrayLeft(data[0].items);
    setArrayRight(data[1].items);
  };

  // console.log(audience);

  const handleDragEnd = () => {
    // console.log("Ending drag");
    // console.log(id);

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
      return "current dnd-item";
    }
    return "dnd-item";
  };

  // console.log(name.name);

  return (
    <div className="entire_slider_audience">
      <div className="drag-n-drop">
        {/* {key === } */}
        {data.map((grp: IGroup, grpI: number) => {
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
                <span>{name.name}</span>
                <button type="button" className="buttonaudience">
                  <div
                    className="filterbuttonAudience"
                    style={{
                      backgroundColor: isActive ? "white" : "white",
                    }}
                  >
                    <div
                      className={
                        isActive
                          ? "PlusIcon_container_open"
                          : "PlusIcon_container"
                      }
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      <div className="PlusIcon"></div>
                    </div>
                    <div
                      className="PlusIcon_container"
                      onClick={() => {
                        deleteItemAudience(name.id);
                      }}
                    >
                      <div className="DeleteButton"></div>
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
                              <div className="Dropdown_filter_container">
                                <div>
                                  <img
                                    className="Dropdown_plus_sign"
                                    src={SegmentIcon}
                                    alt="Dropdown_plus_sign"
                                  ></img>
                                </div>
                                <li>{item.selector}</li>
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
              <>
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

                        <div className="SaveFilter_button">
                          <button
                            className="button_filter"
                            id="openModalBtn"
                            onClick={() => {
                              // setOpenModal(true);
                              createModal();
                            }}
                          >
                            <div>Save audience</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="Dropdown_is_not_open">
                      <div className="filter_droppable_container">
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
                  )}
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DragnDrop;
