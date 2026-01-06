"use client";
import { useState } from "react";

export default function SortNumbers() {
  const [input, setInput] = useState("");
  const [uniqueNumbers, setUniqueNumbers] = useState<number[]>([]);
  const [repeatedNumbers, setRepeatedNumbers] = useState<
    Record<number, number>
  >({});
  const [error, setError] = useState("");
  const [keepOriginalOrder, setKeepOriginalOrder] = useState(false);

  const handleSort = () => {
    setError("");
    try {
      const numbers = input
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num.length > 0)
        .map((num) => {
          const parsed = parseInt(num, 10);
          if (isNaN(parsed)) throw new Error();
          return parsed;
        });

      const seen: Record<number, number> = {};
      const unique: number[] = [];
      const repeated: Record<number, number> = {};

      numbers.forEach((num) => {
        if (!seen[num]) {
          seen[num] = 1;
          unique.push(num);
        } else {
          seen[num] += 1;
          repeated[num] = seen[num];
        }
      });

      let finalUnique = [...unique];
      if (!keepOriginalOrder) {
        finalUnique.sort((a, b) => a - b);
      }

      // Sort repeated numbers by key
      const sortedRepeated = Object.keys(repeated)
        .map(Number)
        .sort((a, b) => a - b)
        .reduce((acc: Record<number, number>, key) => {
          acc[key] = repeated[key];
          return acc;
        }, {});

      setUniqueNumbers(finalUnique);
      setRepeatedNumbers(sortedRepeated);
    } catch {
      setError("Invalid input. Please enter only numbers separated by commas.");
      setUniqueNumbers([]);
      setRepeatedNumbers({});
    }
  };

  const handleReset = () => {
    setInput("");
    setUniqueNumbers([]);
    setRepeatedNumbers({});
    setError("");
  };

  return (
    <div className="flex justify-between items-center flex-col min-h-dvh mx-4">
    <div className="p-8 max-w-3xl mx-4 my-8 rounded-2xl shadow-2xl bg-linear-to-br from-[#232526]/80 to-[#414345]/80 backdrop-blur-lg border border-gray-700/60 space-y-6 w-full">
      <h2 className="text-2xl font-bold mb-4 text-[#e0e7ef] drop-shadow-lg tracking-wide">Sort Numbers</h2>
      <input
        type="text"
        value={input}
        placeholder="Enter numbers separated by commas"
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 text-base bg-[#232526]/60 rounded-xl border border-[#414345]/60 focus:outline-none focus:ring-2 focus:ring-[#7f9cf5] text-[#e0e7ef] placeholder-gray-400 shadow-inner backdrop-blur"
      />
      <div className="flex items-center gap-4 my-2">
        <div className="flex items-center gap-4 text-[#e0e7ef] font-medium">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="order"
              checked={keepOriginalOrder}
              onChange={() => setKeepOriginalOrder(true)}
              className="appearance-none bg-[#414345] rounded-full border border-[#5e6264] checked:border-[#7f9cf5] checked:bg-[radial-gradient(circle,#7f9cf5_50%,transparent_45%)] w-4 h-4 cursor-pointer active:scale-95 active:shadow-inner active:bg-[#7f9cf5]/70"
            />
            Keep original order
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="order"
              checked={!keepOriginalOrder}
              onChange={() => setKeepOriginalOrder(false)}
              className="appearance-none bg-[#414345] rounded-full border border-[#5e6264] checked:border-[#7f9cf5] checked:bg-[radial-gradient(circle,#7f9cf5_50%,transparent_45%)] w-4 h-4 cursor-pointer active:scale-95 active:shadow-inner active:bg-[#7f9cf5]/70"
            />
            Sort ascending
          </label>
        </div>
      </div>
      <div className="my-4 flex gap-4">
        <button
          onClick={handleSort}
          className="bg-linear-to-r from-[#7f9cf5]/80 to-[#a18cd1]/80 text-[#e0e7ef] font-semibold rounded-xl px-5 py-2 shadow-md hover:from-[#7f9cf5]/40 hover:to-[#a18cd1]/40 transition-all duration-200 backdrop-blur active:scale-95 active:shadow-inner active:bg-[#7f9cf5]/70 cursor-pointer"
        >
          Sort
        </button>
        <button
          onClick={handleReset}
          className="bg-[#414345] text-[#e0e7ef] font-semibold rounded-xl px-5 py-2 shadow-md hover:bg-[#414345]/40 transition-all duration-200 backdrop-blur active:scale-95 active:shadow-inner active:bg-[#414345]/70 cursor-pointer"
        >
          Reset
        </button>
      </div>
      {error && <div className="text-red-400 font-medium">{error}</div>}
      {uniqueNumbers.length > 0 && (
        <div className="bg-linear-to-br from-[#232526]/70 to-[#414345]/70 rounded-xl p-5 my-4 shadow-lg border border-[#7f9cf5]/30 backdrop-blur-lg flex flex-col gap-3">
          <div className="flex items-center gap-2 justify-between">
          <h4 className="font-semibold mb-2 text-[#a18cd1]">List without repeated numbers:</h4>
          <button
                className="bg-linear-to-r from-[#7f9cf5]/90 to-[#a18cd1]/90 text-[#414345] rounded-xl px-3 py-1 text-sm font-medium shadow transition-all duration-200 backdrop-blur
              hover:from-[#a18cd1]/50 hover:to-[#7f9cf5]/50 hover:text-[#dedae8] hover:shadow-lg hover:backdrop-blur-md
              active:scale-95 active:shadow-inner active:bg-[#7f9cf5]/70 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(uniqueNumbers.join(", "));
                }}
                title="Copy to clipboard"
              >
                Copy
              </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-3 bg-[#232526]/60 rounded-lg text-justify max-w-full font-mono text-[#e0e7ef] shadow-inner backdrop-blur">
              {uniqueNumbers.join(", ")}
            </div>
          </div>
        </div>
      )}
      {Object.keys(repeatedNumbers).length > 0 && (
        <div className="bg-linear-to-br from-[#232526]/70 to-[#414345]/70 rounded-xl p-5 my-4 shadow-lg border border-[#7f9cf5]/30 backdrop-blur-lg flex flex-col gap-3">
          <div className="flex items-center gap-2 justify-between">
          <h4 className="font-semibold mb-2 text-[#7f9cf5]">Repeated numbers:</h4>
            <button
              className="bg-linear-to-r from-[#7f9cf5]/90 to-[#a18cd1]/90 text-[#414345] rounded-xl px-3 py-1 text-sm font-medium shadow transition-all duration-200 backdrop-blur
              hover:from-[#a18cd1]/50 hover:to-[#7f9cf5]/50 hover:text-[#dedae8] hover:shadow-lg hover:backdrop-blur-md
              active:scale-95 active:shadow-inner active:bg-[#7f9cf5]/70 cursor-pointer"
              onClick={() => {
              const repeatedList = Object.entries(repeatedNumbers)
                .map(
                ([num, count], idx) =>
                  `${idx + 1}.) ${num} → repeated ${count} times`
                )
                .join("\n");
              navigator.clipboard.writeText(repeatedList);
              }}
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
          <div className="p-3 bg-[#232526]/60 rounded-lg font-mono text-[#e0e7ef] shadow-inner backdrop-blur">
            <ul>
            {Object.entries(repeatedNumbers).map(([num, count], idx) => (
              <li key={num}>
              <span className="text-[#a18cd1]">{idx + 1}.)</span> {num} <span className="text-[#7f9cf5]">&rarr;</span> repeated <span className="text-[#fbc2eb]">{String(count)}</span> times
              </li>
            ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    <footer className="text-center text-sm text-gray-400 select-none font-mono mb-6">Made with &#10084; for Adv. Saurabh Todkar Sir</footer>
    </div>
  );
}
