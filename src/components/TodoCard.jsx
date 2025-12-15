import React from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TodoCard = ({ todo, onDelete, onToggleStatus }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {todo.image && (
        <img
          src={todo.image}
          alt={todo.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 flex-1">
            {todo.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ml-2 ${
              todo.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
            {todo.status}
          </span>
        </div>

        {todo.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{todo.description}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onToggleStatus(todo.id)}
            className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              todo.status === "pending"
                ? "bg-green-50 text-green-600 hover:bg-green-100"
                : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
            }`}>
            {todo.status === "pending" ? <Check size={16} /> : <X size={16} />}
            {todo.status === "pending" ? "Complete" : "Reopen"}
          </button>

          <button
            onClick={() => navigate(`/todos/${todo.id}/edit`)}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            title="Edit">
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete(todo.id)}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
