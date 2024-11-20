import React from "react";

const NavBar = ({ onCheckItOut, onGoToHero }) => {
  return (
    <section className="fixed top-0 left-0 w-full px-10 py-5">
      <div className="flex justify-between items-center">
        <div
          className="chango-regular text-3xl cursor-pointer text-indigo-600 hover:text-indigo-800 transition-all"
          onClick={onGoToHero} // Navigate to Hero when clicked
        >
          SPiRiTMiNT
        </div>
        <div>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-5 rounded-full text-sm shadow-lg transform hover:scale-105 transition-all"
            onClick={onCheckItOut}
          >
            Check it Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
