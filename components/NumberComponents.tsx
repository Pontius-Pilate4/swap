"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface NumberInputProps {
  multiplier: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ multiplier }) => {
  const router = useRouter();

  const [value, setValue] = useState(0);

  const swapFn = () => {
    router.push("/wallet");
  };

  const handleAdd = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleSubtract = () => {
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    // setValue((prevValue) => prevValue - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) || event.target.value === "") {
      setValue(event.target.value === "" ? 0 : newValue);
    }
  };

  return (
    <div
      //   style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      className="container w-full flex flex-col justify-center space-y-3 px-6 pt-4 pb-6"
    >
      <p className="font-bold py-3">π1 = $28.5 </p>
      <p className="font-bold">
        Pi coins to swap <span className="text-red-500">*</span>
      </p>
      <div
        //   style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
        className="w-full flex flex-row justify-center space-x-1"
      >
        <button
          className="px-4 py-4 rounded-md bg-[#a85e00] text-white border-none outline-none shadow-lg cursor-pointer"
          onClick={handleSubtract}
        >
          -
        </button>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="p-3 rounded-md text-gray-800 w-full border border-gray-600 "
        />
        <button
          className="px-4 py-4 rounded-md bg-[#a85e00] text-white border-none outline-none shadow-lg cursor-pointer"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
      <p className="font-bold">Tether (USDT) </p>
      <div>
        <input
          type="number"
          value={value * multiplier}
          disabled
          className="p-3 rounded-md text-gray-800 w-full border border-[#8c2192] "
        />
      </div>
      {/* <button className="px-4 bg-[#221331] text-white py-2 rounded-lg"> */}
      {/* Add functionality later */}
      <button
        className={`px-4 py-2 rounded-lg text-white ${
          value * multiplier == 0
            ? "bg-[#221331] opacity-50 cursor-not-allowed"
            : "bg-[#221331] hover:bg-opacity-80"
        }`}
        disabled={value * multiplier == 0}
        onClick={swapFn}
      >
        Swap
      </button>
    </div>
  );
};

export default NumberInput;
