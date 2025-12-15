import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" replace />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/todos/create" element={<CreateTodoPage />} />
        <Route path="/todos/:id/edit" element={<EditTodoPage />} />
        <Route path="*" element={<Navigate to="/todos" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
