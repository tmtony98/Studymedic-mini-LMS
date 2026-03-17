import { db, saveDB } from "../DB/data"

export const submitAssignment = async (
  assignmentId: number,
  content: string
) => {
  await new Promise((res) => setTimeout(res, 500))

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  
  const existing = db.submissions.find(
    (s) =>
      s.userId === user.id && s.assignmentId === assignmentId
  )

  if (existing) {
    throw new Error("You already submitted this assignment")
  }

  
  const assignment = db.assignments.find(
    (a) => a.id === assignmentId
  )

  if (!assignment) {
    throw new Error("Assignment not found")
  }


  const isLate =
    new Date() > new Date(assignment.dueDate)

  const newSubmission = {
    id: Date.now(),
    userId: user.id,
    assignmentId,
    content,
    status: isLate ? "late" : "submitted",
  }

  db.submissions.push(newSubmission)
  saveDB()

  return newSubmission
}