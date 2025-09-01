import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditTodoForm from "../components/edittodoform";
import "../styles/todolistpage.css";

interface Todo {
	userId?: number;
	id: number;
	title: string;
	completed: boolean;
}

const TodoListPage: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
		"all"
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

	const todosPerPage = 10;

	const updateLocalStorage = (newTodos: Todo[]) => {
		localStorage.setItem("todos", JSON.stringify(newTodos));
		setTodos(newTodos);
	};

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		} else {
			fetch("https://jsonplaceholder.typicode.com/todos")
				.then((res) => res.json())
				.then((data: Todo[]) => {
					setTodos(data);
					localStorage.setItem("todos", JSON.stringify(data));
				});
		}
	}, []);

	const filteredTodos = todos.filter((todo) => {
		const matchesSearch = todo.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesFilter =
			filter === "all"
				? true
				: filter === "completed"
				? todo.completed
				: !todo.completed;

		return matchesSearch && matchesFilter;
	});

	const indexOfLastTodo = currentPage * todosPerPage;
	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
	const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
	const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

	const handlePrev = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNext = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	return (
		<main className="task-app">
			<header className="task-app__header">
				<img
					src="/icon.png"
					alt="Task Icon"
					className="task-app__icon"
				/>
				<h1 className="task-app__title">📝 My Todo App</h1>
			</header>

			<section className="task-app__search">
				<input
					type="text"
					placeholder="Search todos..."
					className="task-app__input"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<select
					className="task-app__input"
					value={filter}
					onChange={(e) =>
						setFilter(
							e.target.value as "all" | "completed" | "incomplete"
						)
					}
				>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="incomplete">Incomplete</option>
				</select>
				<Link to="/new">
					<button className="task-app__button">➕ Add</button>
				</Link>
			</section>

			<ul className="task-app__list">
				{currentTodos.map((todo) => (
					<li
						key={todo.id}
						className={`task-item task-item--${
							todo.completed ? "completed" : "incomplete"
						}`}
					>
						<div className="task-item__content">
							<span className="task-item__icon">
								{todo.completed ? "✅" : "❌"}
							</span>
							<Link
								to={`/todos/${todo.id}`}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								{todo.title}
							</Link>
						</div>

						<div className="task-item__actions">
							<button
								className="task-item__edit"
								onClick={() => setEditingTodoId(todo.id)}
							>
								✏
							</button>
							<button
								className="task-item__edit"
								style={{ backgroundColor: "#f4a3a3" }}
								onClick={() => {
									const updated = todos.filter(
										(t) => t.id !== todo.id
									);
									updateLocalStorage(updated);
								}}
							>
								🗑
							</button>
						</div>
					</li>
				))}
			</ul>

			{/* Pagination controls */}
			<div className="task-app__pagination">
				<button
					onClick={handlePrev}
					disabled={currentPage === 1}
					className="task-app__button"
				>
					◀ Prev
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className="task-app__button"
				>
					Next ▶
				</button>
			</div>

			{/* Conditional Edit Form */}
			{editingTodoId && (
  (() => {
    const todo = todos.find((t) => t.id === editingTodoId);
    if (!todo) return null; // graceful fallback
    return (
      <EditTodoForm
        todo={todo}
        onSave={(updatedTodo) => {
          const updatedTodos = todos.map((t) =>
            t.id === updatedTodo.id ? updatedTodo : t
          );
          updateLocalStorage(updatedTodos);
          setEditingTodoId(null);
        }}
        onCancel={() => setEditingTodoId(null)}
      />
    );
  })()
)}
		</main>
	);
};

export default TodoListPage;