import "../Styles/global.css"
import './Filter.css';
import PlusIcon from "./icons/Plus.svg";
import SaveIcon from "./icons/Save.svg";


export default function FilterComponent() {
    return ( 
    <>
     <div className="filter_container_group">
     
     <div className="filter_container">
     <h1 className="filter_header">Filter</h1>
     <img src={PlusIcon}></img>
     </div>
     <div className="filter_button_group">
     <div className="button_filter">
        <img src={SaveIcon}></img>
        <div>Save filter options</div> 
      </div>
      <div className="button_report">
        Generate Report
      </div>
      </div>

     </div>
    </>
    )
}