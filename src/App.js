import React, { useState } from "react";
import Game from './Game';

function App() {
const [email, setEmail] = useState("");


  return (
    <div>
    <Game email={email} setEmail={setEmail} />
    </div>
  );
}

export default App;
