import React, { useState, useRef } from "react";

type SpeciesFilterProps = {
  defaultSpecies?: string;
  onChange: (scientificName: string) => void;
  isLoading?: boolean;
};

const SpeciesFilter: React.FC<SpeciesFilterProps> = ({
  defaultSpecies = "",
  onChange,
  isLoading = false,
}) => {
  const [inputValue, setInputValue] = useState(defaultSpecies);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onChange(inputValue);
      inputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-md"
    >
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter scientific name"
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center ${
          isLoading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {isLoading ? (
          <svg
            className="w-5 h-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Filter"
        )}
      </button>
    </form>
  );
};

export default SpeciesFilter;
