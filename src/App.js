import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
import jsonData from './r.json';
import './App.css';
const data = require('./r.json');
function VirtualScrollBar() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [data, setData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
      setData(jsonData["range"]);

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }, []);

    useEffect(() => {
      if (!data) return;

      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      const newStartIndex = Math.floor(scrollTop / windowHeight * data.length);
      const newEndIndex = Math.min(
        newStartIndex + Math.ceil(clientHeight / windowHeight * data.length),
        data.length
      );
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }, [windowHeight, ref, data]);

    function updateDimensions() {
      setWindowHeight(window.innerHeight);
    }

    function renderRow({ index, key, style }) {
      const item = data[index];
      return (
        <div key={key} style={style}>
          {item.name}
          // Add other data fields here as needed
        </div>
      );
    }

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
console.log(data.range);
function App() {
    return (
    
        <VirtualScrollBar />
      
    );
}
 
export default App;
