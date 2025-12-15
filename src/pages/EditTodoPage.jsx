import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../services/storage";
import TodoForm from "../components/TodoForm";

const EditTodoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTodo();
  }, [id]);

  const loadTodo = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundTodo = storage.getTodoById(id);
      if (foundTodo) {
        setTodo(foundTodo);
        setError("");
      } else {
        setError("Todo not found");
      }
      setLoading(false);
    }, 300);
  };

  const handleSubmit = (formData) => {
    storage.updateTodo(id, formData);
    navigate("/todos");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate("/todos")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
            Back to Todos
          </button>
        </div>
      </div>
    );
  }

  return <TodoForm initialData={todo} onSubmit={handleSubmit} isEdit={true} />;
};

export default EditTodoPage;
