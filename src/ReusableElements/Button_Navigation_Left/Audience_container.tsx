import React, { useEffect, useState, useContext } from "react";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import OkayIcon from "../../Componets/Navigation/icons/Okay.svg";
import SegmentIcon from "../../Componets/Filters/icons/Segment.svg";
import "./Audience_container.css";
import FilterContext from "../../Data/FilterContext";

type Props = {
  item: any;
  grpI: number;
  itemI: any;
  dragging: any;
  handleDragStart(e: any, params: any): any;
  handleDragEnter(e: any, params: any): any;
  getStyles(params: any): any;
  listAudience: any;
  setListAudience(e: any, params: any): any;
};

const AudienceContainer = (props: Props) => {
  const [isOpenDropDown, setOpenDropDown] = useState(false);
  const [isActiveDropDown, setIsActiveDropDown] = useState(false);
  const [ele, setEle] = useState(true) as any;
  const [listFilter, setListFilter] = useState(props.item);
  // const [newList, setNewList] = useState(
  //   JSON.parse(JSON.stringify(listFilter))
  // );
  // const [newstate, setNewstate] = useState({});
  // const [newArray, setNewArray] = useState([]);

  const { updateSelectorSelectedValue } = useContext(FilterContext);

  const params = {
    grpI: props.grpI,
    itemI: props.itemI,
  };

  // console.log(newArray);

  // useEffect(() => {
  //   if (listFilter.variable_type === "categorical") {
  //     listFilter.values.map((itemList: any) => {
  //       // itemList.isSelected = true;
  //       console.log("a venit aici");
  //     });
  //   } else {
  //   }
  // }, []);

  const handleClickDropDown = () => {
    setOpenDropDown(!isOpenDropDown);
    setIsActiveDropDown((current) => !current);

    // const reformattedArray = list.values.map((item: any) => item);
    // // console.log(reformattedArray);
    // const result = reformattedArray.find(
    //   ({ isSelected }: any) => isSelected === false
    // );
    // if (result === undefined) {
    //   ele.checked = true;
    // }
    // if (result !== undefined) {
    //   ele.checked = false;
    // }
    // setEle(ele.checked);
    // // console.log(ele.checked);
    // return ele.checked;
  };

  useEffect(() => {
    // console.log("here");

    // const ele = document.getElementById("isChecked") as HTMLInputElement;
    // console.log(list);

    if (listFilter.variable_type === "categorical") {
      const found = listFilter.values.some(
        (element: any) => element.isSelected === false
      );
      setEle(found);
    } else if (listFilter.variable_type === "numerical") {
    }

    // console.log(found);
  }, [listFilter]);
  // console.log(ele);

  // const handleClickDropDownSign = (id: any) => {
  //   const index = listFilter.values.findIndex(
  //     (element: any) => element.id === id
  //   );

  //   setListFilter((ps: any) => ({
  //     ...ps,
  //     values: [
  //       ...ps.values.map((element: any) =>
  //         element.id === id ? { ...element, isSelected: false } : element
  //       ),
  //     ],
  //   }));
  // };

  // const handelClickDropDownSignDelete = (id: any) => {
  //   setListFilter((ps: any) => ({
  //     ...ps,
  //     values: [
  //       ...ps.values.map((element: any) =>
  //         element.id === id ? { ...element, isSelected: true } : element
  //       ),
  //     ],
  //   }));
  // };

  // const handelClickDropDownAll = () => {
  //   setListFilter((ps: any) => ({
  //     ...ps,
  //     values: [
  //       ...ps.values.map((element: any) =>
  //         element.isSelected === true
  //           ? { ...element, isSelected: false }
  //           : element
  //       ),
  //     ],
  //   }));
  // };

  // const handelClickDropDownAllDelete = () => {
  //   setListFilter((ps: any) => ({
  //     ...ps,
  //     values: [
  //       ...ps.values.map((element: any) =>
  //         element.isSelected === false
  //           ? { ...element, isSelected: true }
  //           : element
  //       ),
  //     ],
  //   }));
  // };
  // console.log(listFilter);

  function Allfunctions() {
    handleClickDropDown();
  }

  // console.log("THIS IS YOUR FUCKING LIST", list);
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
            <div>
              <img
                className="Dropdown_plus_sign"
                src={SegmentIcon}
                alt="Dropdown_plus_sign"
              ></img>
            </div>

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
        {listFilter.variable_type === "numerical" ? (
          <div className="numerical2">
            <div className="items_list">
              <li>{listFilter.min}</li>
              <li>{listFilter.max}</li>
            </div>
          </div>
        ) : (
          <div className="categorical">
            <div className="all_button">
              <button className="button_all">
                All
                <input
                  type="checkbox"
                  name="check"
                  checked={!ele}
                  id="isChecked"
                  onChange={() => {
                    setEle(!ele);
                    console.log(ele);
                    // ele === false
                    //   ? handelClickDropDownAll()
                    //   : handelClickDropDownAllDelete();
                  }}
                ></input>
              </button>
            </div>
            <div className="items_list">
              {listFilter.values.map((item: any, key: any) => (
                <li
                  key={item.id}
                  value={item.id}
                  onClick={() => {
                    console.log(props.item.id);

                    updateSelectorSelectedValue(props.item.id, item.id);
                    // handleClickDropDownSign(item.id);
                    // item.isSelected === true
                    //   ? handleClickDropDownSign(item.id)
                    //   : handelClickDropDownSignDelete(item.id);
                  }}
                >
                  <span>{item.value}</span>
                  <button type="button">
                    <img
                      src={OkayIcon}
                      alt=""
                      className={item.isSelected === false ? "hidden" : "class"}
                    ></img>
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
