import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Save, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // Check login on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
      if (user.notes) setTasks(user.notes);
    }
    setTimeout(() => setIsVisible(true), 100);
  }, [navigate]);

  // Save tasks to current user
  useEffect(() => {
    if (!currentUser) return;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      users[userIndex].notes = tasks;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));
    }
  }, [tasks, currentUser]);

  // ----------------- Notes Logic -----------------
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !details) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = { title, details };
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { title, details }]);
    }

    setTitle("");
    setDetails("");
  };

  const deleteNote = (i) => {
    const copy = [...tasks];
    copy.splice(i, 1);
    setTasks(copy);
  };

  const editNote = (i) => {
    setTitle(tasks[i].title);
    setDetails(tasks[i].details);
    setEditIndex(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setTitle("");
    setDetails("");
  };

  // ----------------- Logout -----------------
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const colors = [
    "from-yellow-300 via-yellow-200 to-orange-200",
    "from-pink-300 via-pink-200 to-rose-200",
    "from-blue-300 via-blue-200 to-cyan-200",
    "from-green-300 via-green-200 to-emerald-200",
    "from-purple-300 via-purple-200 to-fuchsia-200",
    "from-orange-300 via-orange-200 to-amber-200",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div
        className={`relative z-10 p-4 md:p-8 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with Logout */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-lg font-bold">
              Hello, {currentUser?.username}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Header with Animation */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-4 border border-white/20 shadow-xl">
              <Sparkles className="text-yellow-300 animate-pulse" size={24} />
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                My Notes
              </h1>
              <Sparkles className="text-yellow-300 animate-pulse" size={24} />
            </div>
            <p className="text-white text-lg opacity-90 animate-fade-in">
              Capture your brilliant ideas ✨
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* FORM with Glassmorphism */}
            <div className="w-full lg:w-96 lg:sticky lg:top-8 h-fit animate-slide-in-left">
              <div className="bg-white/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/30 hover:bg-white/25 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-white drop-shadow-lg">
                    {editIndex !== null ? "✏️ Edit Note" : "➕ Create Note"}
                  </h2>
                  {editIndex !== null && (
                    <button
                      onClick={cancelEdit}
                      className="text-sm text-white/80 hover:text-white underline transition-all hover:scale-105"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="transform transition-all duration-300 hover:scale-[1.02]">
                    <label className="block text-sm font-bold text-white/90 mb-2 drop-shadow">
                      📌 Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter note title..."
                      className="w-full p-4 bg-white/90 backdrop-blur border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 transition-all outline-none text-gray-800 placeholder-gray-400 shadow-lg font-medium"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") submitHandler(e);
                      }}
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-[1.02]">
                    <label className="block text-sm font-bold text-white/90 mb-2 drop-shadow">
                      📝 Details
                    </label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Write your note here..."
                      rows="6"
                      className="w-full p-4 bg-white/90 backdrop-blur border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 transition-all outline-none resize-none text-gray-800 placeholder-gray-400 shadow-lg font-medium"
                    ></textarea>
                  </div>

                  <button
                    onClick={submitHandler}
                    className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white py-4 rounded-2xl font-black text-lg hover:from-yellow-500 hover:via-orange-500 hover:to-pink-600 transform hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 border-2 border-white/30"
                  >
                    {editIndex !== null ? (
                      <>
                        <Save size={22} className="animate-bounce" />
                        Update Note
                      </>
                    ) : (
                      <>
                        <Plus size={22} className="animate-bounce" />
                        Add Note
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* NOTES Grid */}
            <div className="flex-1">
              {tasks.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/20 shadow-2xl animate-pulse-slow">
                  <div className="text-8xl mb-6 animate-bounce-slow">📝</div>
                  <h3 className="text-3xl font-black text-white mb-3 drop-shadow-lg">
                    No notes yet
                  </h3>
                  <p className="text-white/80 text-lg">
                    Create your first note to get started!
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {tasks.map((note, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-br ${colors[i % colors.length]} p-6 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 border-2 border-white/40 group animate-scale-in backdrop-blur-sm`}
                      style={{
                        animationDelay: `${i * 100}ms`,
                      }}
                    >
                      {/* Decorative Corner */}
                      <div className="absolute top-3 right-3 w-12 h-12 bg-white/40 rounded-full flex items-center justify-center text-lg font-black text-gray-800 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all">
                        {i + 1}
                      </div>

                      <div className="relative">
                        <h3 className="font-black text-2xl text-gray-800 line-clamp-2 pr-16 mb-4 drop-shadow-sm">
                          {note.title}
                        </h3>

                        <p className="text-gray-700 mb-6 line-clamp-5 leading-relaxed font-medium">
                          {note.details}
                        </p>

                        <div className="flex gap-3 mt-auto pt-4 border-t-2 border-white/50">
                          <button
                            onClick={() => editNote(i)}
                            className="flex-1 bg-white/90 hover:bg-white text-gray-800 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-gray-300"
                          >
                            <Edit2 size={18} />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(i)}
                            className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                          >
                            <Trash2 size={18} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
