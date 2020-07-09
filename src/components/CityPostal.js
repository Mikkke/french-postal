import React, { useState, useEffect } from "react";
import axios from "axios";

const CityPostal = () => {
  const [city, setCity] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length === 5) {
      axios
        .get(
          `https://geo.api.gouv.fr/communes?codePostal=${code}&fields=nom,code,codesPostaux,surface,codeRegion,population&format=json&geometry=centre`
        )
        .then(res => {
          const data = res.data;
          setCity(data);
        })
        .catch(err => {
          console.log("err :>> ", err);
        });
    }
  }, [code]);

  return (
    <div className="main-div--input">
      <input
        placeholder="code postal.."
        onChange={e => {
          setCode(e.target.value);
        }}
        type="text"
        value={code}
        required
        minLength="5"
        maxLength="5"
      />
      <div className="container">
        {city.map((el, index) => {
          return (
            <div className="main-div--render" key={index}>
              <h3>Ville : {el.nom}</h3>
              <p>code : {el.code}</p>
              <p>population : {el.population}</p>
              <p>surface : {el.surface}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityPostal;
