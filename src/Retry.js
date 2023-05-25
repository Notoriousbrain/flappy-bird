import React from 'react'

const Retry = ({ handler }) => {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="h-full rounded-xl mt-[30vh] pt-4 pb-4 bg-orange-950/80 px-12 md:px-6 sm:px-4 xs:px-2 flex flex-col justify-center items-center w-1/3 lgm:w-2/5 md:w-1/2 sm:w-11/12 press-start">
        <h1 className=" text-2xl xs:text-xl text-white">TRY AGAIN</h1>
        <div
          onClick={handler}
          className=" hover:bg-orange-950/70 border rounded-md mt-3 py-2 px-4 text-base xs:text-xs text-white"
        >
          RETRY
        </div>
      </div>
    </div>
  );
}

export default Retry