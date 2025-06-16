import React, { useState } from "react";


const EditTodoForm = ({ todo, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTodo = {
      ...todo,
      title,
      completed,
    };

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      onUpdate(data); // Update in parent
      onCancel(); // Close edit mode
    } catch (err) {
      console.error("Error updating todo:", err);
      alert("Failed to update todo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo__edit-form" >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="todo__edit-input"
      />
      <select
        value={completed}
        onChange={(e) => setCompleted(e.target.value === "true")}
        className="todo__edit-select"
      >
        <option value="false">Incomplete</option>
        <option value="true">Completed</option>
      </select>
      <button type="submit" className="todo__edit-save-button">Save</button>
      <button type="button" onClick={onCancel} className="todo__edit-cancel-button">
        Cancel
      </button>
    </form>
  );
};

export default EditTodoForm;
