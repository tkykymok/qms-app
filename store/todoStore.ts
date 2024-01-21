import { create } from "zustand";
import { Todo } from "../model/todo";

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  archiveTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: 1,
      title: "Todo 1",
      completed: false,
      archived: false,
    },
    {
      id: 2,
      title: "Todo 2",
      completed: false,
      archived: false,
    },
    {
      id: 3,
      title: "Todo 3",
      completed: false,
      archived: false,
    },
  ],
  addTodo: (todo: Todo) => set((prev) => ({ todos: [...prev.todos, todo] })),
  archiveTodo: (id: number) =>
    set((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, archived: true } : todo,
      ),
    })),
  deleteTodo: (id: number) =>
    set((prev) => ({ todos: prev.todos.filter((todo) => todo.id !== id) })),
  toggleTodo: (id: number) => {
    set((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  },
}));

export default useTodoStore;
