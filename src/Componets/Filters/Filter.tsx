import "../Styles/global.css";
import "./Filter.css";
import SaveIcon from "./icons/Save.svg";
// import { AudienceButton } from "../../ReusableElements/Button_Navigation_Left/Button";
import DragNDrop from "../../ReusableElements/Button_Navigation_Left/DragnDrop";
import Data2 from "../../Data/audition_filters";
import FilterContext from "../../Data/FilterContext";
import { useContext } from "react";
// import FetchdataFilter from "../../FetchingData/FetchFiltersAuditionData";

export default function FilterComponent() {
  // const { Data } = useContext(FilterContext);

  // console.log(Data);
  console.log(Data2);

  return (
    <>
      <div className="filter_container_group">
        <div className="filter_container">
          <h1 className="filter_header">Audience</h1>
        </div>
        <div className="audience_container_with_buttons_and_filter">
          <div className="filter_button_group">
            <div className="button_audience">
              <div className="audience_droppable_container">
                <DragNDrop></DragNDrop>
              </div>
            </div>
          </div>
          <div className="buttons_for_audience">
            <div className="buttons_reports">
              <div className="button_filter">
                <img src={SaveIcon}></img>
                <div>Save filter options</div>
              </div>
              <div className="button_report">Generate Report</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
