// import { printIntrospectionSchema } from "graphql";
import React, { useEffect, useRef, useState } from "react";
// import ArrrowdownIcon from "../../Componets/Navigation/icons/ArrowDown.svg";
// import ArrrowupIcon from "../../Componets/Navigation/icons/ArrowUp.svg";
// import "./Button.css";
// import "./DropDownAudienceFilter.css";

// interface DataDropdwon {
//   filters: any;
//   setSelectedFilters(selectedFilters: any): any;
//   handleClickDropDown(handleClickDropDown:any):any,
// }

// const DropdownAudienceFilter: React.FC<DataDropdwon> = ({
//   filters,
//   setSelectedFilters,
//   handleClickDropDown(),
// }) => {
//   const [isOpenDropDown, setOpenDropDown] = React.useState(false);
//   const [isActiveDropDown, setIsActiveDropDown] = useState(false);

//   const handleClickDropDown = () => {
//     setOpenDropDown(!isOpenDropDown);
//     setIsActiveDropDown((current) => !current);
//     setSelectedFilters(filters);
//   };

//   console.log(filters);

//   return (
//     <div className="button_audition_filter">
//       <button
//         type="button"
//         onClick={() => {
//           handleClickDropDown();
//         }}
//       >
//         {isActiveDropDown ? (
//           <img src={ArrrowupIcon} className="Dropdown_plus_sign"></img>
//         ) : (
//           <img src={ArrrowdownIcon} className="Dropdown_plus_sign"></img>
//         )}
//       </button>
//       <div>
//         {/*   {isOpenDropDown && (
//           <ul>
//             {filters.map((item: any, index: any) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         )} */}
//       </div>
//     </div>
//   );
// };

function DropdownAudienceFilter() {
  return <div></div>;
}

export default DropdownAudienceFilter;
