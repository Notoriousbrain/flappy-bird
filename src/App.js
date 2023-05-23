import React, { useEffect, useState } from "react";
import Game from './Game';
import Details from './Details';

function App() {
const [gameStart, setGameStart] = useState(false);
const [email, setEmail] = useState("");


  return (
    <div>
      {/* {
      !gameStart 
      ?
      <Details setGameStart={setGameStart} email={email} setEmail={setEmail} />
      :
    } */}
    <Game email={email} />
    </div>
  );
}

export default App;
