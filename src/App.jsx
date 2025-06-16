import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/todolistpage';
import DetailPage from './pages/detailpage';
import NotFoundPage from './pages/notfoundpage';
import CreateTodo from './pages/createtodopage'; // <- Matches usage

const BrokenPage = () => {
  throw new Error('Intentional Error!');
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoListPage />} />
      <Route path="/todos/:id" element={<DetailPage />} />
      <Route path="/new" element={<CreateTodo />} /> {/* ✅ Fixed */}
      <Route path="/broken" element={<BrokenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
