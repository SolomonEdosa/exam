
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/detailpage.css"
const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this todo?");
    if (!confirmed) return;

    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      alert("Todo deleted (simulated)!");
      navigate("/");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete.");
    }
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setTitle(data.title);
        setCompleted(data.completed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load todo:", err);
        setError("Failed to load todo.");
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...todo,
            title,
            completed,
          }),
        }
      );
      const updated = await res.json();
      setTodo(updated);
      alert("Todo updated!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="task-app task-app__detail">
    <h2 className="task-app__title">Edit Todo #{todo.id}</h2>
  
    <div className="task-app__input-group">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-app__text-input"
      />
      <label className="task-app__form-label">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="task-app__checkbox"
        />
        Completed
      </label>
    </div>
  
    <div className="task-app__actions">
      <button
        onClick={handleSave}
        disabled={saving}
        className="task-app__btn task-app__btn--primary"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
  
      <button
        onClick={() => navigate(-1)}
        className="task-app__btn task-app__btn--neutral"
      >
        ← Back
      </button>
  
      <button
        onClick={handleDelete}
        className="task-app__btn task-app__btn--danger"
      >
        🗑️ Delete
      </button>
    </div>
  </main>
  
  );
};

export default DetailPage;
