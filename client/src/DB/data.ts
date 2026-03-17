const defaultDB = {
  users: [],
  assignments: [
    {
      id: 1,
      title: "Build a React App",
      dueDate: "2026-03-20",
    },
    {
      id: 2,
      title: "API Integration Task",
      dueDate: "2026-03-25",
    },
  ],
  submissions: [],
}

// 🔥 initialize DB
const stored = localStorage.getItem("db")

export const db = stored ? JSON.parse(stored) : defaultDB

// 🔥 IMPORTANT: persist default DB if not present
if (!stored) {
  localStorage.setItem("db", JSON.stringify(defaultDB))
}

export const saveDB = () => {
  localStorage.setItem("db", JSON.stringify(db))
}