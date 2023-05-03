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

    //OPTION 1: old but working

    // const elements = [];
    // for (let i = 0; i < data[rowIndex][0].length; i++) {
    //   const card = data[rowIndex][0][i];
    //
    //   const rank = card[0];
    //   const suit = card[1];
    //
    //   elements.push(
    //     <h3 key={i} className={`card ${suit}`}>
    //       {rank}
    //     </h3>
    //   );
    // }


    //OPTION 2: modern with array.map usage
    const elements = data[rowIndex][0].map((card, index) => (
      <h3 key={index} className={`card ${card[1]}`}>
        {card[0]}
      </h3>
    ))

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
