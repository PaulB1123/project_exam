import "../Styles/global.css";
import "./Dashboard.css";
import HeroDashboardImage from "./icons/Hero_Image.svg";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard_container_group">
        <h1 className="dashboard_header">You have no reports yet </h1>
        <img src={HeroDashboardImage}></img>
        <p>
          If you would like to create a report please select the options from
          the filer bar, after the selection please click the button generate
          report{" "}
        </p>
      </div>
    </>
  );
}
