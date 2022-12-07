import React, { useEffect, useState, useContext } from "react";
import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
import OkayIcon from "../../Componets/Navigation/icons/Okay.svg";
import SegmentIcon from "../../Componets/Filters/icons/Segment.svg";
import "./Audience_container.css";
import FilterContext from "../../Data/FilterContext";
import { useGlobalModalContext } from "../../Componets/Dashboard/Modals/GlobalModal";

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
  const {
    updateSelectorSelectedValue,
    data,
    categorical,
    object,
    setObject,
    updateCharts,
    selectedItems,
    setselectedItems,
    leftside,
    setChartUpdate,
  } = useContext(FilterContext);
  const { loading, setLoading, deleteItemAudience } = useGlobalModalContext();
  const [clickUpdate, setClickupdate] = useState();
  const [selectedAudienceOptions, setSelectedAudienceOptions] = useState([]);
  const [unserline, setUnderline] = useState() as any;

  const params = {
    grpI: props.grpI,
    itemI: props.itemI,
  };

  useEffect(() => {
    // console.log(listFilter);

    if (listFilter.variable_type === "categorical") {
      const found = listFilter.values.some(
        (element: any) => element.isSelected === false
      );
      setEle(found);
    } else if (listFilter.variable_type === "numerical") {
    }
  }, [listFilter]);

  function Allfunctions() {
    setOpenDropDown(!isOpenDropDown);
    setIsActiveDropDown((current) => !current);
  }

  // console.log(data[0].items[0].Values);
  // console.log(categorical);

  useEffect(() => {
    // setselectedItems(
    //   leftside.map((items: any) =>
    //     items.values
    //       .filter((x: any) => x.isSelected === true)
    //       .map((x: any) => parseInt(x.value))
    //   )
    // );

    // console.log(leftside);

    let newObject;
    setselectedItems(
      leftside.map(
        (items: any) =>
          (newObject = {
            Variable: items.Variable,
            Values: items.Values.filter((x: any) => x.isSelected === true).map(
              (x: any) => parseInt(x.Id)
            ),
          })
      )
    );

    // if (selectedItems !== undefined) {
    //   setObject({ id: "family", values: selectedItems[0] });
    // } else {
    //   setObject([]);
    // }

    // console.log(selectedItems);

    if (selectedItems !== undefined) {
      setObject(selectedItems);
      // console.log(object);
    } else {
      setObject([]);
    }
  }, [leftside]);

  // console.log(selectedItems);

  // console.log(props.item);

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
            <div className="SegmnetIcon_and_title">
              <div>
                <img
                  className="Dropdown_plus_sign"
                  src={SegmentIcon}
                  alt="Dropdown_plus_sign"
                ></img>
              </div>

              <div className="Dropdown_filter_container">
                <li className="Dropdown_filter_container_li">
                  {props.item.Title}
                </li>
              </div>
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
        <div className={isActiveDropDown ? "hidden" : "Underline"}>
          <span className="underline_li">
            {props.item.Values.map((item: any, key: any) => (
              <span>{item.Value} </span>
            ))}
          </span>
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
                    // console.log(ele);
                    // ele === false
                    //   ? handelClickDropDownAll()
                    //   : handelClickDropDownAllDelete();
                  }}
                ></input>
              </button>
            </div>
            <div className="items_list">
              {/* {console.log(listFilter, props.item.Variable)} */}
              {listFilter.Values.map((item: any, key: any) => (
                <li
                  key={item.Id}
                  value={item.Id}
                  onClick={() => {
                    // console.log(props.item.id);

                    // updateSelectorSelectedValue(
                    //   props.item.id,
                    //   item.Dd,
                    //   props.item
                    // );

                    updateSelectorSelectedValue(
                      props.item.Variable,
                      item.Id,
                      props.item
                    );

                    // handleClickDropDownSign(item.id);
                    // item.isSelected === true
                    //   ? handleClickDropDownSign(item.id)
                    //   : handelClickDropDownSignDelete(item.id);
                  }}
                >
                  <span>{item.Value}</span>

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

            <div className="buttons_audience">
              <div className="Delete_button" id="update_button">
                <button
                  onClick={() => {
                    setChartUpdate(true);
                  }}
                >
                  Update Charts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AudienceContainer;
