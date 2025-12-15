// LocalStorage management for todos
export const storage = {
  // Get all todos from localStorage
  getTodos: () => {
    try {
      const todos = localStorage.getItem("todos");
      return todos ? JSON.parse(todos) : [];
    } catch (error) {
      console.error("Error loading todos:", error);
      return [];
    }
  },

  // Save todos to localStorage
  saveTodos: (todos) => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
      return true;
    } catch (error) {
      console.error("Error saving todos:", error);
      return false;
    }
  },

  // Get single todo by ID
  getTodoById: (id) => {
    const todos = storage.getTodos();
    return todos.find((todo) => todo.id === parseInt(id));
  },

  // Create new todo
  createTodo: (todoData) => {
    const todos = storage.getTodos();
    const newTodo = {
      id: Date.now(),
      ...todoData,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    storage.saveTodos(todos);
    return newTodo;
  },

  // Update existing todo
  updateTodo: (id, todoData) => {
    const todos = storage.getTodos();
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    if (index !== -1) {
      todos[index] = { ...todos[index], ...todoData };
      storage.saveTodos(todos);
      return todos[index];
    }
    return null;
  },

  // Delete todo
  deleteTodo: (id) => {
    const todos = storage.getTodos();
    const filteredTodos = todos.filter((todo) => todo.id !== parseInt(id));
    storage.saveTodos(filteredTodos);
    return true;
  },
};
