import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import 'tailwindcss/tailwind.css';

function Graphs(props) {
  const [data, setData] = useState(null);  
  const [graphs, addGraphs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* Handle CSV data */
  useEffect(() => {
    api.receive('get-csv', response => {
      const url = response.filePaths[0];
      window.postMessage({type: 'request', content: url})
    });

    window.addEventListener('message', e => {
      if (e.source !== window) return;
      if (e.data.type == 'response') {
        const data = e.data.content;
        console.log(data);
        setData(data);
        setIsLoading(false);
      }
    });
  }, []);
  
  return (
    <div className="chart-wrapper">
    {isLoading ?
    <div>Loading...</div> :
    <LineChart width={600} height={300} data={data} margin={{ top: 50, right: 30, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="Temperature" stroke="#8884d8" dot={false}/>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="Time" />
      <YAxis/>
      <Tooltip />
   </LineChart>
    }
  </div>
  );
}

export default Graphs;