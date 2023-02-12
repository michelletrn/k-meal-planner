import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import filters from "./Filters.js";

// function SearchFilter({title,filter,type}) {
//   return (
//     <div>
//       <h4>{title}</h4>

//         {filter.map(filter=>{
//           return(
//             <option>
//             <select key={filter}>
//               <label>{filter}</label>
//               <input id={filter} type="checkbox"/>
//             </select>
//             </option>
//           )
//         })}

//     </div>
//   );
// }

function SearchFilter({ title, filter, type }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {filters.cuisines.map((cuisine) => {
          return <Dropdown.Item href="#/action-1">{cuisine}</Dropdown.Item>;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchFilter;
