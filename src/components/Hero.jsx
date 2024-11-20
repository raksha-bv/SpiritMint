import React from "react";

export default function Hero({ onCheckItOut }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-gray-800 p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Discover Your Spirit Animal
      </h1>
      <p className="text-xl mb-6 text-center">
        Take a fun quiz to find out which spirit animal matches your
        personality!
      </p>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
        onClick={onCheckItOut}
      >
        Check it Out
      </button>
    </div>
  );
}
