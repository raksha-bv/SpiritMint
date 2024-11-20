import React from "react";

export default function Hero({ onCheckItOut }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-100 text-gray-800 p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Discover Your Spirit Animal
      </h1>
      <p className="text-xl mb-6 text-center">
        Take a fun quiz to find out which spirit animal matches your
        personality!
      </p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg"
        onClick={onCheckItOut}
      >
        Check it Out
      </button>
    </div>
  );
}
