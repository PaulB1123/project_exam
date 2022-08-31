import "../Styles/global.css"
import './Filter.css';
import SaveIcon from "./icons/Save.svg";


export default function FilterComponent() {
    return ( 
    <>
     <div className="filter_container_group">
     
     <div className="filter_container">
     <h1 className="filter_header">Audience</h1>
     
     <div className="PlusIcon_container">
      <div className="PlusIcon"></div>
     </div>

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