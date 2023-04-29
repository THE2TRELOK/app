import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function VirtualScrollBar() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [data, setData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const ref = useRef(null);

    const renderItem = React.useCallback((rowIndex) => {
        return (
            <div
                className="list-item"
                style={{
                    height: 40,
                    background: rowIndex % 2 ? "lightgray" : "white",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <h3>{data[rowIndex][0]}</h3>
            </div>
        );
    }, []);

    return (
      <div style={{ height: '100vh', overflowY: 'scroll' }} ref={ref}>
        {data?.slice(startIndex, endIndex).map((item, index) => (
          <List
            height={windowHeight}
            itemCount={data.length}
            itemSize={50}
            key={item.id}
            itemData={item}
            itemKey={item.id}
            itemRenderer={renderRow}
            width="100%"
          />
        ))}
      </div>
    );
}

function App() {
    return (
        <div style={{height: "500px", overflowY: "scroll"}}>
          <VirtualScrollBar />
        </div>
    );
}
 
export default App;
