import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function App() {
    const [data, setData] = useState(jsonData.range);

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
        <div className={"data-container"}>
            {data.length > 0 &&
                <VirtualScroll
                    className="list"
                    minItemHeight={40}
                    totalLength={data.length}
                    length={40}
                    renderItem={renderItem}
                />
            }
        </div>
    );
}
 
export default App;
