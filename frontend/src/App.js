import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import QuizApp from './quiz';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the Django API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(data)
  return (
    <div className="App">
    <QuizApp exam={data.exam}/>
    </div>
  );
}

export default App;
