import React from "react";

const NavBar = () => {
  return (
    <section className="flex justify-between px-10 py-5 bg-gradient-to-b from-rose-400 via-rose-400 to-orange-100">
      <div className="flex justify-evenly gap-6">
        <img className=" hover: cursor-pointer w-23 h-7" src="\logo.png" />
        <div className="sour-gummy-font text-xl hover:font-semibold hover: cursor-pointer">
          About
        </div>
      </div>
      <div className="flex-grow my-2 md:my-0 p-3">
        <hr className="w-full h-0.5  bg-gray-100 border-0 rounded dark:bg-black" />
      </div>
      <div>
        <button className="bg-black text-white rounded-lg sour-gummy-font text-xl px-2 py-1">
          Check it Out
        </button>
      </div>
    </section>
  );
};

export default NavBar;
