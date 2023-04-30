import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function App() {
    const [data, data2] = useState(jsonData.range);

    const renderItem = React.useCallback((rowIndex) => {
        return (
            <div
                className="list-item"
                style={{
                    height: 50,
                    background: rowIndex % 2 ? "lightgray" : "white",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <h3>{data[rowIndex][0]}</h3> 
                <h3>{data[rowIndex][1]}</h3>
                <h3>{data[rowIndex][2]}</h3>
                <h3>{data[rowIndex][3]}</h3>
                <h3>{data[rowIndex][4]}</h3>
                
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
