
import React, { useEffect, useRef, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [countDown,setCountDown]=useState("00:00:00");
  let [minutes,seconds,milliSeconds]=[0,0,0];
  let [lapList,setLapList]=useState([]);
  const stopRef=useRef();

  const handleStart=()=>{
     let timer=setInterval(()=>{
        handleTimer();
        stopRef.current.addEventListener("click",()=>{
          clearInterval(timer);
        })
     },10);
  }


  const handleLap=()=>{
    setLapList([...lapList,countDown]);
  }

  const handleReset=()=>{
    setCountDown("00:00:00");
  }

  const handleTimer=()=>{
    milliSeconds++;
    if(milliSeconds>=100){
      seconds++;
      milliSeconds=0;
      if(seconds>=60){
        minutes++;
        seconds=0;
      }
    }
    setCountDown(formatTime(minutes)+":"+formatTime(seconds)+":"+formatTime(milliSeconds));
  }

  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }


  return <div>
    <p>{countDown}</p>
    <button id="start" onClick={handleStart}>Start</button>
    <button id="stop" ref={stopRef}>Stop</button>
    <button id="lap" onClick={handleLap}>Lap</button>
    <button id="restart" onClick={handleReset}>Reset</button>
    <ul>
      {
        lapList.map((item,index)=>{
          return <li key={index}>{item}</li>
        })
      }
    </ul>
  </div>
}

export default App
