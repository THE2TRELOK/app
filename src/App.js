import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function App() {
  const [data, setData] = useState(jsonData.range);

  const renderItem = React.useCallback((rowIndex) => {
    const style = {
      height: 50,
      border: 2,
      background: rowIndex % 2 ? "lightgray" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const elements = [];

    for (let i = 1; i <= 4; i++) {
      const text = data[rowIndex][0][i];
      let backgroundColor = "transparent";

      if (text.includes("x")) {
        backgroundColor = "red";
      } else if (text.includes("y")) {
        backgroundColor = "green";
      } else if (text.includes("z")) {
        backgroundColor = "lightblue";
      } else if (text.includes("w")) {
        backgroundColor = "yellow";
      }

      const letterStyle = {
        background: backgroundColor,
        marginRight: i < 4 ? "10px" : 0,
      };

      elements.push(
        <h3 key={i} style={letterStyle} className='push'>
          {text}
        </h3>
      );
    }

    return <div className="list-item" style={style}>{elements}</div>;
  }, [data]);

  return (
    <div className={"data-container"}>
      {data.length > 0 && (
        <VirtualScroll
          className={"list"}
          minItemHeight={40}
          totalLength={data.length}
          length={40}
          renderItem={renderItem}
        />
      )}
    </div>
  );
}
 
export default App;
