"use client";
import { useState } from "react";

const bills = [
  { label: "$1", value: 1, count: 2 },
  { label: "$5", value: 5, count: 1 },
  { label: "$10", value: 10, count: 1 },
  { label: "$20", value: 20, count: 0 },
];

export default function Cash() {
  const [input, setInput] = useState("");
  const total = bills.reduce((sum, b) => sum + b.value * b.count, 0);

  return (
    <div>
      <p className="mb-4 font-medium">How much money is shown below?</p>
      <div className="flex gap-4 mb-4 flex-wrap">
        {bills.map((b, i) =>
          Array.from({ length: b.count }).map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="bg-green-100 border border-green-400 text-green-800 px-3 py-1 rounded-full text-sm"
            >
              {b.label}
            </div>
          ))
        )}
      </div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded px-3 py-2 w-full max-w-xs"
        placeholder="Enter total amount"
      />
      <p className="mt-2">
        {input &&
          (parseInt(input) === total ? "✅ Correct!" : "❌ Try again")}
      </p>
    </div>
  );
}
