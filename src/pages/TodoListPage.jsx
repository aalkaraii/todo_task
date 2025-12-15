import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { storage } from "../services/storage";
import TodoCard from "../components/TodoCard";

const TodoListPage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const loadedTodos = storage.getTodos();
      setTodos(loadedTodos);
      setLoading(false);
    }, 300);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      storage.deleteTodo(id);
      loadTodos();
    }
  };

  const handleToggleStatus = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const newStatus = todo.status === "pending" ? "completed" : "pending";
      storage.updateTodo(id, { status: newStatus });
      loadTodos();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Todos</h1>
          <button
            onClick={() => navigate("/todos/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg">
            <Plus size={20} />
            Create Todo
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No todos yet. Create your first one!
            </p>
            <button
              onClick={() => navigate("/todos/create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors">
              <Plus size={20} />
              Create Todo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoListPage;
