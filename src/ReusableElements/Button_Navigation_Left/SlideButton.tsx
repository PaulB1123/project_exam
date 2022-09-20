import React, { useState } from "react";
import "../../Componets/Styles/global.css";
import "./Button.css";
import "../../Componets/Filters/Filter.css";
import "./DragnDrop.css";

// interface DataDropdwon {
//   isOpenSlide: any;
//   setOpenSlide: any;
// }

type DragnDrop = {
  children: React.ReactNode;
};

const SlideButton = (props: DragnDrop) => {
  const [isOpenSlide, setOpenSlide] = React.useState(false);
  const [isActiveSlide, setIsActiveSlide] = useState(false);

  const handleClick = () => {
    setOpenSlide(!isOpenSlide);
    setIsActiveSlide((current) => !current);
  };
  // console.log(isOpenSlide);

  return (
    <div className="filterbuttonAudience">
      <button
        onClick={() => {
          handleClick();
        }}
        id={isActiveSlide ? "slider_audience_open" : "slider_audience"}
      >
        <div
          className={
            isActiveSlide ? "PlusIcon_container_open" : "PlusIcon_container"
          }
        >
          <div
            className={isActiveSlide ? "SldiericonRight " : "Sldiericon"}
          ></div>
        </div>
      </button>
      {isOpenSlide && (
        <div id={isActiveSlide ? "drag_and_drop_open" : "drag_and_drop"}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default SlideButton;
