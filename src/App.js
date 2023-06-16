import React, { useState, useEffect, useRef } from 'react';
import VirtualScroll from "react-dynamic-virtual-scroll";
import jsonData from './r.json';
import './App.css';

function App() {
  const [filterA, setFilterA] = useState('');
  const [_data, _setData] = useState(jsonData.range);


  const methodFilterA = (data, filter) => {
    const filters = filter.split(/[,:]/).map(f => f.trim());
    return filters.some(f => {
      if (f.startsWith("!")) {
        const negateFilter = f.slice(1);
        return !data[0].join("").includes(negateFilter);
      } else {
        return f
          .split('')
          .every(char =>
            data[0]
              .join('')
              .includes(char)
          );
      }
    });
  };
  
  
  

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setFilterA(inputValue);
    
    if (inputValue.includes(',')) {
      const filters = inputValue.split(',');
      _setData(jsonData.range.filter(i => filters.some(filter => methodFilterA(i, filter.trim()))));
    } else {
      _setData(jsonData.range.filter(i => methodFilterA(i, inputValue)));
    }
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
      <input type='text' value={filterA} maxLength={30} minLength={0} placeholder='Type number' onChange={handleInputChange}/>
    </div>
  );
}
 
export default App;