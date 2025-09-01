import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Todo {
	title: string;
	completed: boolean;
	userId: number;
}

const CreateTodo: React.FC = () => {
	const [title, setTitle] = useState<string>("");
	const [completed, setCompleted] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newTodo: Todo = {
			title,
			completed,
			userId: 1,
		};

		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/todos`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newTodo),
				}
			);

			if (!res.ok) throw new Error("Failed to create todo");

			const data: Todo & { id: number } = await res.json();
			console.log("Created todo:", data);
			alert(`Todo created with id ${data.id}`);
			navigate("/");
		} catch (err) {
			console.error("Error:", err);
			alert("Creation failed.");
		}
	};

	return (
		<main className="new-todo__container">
			<h2 className="new-todo__heading">Create New Todo</h2>

			<form onSubmit={handleSubmit} className="new-todo__form">
				<div className="new-todo__field">
					<label htmlFor="title">Title:</label>
					<input
						id="title"
						type="text"
						required
						value={title}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
						className="new-todo__input"
					/>
				</div>

				<div className="new-todo__field">
					<label htmlFor="status">Status:</label>
					<select
						id="status"
						value={completed.toString()}
						onChange={(e: ChangeEvent<HTMLSelectElement>) =>
							setCompleted(e.target.value === "true")
						}
						className="new-todo__select"
					>
						<option value="false">Incomplete</option>
						<option value="true">Completed</option>
					</select>
				</div>

				<div className="new-todo__buttons">
					<button type="submit" className="new-todo__button">
						Create
					</button>
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="new-todo__back"
					>
						Back
					</button>
				</div>
			</form>
		</main>
	);
};

export default CreateTodo;