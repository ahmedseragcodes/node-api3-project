import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";



function App() {

  const [characters, setCharacters] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/users")
    .then((allChars)=>{
      console.log("Succeeded Getting All Chars", allChars);
      setCharacters(allChars.data);
    })
    .catch((err)=>{
      console.log("Failed Getting All Characters", err);
    })
  },[])

  return (
   <div>
     <h1>Characters</h1>
    {characters.map((characterListItem)=>{
      return (
        <div className="characterContainer">
        <p>{characterListItem.name}</p>
        </div>
      )
    })}
   </div>
  );
}

export default App;
