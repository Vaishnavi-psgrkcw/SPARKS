import React, { useState } from "react";

export default function GoalSetting() {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    if (goal.trim() === "") return;
    setGoals([...goals, { text: goal, done: false }]);
    setGoal("");
  };

  const toggleGoal = (index) => {
    const updated = goals.map((g, i) =>
      i === index ? { ...g, done: !g.done } : g
    );
    setGoals(updated);
  };

  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🎯 Goal Setting</h2>

      <input
        type="text"
        value={goal}
        placeholder="Enter your study goal"
        onChange={(e) => setGoal(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <button onClick={addGoal} style={{ marginLeft: "10px" }}>
        Add Goal
      </button>

      <ul style={{ marginTop: "20px" }}>
        {goals.map((g, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleGoal(index)}
              style={{
                cursor: "pointer",
                textDecoration: g.done ? "line-through" : "none",
                color: g.done ? "green" : "black",
              }}
            >
              {g.text}
            </span>

            <button
              onClick={() => deleteGoal(index)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}