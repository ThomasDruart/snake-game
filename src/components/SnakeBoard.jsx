import React, { useState } from "react";
import Blank from "../images/blank.png";

const SnakeBoard = () => {
  let initialRows = [];
  for (let i = 0; i < 10; i++) {
    initialRows.push([]);
    for (let j = 0; j < 10; j++) {
      initialRows[i].push("blank");
    }
  }

  const [rows, setRows] = useState(initialRows);

  const displayRows = rows.map((row) => (
    <li>
      {row.map((e) => {
        switch (e) {
          case "blank":
            return <img src={Blank} alt="blank" />;
          default:
        }
      })}
    </li>
  ));

  return <div>{displayRows}</div>;
};

export default SnakeBoard;
