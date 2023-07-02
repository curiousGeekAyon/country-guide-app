import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [countrydata, setCdata] = useState({});

  function handelClick() {
    let value = document.getElementById('countryInp').value;
    console.log(value);
    let url = `https://restcountries.com/v3.1/name/${value}?fullText=true`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(!data?.status)
           {
              setCdata(data[0]);
              setName(value);
              let money = data[0].currencies[Object.keys(data[0].currencies)[0]].name;
              console.log(data[0].hasOwnProperty('currencies'));
              console.log(data[0]);
              console.log(data[0].capital[0]);
              console.log(countrydata.population);
              console.log(Object.values(data[0].languages).join(", "));
              console.log(data[0]);
          }
        else{
              setCdata(data);
           }
      }).catch((error)=>{
        console.log(error);
      });
  }

  return (
    <div>
      {name === "" ? (
        <div className="container">
          <div className="search-wrapper">
            <input
              type="text"
              id="countryInp"
              placeholder="Enter a country name here..."
            />
            <button id="search-btn" onClick={handelClick}>Search</button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="search-wrapper">
            <input
              type="text"
              id="countryInp"
              placeholder="Enter a country name here..."
            />
            <button id="search-btn" onClick={handelClick}>Search</button>
          </div>
          {countrydata.hasOwnProperty('name')? (
            <div id="result">
              <img src={countrydata.flags.svg} alt={countrydata.flags.alt} className="flag-img" />
              <h2>{name}</h2>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Capital:</h4>
                  <span>{countrydata.capital[0]}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Continent:</h4>
                  <span>{countrydata.continents[0]}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Population:</h4>
                  <span>{countrydata.population}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Currency:</h4>
                  <span>{Object.keys(countrydata.currencies)[0]}-{countrydata.currencies[Object.keys(countrydata.currencies)[0]].name}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Common Languages:</h4>
                  <span>{Object.values(countrydata.languages).join(", ")}</span>
                </div>
              </div>
            </div>
          ) : (
            <div id="result">Sorry pal no country exists with this name</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


