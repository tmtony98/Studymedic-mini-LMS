const stored = localStorage.getItem("db")

export const saveDB = () => {
  localStorage.setItem("db", JSON.stringify(db))
}


export const db = stored
  ? JSON.parse(stored)
  : {
      users: [],
      assignments: [],
      submissions: [],
    }