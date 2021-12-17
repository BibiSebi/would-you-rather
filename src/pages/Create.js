import React from "react";

const Create = () => {
  return (
    <div className="w-full flex items-center flex-col pt-16">
      <div className="flex flex-col items-center w-1/2 mb-16">
        <h1 className="text-5xl text-gray-500 pb-2 font-thin">
          Would you rather....
        </h1>
        <span className="text-gray-500 px-24 text-center">
          Create a new poll by enterings your questions. Gather points for each
          poll.
        </span>
      </div>

      <form className="w-1/2 flex flex-col">
        <div className="flex flex-col my-2">
          <label className="text-gray-500 mb-1">Option one</label>
          <input
            className="border text-gray-500 border-gray-500 rounded-lg h-12 px-4 "
            type="text"
          />
        </div>
        <div className="flex flex-col my-2">
          <label className="text-gray-500 mb-1">Option two</label>
          <input
            className="border text-gray-500 border-gray-500 rounded-lg h-12 px-4"
            type="text"
          />
        </div>
      </form>
      <button className="px-8 py-1 rounded-xl text-white bg-gray-500 mt-16">
        Create
      </button>
    </div>
  );
};

export default Create;
