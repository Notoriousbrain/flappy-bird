import React, { useEffect, useState } from "react";
import { getHighestScores, getPrevData, saveScore } from "./firebase/utility";
import './Game.css';
import Details from "./Details";
import Title from "./Title";

const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_WIDTH = 500;
const GRAVITY = 3;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 250;


function Game() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight1, setObjHeight1] = useState(0);
  const [objPos1, setObjPos1] = useState(WALL_WIDTH);
  const [objHeight2, setObjHeight2] = useState(0);
  const [objPos2, setObjPos2] = useState(WALL_WIDTH + WALL_WIDTH / 2);
  const [objHeight3, setObjHeight3] = useState(0);
  const [objPos3, setObjPos3] = useState(WALL_WIDTH + WALL_WIDTH / 2 );
  const [objHeight4, setObjHeight4] = useState(0);
  const [objPos4, setObjPos4] = useState(WALL_WIDTH + WALL_WIDTH / 2 );
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(1);
  const [email, setEmail] = useState("");
  const [outOfChances, setOutOfChances] = useState(false);
  const [highestScore, setHighestScore] = useState(0);
  const [highestScoresArray, setHighestScoresArray] = useState([]);
  const [userName, setUserName] = useState("");
  const [isDetails, setIsDetails] = useState(false);

  useEffect(() => {
    const prevDataHandler = async () => {
      const prevData = await getPrevData(email);
      setHighestScore(prevData?.highestScore || 0);
      setChances(prevData?.score?.length + 1 || 1);
      setUserName(prevData?.userName);
      setHighestScoresArray(await getHighestScores());
      console.log(prevData)
      console.log(userName)
    };

    prevDataHandler();
  }, [email]);

  useEffect(() => {
    let intVal;
    if (isStart && birdpos < window.innerHeight - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 16);
    }
    return () => clearInterval(intVal);
  }, [isStart, birdpos]);


  // useEffect(() => {
  //   if (chances > 3) {
  //     setOutOfChances(true);
  //   }
  //   if (score > highestScore) {
  //     setHighestScore(score);
  //   }
   
  // }, [score, highestScore, chances]);


  useEffect(() => {
    let objval;
    if (isStart && (objPos1 >= -OBJ_WIDTH || objPos2 >= -OBJ_WIDTH || objPos3 >= -OBJ_WIDTH || objPos4 >= -OBJ_WIDTH )) {
      objval = setInterval(() => {
        setObjPos1((objPos1) => objPos1 - OBJ_SPEED);
        setObjPos2((objPos2) => objPos2 - OBJ_SPEED);
        setObjPos3((objPos3) => objPos3 - OBJ_SPEED);
        setObjPos4((objPos4) => objPos4 - OBJ_SPEED);
      }, 16);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos1(WALL_WIDTH);
      setObjHeight1((window.innerHeight - OBJ_GAP)/2);
      setObjPos2(WALL_WIDTH + WALL_WIDTH);
      setObjHeight2(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
      setObjPos3(WALL_WIDTH + WALL_WIDTH + WALL_WIDTH);
      setObjHeight3(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
      setObjPos4(WALL_WIDTH + WALL_WIDTH + WALL_WIDTH + WALL_WIDTH);
      setObjHeight4(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
    }
  }, [isStart, objPos1, objPos2, objPos3, objPos4, score]);

  useEffect(() => {
     if (objPos1 + OBJ_WIDTH < 0) {
       setObjPos1(WALL_WIDTH + WALL_WIDTH + WALL_WIDTH + WALL_WIDTH);
       setObjHeight1(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
       setScore((score) => score + 1);
     }
  },[objPos1])

  useEffect(() => {
     if (objPos2 + OBJ_WIDTH < 0) {
       setObjPos2(WALL_WIDTH + WALL_WIDTH + WALL_WIDTH + WALL_WIDTH);
       setObjHeight2(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
       setScore((score) => score + 1);
     }
  },[objPos2])

  useEffect(() => {
       if (objPos3 + OBJ_WIDTH < 0) {
         setObjPos3(WALL_WIDTH + WALL_WIDTH + WALL_WIDTH + WALL_WIDTH);
         setObjHeight3(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
         setScore((score) => score + 1);
       }
  },[objPos3])

  useEffect(() => {
       if (objPos4 + OBJ_WIDTH < 0) {
         setObjPos4(WALL_WIDTH + WALL_WIDTH + WALL_WIDTH + WALL_WIDTH);
         setObjHeight4(Math.floor(Math.random() * (window.innerHeight - OBJ_GAP)));
         setScore((score) => score + 1);
       }
  },[objPos4])
  

  useEffect(() => {
    const handleCollision = async () => {

      let topObj1 = birdpos >= 0 && birdpos < objHeight1;
      let bottomObj1 =
        birdpos <= window.innerHeight &&
        birdpos >=
          window.innerHeight - (window.innerHeight - OBJ_GAP - objHeight1) - BIRD_HEIGHT;

      let topObj2 = birdpos >= 0 && birdpos < objHeight2;
      let bottomObj2 =
        birdpos <= window.innerHeight &&
        birdpos >=
          window.innerHeight - (window.innerHeight - OBJ_GAP - objHeight2) - BIRD_HEIGHT;

      let topObj3 = birdpos >= 0 && birdpos < objHeight3;
      let bottomObj3 =
        birdpos <= window.innerHeight &&
        birdpos >=
          window.innerHeight - (window.innerHeight - OBJ_GAP - objHeight3) - BIRD_HEIGHT;

      let topObj4 = birdpos >= 0 && birdpos < objHeight4;
      let bottomObj4 =
        birdpos <= window.innerHeight &&
        birdpos >=
          window.innerHeight - (window.innerHeight - OBJ_GAP - objHeight4) - BIRD_HEIGHT;

      if (
        (objPos1 >= OBJ_WIDTH &&
          objPos1 <= OBJ_WIDTH + 80 &&
          (topObj1 || bottomObj1)) ||
        (objPos2 >= OBJ_WIDTH &&
          objPos2 <= OBJ_WIDTH + 80 &&
          (topObj2 || bottomObj2)) ||
        (objPos3 >= OBJ_WIDTH &&
          objPos3 <= OBJ_WIDTH + 80 &&
          (topObj3 || bottomObj3)) ||
        (objPos4 >= OBJ_WIDTH &&
          objPos4 <= OBJ_WIDTH + 80 &&
          (topObj4 || bottomObj4))
      ) {
        setIsStart(false);
        setBirspos(300);
        const scoreLength = await saveScore(email, score);
        setChances(scoreLength + 2);
        setScore(0);
        setHighestScoresArray(await getHighestScores());
      }
    };

    handleCollision();
  }, [
    isStart,
    birdpos,
    objHeight1,
    objHeight2,
    objHeight3,
    objHeight4,
    objPos1,
    objPos2,
    objPos3,
    objPos4,
    score,
    email
  ]);

  const handler = () => {
    if(isStart){
  if (birdpos < BIRD_HEIGHT) setBirspos(0);
    else setBirspos((birdpos) => birdpos - 80);
    }
    else {
      setIsDetails(true);
    }
  };

  return (
    <div className="h-screen w-screen fixed flex justify-center items-center md:block">
      <div className="flex items-center justify-center w-full bg-no-repeat bg-contain">
        <img
          src="./images/background-day.png"
          alt="bg"
          className="fixed top-0 bg-cover w-screen h-[92vh]"
        />
        <div
          onClick={handler}
          className="w-full sm:w-full h-full "
          style={{
            height: "100vh",
            width: "100vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${objHeight1}px`,
              left: `${objPos1}px`,
              top: "0",
              transform: "rotate(180deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${window.innerHeight - objHeight1 - OBJ_GAP}px`,
              left: `${objPos1}px`,
              bottom: "0",
            }}
          />

          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${objHeight2}px`,
              left: `${objPos2}px`,
              top: "0",
              transform: "rotate(180deg)",
            }}
          />
          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${window.innerHeight - objHeight2 - OBJ_GAP}px`,
              left: `${objPos2}px`,
              bottom: "0",
            }}
          />

          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${window.innerHeight - objHeight3 - OBJ_GAP}px`,
              left: `${objPos3}px`,
              bottom: "0",
            }}
          />
          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${objHeight3}px`,
              left: `${objPos3}px`,
              top: "0",
              transform: "rotate(180deg)",
            }}
          />

          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${window.innerHeight - objHeight4 - OBJ_GAP}px`,
              left: `${objPos4}px`,
              bottom: "0",
            }}
          />
          <div
            className="absolute"
            style={{
              backgroundImage: `url(./images/pipe-green.png)`,
              width: `${OBJ_WIDTH}px`,
              height: `${objHeight4}px`,
              left: `${objPos4}px`,
              top: "0",
              transform: "rotate(180deg)",
            }}
          />

          <div
            className="absolute"
            style={{
              backgroundImage: "url(./images/yellowbird-upflap.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: `${BIRD_WIDTH}px ${BIRD_HEIGHT}px`,
              width: `${BIRD_WIDTH}px`,
              height: `${BIRD_HEIGHT}px`,
              top: `${birdpos}px`,
              left: "100px",
              transition: "top 0s linear",
            }}
          />

          {!isStart && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white cursor-pointer">
              {!isDetails && (
                <>
                  <div className="tracking-[5px] text-center">
                    <Title />
                  </div>
                  <div className="mt-4 text-center press-start">
                    <p>IT'S TIME TO LEVEL UP YOUR SHOPPING</p>
                    <p>GAME AND UNLOCK UNBEATABLE SAVINGS!</p>
                  </div>
                </>
              )}
            </div>
          )}

          { !userName && (
             <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white cursor-pointer">
               <Details email={email} setEmail={setEmail} setIsStart={setIsStart} setIsDetails={setIsDetails} />
             </div>
             )}
        </div>
        <img
          src="./images/background-bottom.png"
          alt="bg-bottom"
          className="fixed bg-cover w-screen bottom-0 h-[8vh]"
        />
      </div>
      {isStart && (
        <div className="absolute top-5 right-10 space-y-1 text-white press-start text-xs">
          <p>NAME:{userName}</p>
          <p>SCORE:{score}</p>
          <p>CHANCES:{chances}/3</p>
        </div>
      )}
    </div>
  );
}

export default Game;
