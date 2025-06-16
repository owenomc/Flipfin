"use client";
import { useState } from "react";

const question = {
  text: "What is the main purpose of a savings account?",
  choices: [
    "To buy stocks",
    "To store money safely and earn interest",
    "To avoid paying taxes",
    "To borrow money",
  ],
  correct: 1,
};

export default function Trivia() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <p className="mb-4 font-medium ">{question.text}</p>
      <ul className="space-y-2">
        {question.choices.map((choice, i) => (
          <li key={i}>
            <button
              onClick={() => {
                setSelected(i);
                setSubmitted(true);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg border transition 
                ${
                  submitted
                    ? i === question.correct
                      ? "bg-green-200 border-green-400"
                      : i === selected
                      ? "bg-red-200 border-red-400"
                      : "bg-gray-800"
                    : "bg-white border-gray-300 hover:bg-blue-100"
                }`}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
      {submitted && (
        <p className="mt-4 text-sm text-gray-700">
          {selected === question.correct ? "✅ Correct!" : "❌ Try Again!"}
        </p>
      )}
    </div>
  );
}
