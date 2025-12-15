import React from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../services/storage";
import TodoForm from "../components/TodoForm";

const CreateTodoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    storage.createTodo(formData);
    navigate("/todos");
  };

  return <TodoForm onSubmit={handleSubmit} isEdit={false} />;
};

export default CreateTodoPage;
