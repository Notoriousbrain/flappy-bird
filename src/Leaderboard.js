import React from "react";

const Leaderboard = ({ highestScoresArray }) => {
  console.log(highestScoresArray);

  const topScores = highestScoresArray.slice(0, 10); // Select the top 10 scores

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="h-full rounded-xl mt-[30vh] pt-4 pb-4 bg-orange-950/80 px-12 md:px-6 sm:px-4 xs:px-2 flex flex-col justify-center w-1/3 lgm:w-2/5 md:w-1/2 sm:w-11/12 press-start">
        <h1 className="text-center text-2xl xs:text-xl text-white">Leaderboard</h1>
        <div className="space-y-6 w-full mt-4 text-white text-sm">
          {topScores &&
            topScores.map((user, index) => (
              <div key={index} className="flex justify-between">
                <span>{index + 1}.</span>
                <span>{user.userName}</span>
                <span>
                  {user.highestScore < 10
                    ? `0${user.highestScore}`
                    : user.highestScore}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
