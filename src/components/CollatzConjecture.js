import React, { useState } from "react";
import LineChart from "./LineChart";

function CollatzConjecture() {
  //initialization
  //temporary holder of the Collatz Conjecture Data Set while iterating
  let collatzConjectureData = [];

  //initialization
  //The Collatz Conjecture Data Set to be graphed
  const [collatzData, setCollatzData] = useState({
    labels: 0,
    datasets: [
      {
        label: "Collatz Conjecture",
        data: 0,
        borderColor: "#aee9f2",
        backgroundColor: "#65c7d6",
      },
    ],
  });

  //setting the value of the data set to be graphed
  function setGraphicalData() {
    setCollatzData({
      labels: collatzConjectureData.map((data) => data.iteration),
      datasets: [
        {
          label: "Collatz Conjecture",
          data: collatzConjectureData.map((data) => data.value),
        },
      ],
    });
  }

  //receiving input from user and checking if input is valid
  function readInput(event) {
    let num = event.target.value;

    //check if input is a positive integer
    let x = parseFloat(num);
    if (!isNaN(num) && (x | 0) === x && num >= 0) {
      num = parseInt(num);
      collatzConjectureData = [];
      getCollatzConjecture(num);
    }

    setGraphicalData();
  }

  //recursion function for getting the Collatz Conjecture Data Set
  function getCollatzConjecture(num) {
    //for the chartjs graph format
    let len = collatzConjectureData.length;
    collatzConjectureData = collatzConjectureData.concat({
      iteration: len,
      value: num,
    });

    if (num === 0) return 0;
    else if (num === 1) return 1;
    else if (num % 2 === 0) return getCollatzConjecture(num / 2);
    else return getCollatzConjecture(num * 3 + 1);
  }

  return (
    <div>
      <label htmlFor="number">Enter Integer:</label>
      <input type="text" id="number" onChange={readInput} />

      <div style={{ width: 700 }}>
        <LineChart chartData={collatzData} />
      </div>
    </div>
  );
}

export default CollatzConjecture;
