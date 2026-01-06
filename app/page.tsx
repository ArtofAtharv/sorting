"use client";
import { useState } from "react";

export default function SortNumbers() {
  const [input, setInput] = useState("");
  const [uniqueNumbers, setUniqueNumbers] = useState<number[]>([]);
  const [repeatedNumbers, setRepeatedNumbers] = useState<
    Record<number, number>
  >({});
  const [error, setError] = useState("");

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

      unique.sort((a, b) => a - b);

      // Sort repeated numbers by key
      const sortedRepeated = Object.keys(repeated)
        .map(Number)
        .sort((a, b) => a - b)
        .reduce((acc: Record<number, number>, key) => {
          acc[key] = repeated[key];
          return acc;
        }, {});

      setUniqueNumbers(unique);
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
    <div
    className=" p-8 max-w-3xl mx-auto"
    >
      <h2>Sort Numbers</h2>
      <input
        type="textbox"
        value={input}
        placeholder="Enter numbers separated by commas"
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        className=" bg-gray-900 rounded-xl"
      />
      <div style={{ margin: "1rem 0" }}>
        <button onClick={handleSort} style={{ marginRight: "1rem" }} className=" bg-gray-700 hover:bg-gray-500 rounded-xl px-4 py-2">
          Sort
        </button>
        <button onClick={handleReset} className=" bg-gray-700 rounded-xl px-4 py-2 hover:bg-gray-500">Reset</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {uniqueNumbers.length > 0 && (
        <div
          className="bg-gray-800 rounded-xl p-4 my-4"
          style={{
        display: "inline-block",
        maxWidth: "100%",
        wordBreak: "break-all",
        whiteSpace: "pre-wrap",
          }}
        >
          <h4>List without repeated numbers:</h4>
          <div
        style={{
          padding: "0.5rem 1rem",
          background: "#222",
          borderRadius: "8px",
          display: "inline-block",
          maxWidth: "100%",
          overflowWrap: "break-word",
          fontFamily: "monospace",
        }}
          >
        {uniqueNumbers.join(", ")}
          </div>
        </div>
      )}
      {Object.keys(repeatedNumbers).length > 0 && (
        <div
        className="bg-gray-800 rounded-xl p-4 my-4"
          style={{
        display: "inline-block",
        maxWidth: "100%",
        wordBreak: "break-all",
        whiteSpace: "pre-wrap",
          }}
        >
          <h4>Repeated numbers:</h4>
          <div
        style={{
          padding: "0.5rem 1rem",
          background: "#222",
          borderRadius: "8px",
          display: "inline-block",
          maxWidth: "100%",
          overflowWrap: "break-word",
          fontFamily: "monospace",
        }}
          >
        <ul>
          {Object.entries(repeatedNumbers).map(([num, count], idx) => (
            <li key={num}>
              {idx + 1}.) {num} -&gt; repeated {String(count)} times
            </li>
          ))}
        </ul>
          </div>
        </div>
      )}
    </div>
  );
}
