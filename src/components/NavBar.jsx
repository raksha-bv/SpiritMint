import React from "react";

const NavBar = ({ onCheckItOut, onGoToHero }) => {
  return (
    <section className="flex justify-between px-10 py-5 bg-neutral-100">
      <div className="flex justify-evenly gap-6">
        <div
          className="righteous-regular text-3xl cursor-pointer"
          onClick={onGoToHero} // Navigate to Hero when clicked
        >
          SpiritMint
        </div>
      </div>
      <div className="flex-grow my-2 md:my-0 p-4">
        <hr className="w-full h-0.5 bg-gray-100 border-0 rounded dark:bg-black" />
      </div>
      <div>
        <button
          type="button"
          className="text-black montserrat-regular border-2 border-black focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          onClick={onCheckItOut}
        >
          Check it Out
        </button>
      </div>
    </section>
  );
};

export default NavBar;
