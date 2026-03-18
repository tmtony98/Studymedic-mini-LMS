import { useAuth } from "../Contexts/AuthContext";
import { useState } from "react";
import { db } from "../DB/data";

export default function ProfilePage() {
  const { user, logout , loading } = useAuth();
  console.log("user", user);

  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(
    null,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState({
    title: "",
    link: "",
  });
  const { assignments, submissions } = db;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAssignment) {
      alert("Please select an assignment");
      return;
    }

    setIsSubmitting(true);

    const alreadySubmitted = db.submissions.find(
      (s: any) => s.assignmentId === selectedAssignment && s.userId === user.id,
    );

    if (alreadySubmitted) {
      alert("You already submitted this assignment");
      setIsSubmitting(false);
      return;
    }

    // ✅ create submission object
    const newSubmission = {
      id: Date.now(),
      assignmentId: selectedAssignment,
      userId: user.id,
      link: submission.link,
      submittedAt: new Date().toISOString(),
    };

    // ✅ push into DB
    db.submissions.push(newSubmission);


    saveDB();

    console.log("Saved submission:", newSubmission);

    // ✅ reset form
    setSubmission({ title: "", link: "" });
    setSelectedAssignment(null);
    setIsSubmitting(false);
  };




  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Learner Dashboard</h1>
        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> Learner
          </p>
          <p>
            <strong>Joined:</strong> 2026
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Assignments</h2>

        <div className="space-y-4">
          <div className="space-y-4">
            {assignments.map(({ id, title, dueDate }) => {
              const isSubmitted = submissions.find(
                (s: any) => s.assignmentId === id && s.userId === user?.id,
              );

              return (
                <div
                  key={id}
                  className="flex justify-between items-center border p-4 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-gray-500">Due: {dueDate}</p>
                  </div>

                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      isSubmitted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isSubmitted ? "Submitted" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Select Assignment */}
          <select
            className="w-full border p-3 rounded-lg"
            value={selectedAssignment || ""}
            onChange={(e) =>
              setSelectedAssignment(
                e.target.value ? parseInt(e.target.value) : null,
              )
            }
            required
          >
            <option value="">Select Assignment</option>
            {db.assignments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>

          {/* ✅ Submission Link */}
          <input
            type="url"
            placeholder="Submission Link (GitHub / Drive)"
            className="w-full border p-3 rounded-lg"
            value={submission.link}
            onChange={(e) =>
              setSubmission({ ...submission, link: e.target.value })
            }
            required
          />

          {/* ✅ Button with protection */}
          <button
            disabled={isSubmitting}
            className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
