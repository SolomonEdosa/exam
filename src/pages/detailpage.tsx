import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/detailpage.css";

interface Todo {
	id: number;
	title: string;
	completed: boolean;
	userId?: number;
}

const DetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [todo, setTodo] = useState<Todo | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [saving, setSaving] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [title, setTitle] = useState<string>("");
	const [completed, setCompleted] = useState<boolean>(false);

	// Delete Todo
	const handleDelete = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this todo?"
		);
		if (!confirmed || !id) return;

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

	// Fetch Todo
	useEffect(() => {
		if (!id) return;

		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
			.then((res) => res.json())
			.then((data: Todo) => {
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

	// Save Todo
	const handleSave = async () => {
		if (!id || !todo) return;
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

			if (!res.ok) throw new Error("Failed to update");

			const updated: Todo = await res.json();
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
	if (!todo) return <p>Todo not found</p>;

	return (
		<main className="task-app task-app__detail">
			<h2 className="task-app__title">Edit Todo #{todo.id}</h2>

			<div className="task-app__input-group">
				<input
					type="text"
					value={title}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
					className="task-app__text-input"
				/>
				<label className="task-app__form-label">
					<input
						type="checkbox"
						checked={completed}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setCompleted(e.target.checked)
						}
						className="task-app__checkbox"
					/>
					Completed
				</label>
			</div>

			<div className="task-app__actions">
				<button
					onClick={handleSave}
					disabled={saving}
					className="task-app_btn task-app_btn--primary"
				>
					{saving ? "Saving..." : "Save Changes"}
				</button>

				<button
					onClick={() => navigate(-1)}
					className="task-app_btn task-app_btn--neutral"
				>
					← Back
				</button>

				<button
					onClick={handleDelete}
					className="task-app_btn task-app_btn--danger"
				>
					🗑 Delete
				</button>
			</div>
		</main>
	);
};

export default DetailPage;