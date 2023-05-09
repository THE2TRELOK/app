import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function App() {
  const [filterA, setFilterA] = useState('');
  const [_data, _setData] = useState(jsonData.range);

  const methodFilterA = ( data, count ) => {
    let str = "";

    if( count == 0 )
      return true;
      // ['A', 'A', 'Q', '7', '5'] -> AAQ75
      data[0].map( i => { str += i[0] });
//check
    if( str.match(/\A/g) && str.match(/\A/g).length == count ) 
      return true;

    return false
  }

  const handleInputChange = (event) => {
    let val = event.target.value;
    
    val = val.replace("a", "A");
    let result = val.replace(/[^A]/g, "");

    setFilterA(result);

    _setData(jsonData.range.filter( i => methodFilterA(i, result.length) ))
  };

  const renderItem = React.useCallback((rowIndex) => {
    const style = {
      height: 50,
      border: 2,
      background: rowIndex % 2 ? "lightgray" : "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const elements = _data[rowIndex][0].map((card, index) => (
      <h3 key={index} className={`card ${card[1]}`}>
        {card[0]}
      </h3>
    ))

    return <div className="list-item" style={style}>{elements}</div>;
  }, [_data]);

  return (
    <div>
      <div className={"data-container"}>
        {_data.length > 0 && (
          <VirtualScroll
            className={"list"}
            minItemHeight={40}
            totalLength={_data.length}
            length={40}
            renderItem={renderItem}
          />
        )}
      </div>
      <input type='text' value={filterA} maxLength={4} minLength={0} placeholder='Type number' onChange={handleInputChange}/>
    </div>
  );
}
 
export default App;
