import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function App() {
  const [data, setData] = useState(jsonData.range);

  const renderItem = React.useCallback((rowIndex) => {
    const firstLetter = data[rowIndex][0][0];
    const containsX = data[rowIndex][0][0].includes('x');

    const style = {
      height: 50,
      border: 2,
      background: rowIndex % 2 ? "lightgray" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const letterStyle = {
      background: containsX && firstLetter !== 'x' ? "red" : "transparent",
    };

    return (
      <div className="list-item" style={style}>
        <h3 style={letterStyle}>{firstLetter}</h3>
        <h3>{data[rowIndex][0][1]}</h3>
        <h3>{data[rowIndex][0][2]}</h3>
        <h3>{data[rowIndex][0][3]}</h3>
        <h3>{data[rowIndex][0][4]}</h3>
      </div>
    );
  }, [data]);

  return (
    <div className={"data-container"}>
      {data.length > 0 && (
        <VirtualScroll
          className="list"
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
