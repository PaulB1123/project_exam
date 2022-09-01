import "../../Componets/Styles/global.css";
import "./Button.css";
import { useState } from "react";
import * as React from "react";

export default function Button1() {
  const [isOpen, setOpen] = React.useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    setIsActive((current) => !current);
  };

  return (
    <>
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        <div
          className="filterbutton"
          style={{
            backgroundColor: isActive ? "#d9d9d9" : "white",
            //   color: isActive ? "white" : "",
          }}
        >
          <div className="filterbutton_container">
            {/* <img src={ChartsIcon} alt="Logo_Charts "></img> */}
            <li>Charts</li>
          </div>
          {/* <img src={ArrrowdownIcon}></img> */}
        </div>
      </Button>
      {isOpen && (
        <div className="Dropdown">
          <li>KPIs charts</li>
          <li>Reach for Chosen Target Group</li>
          <li>Frequency Histogram</li>
          <li>Campaign TRP</li>
          <li>Estimated Reach</li>
        </div>
      )}
    </>
  );
}

const Button = ({ onClick, children }: { onClick: any; children: any }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};
