import React, { useState, useRef } from "react";
import { useTaxonSuggestions } from "../../hooks/useTaxonSuggestions";

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
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(defaultSpecies);
  const inputRef = useRef<HTMLInputElement>(null);

  // fetch suggestions as user types
  const { data: suggestions = [] } = useTaxonSuggestions(inputValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && inputValue.trim()) {
      onChange(inputValue.trim());
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-80">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-md"
      >
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)} // optional: see note below
          placeholder="Enter scientific name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Filter"
          )}
        </button>
      </form>

      {/* Dropdown suggestions */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((s: any) => (
            <li
              key={s.key}
              onMouseDown={() => {
                setInputValue(s.scientificName);
                onChange(s.scientificName);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-black"
            >
              {s.scientificName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpeciesFilter;

