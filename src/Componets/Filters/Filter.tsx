import "../Styles/global.css";
import "./Filter.css";
import SaveIcon from "./icons/Save.svg";
// import { AudienceButton } from "../../ReusableElements/Button_Navigation_Left/Button";
import DragNDrop from "../../ReusableElements/Button_Navigation_Left/DragnDrop";
import Data from "../../Data/audition_filters";

export default function FilterComponent() {
  return (
    <>
      <div className="filter_container_group">
        <div className="filter_container">
          <h1 className="filter_header">Audience</h1>
        </div>
        <div className="filter_button_group">
          <div className="button_audience">
            <div className="audience_droppable_container">
              {/* <AudienceButton></AudienceButton> */}
              <DragNDrop data={Data}></DragNDrop>
            </div>
          </div>
        </div>

        {/* <div className="this-is-another-button">
          <DragNDrop data={Data}></DragNDrop>
        </div> */}

        <div className="buttons_reports">
          <div className="button_filter">
            <img src={SaveIcon}></img>
            <div>Save filter options</div>
          </div>
          <div className="button_report">Generate Report</div>
        </div>
      </div>
    </>
  );
}
