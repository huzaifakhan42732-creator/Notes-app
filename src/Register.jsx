import React, { useState } from "react";
import { Lock, User, ArrowRight, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setMessage("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    // Save user to localStorage (demo)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      setMessage("Username already exists!");
      return;
    }

    const newUser = { username, password, notes: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setMessage("Registration successful! Redirecting... ✨");

    // Redirect to notes page after short delay
    setTimeout(() => navigate("/app"), 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-2xl mb-4 shadow-2xl shadow-indigo-500/50 animate-glow">
              <UserPlus className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-light text-white mb-2 tracking-wide">Create Account</h1>
            <p className="text-gray-400 font-light">Join us and start your journey</p>
          </div>

          {/* Register Form */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
                <div className={`relative transition-all duration-300 ${focusedInput === 'username' ? 'scale-[1.02]' : ''}`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                <div className={`relative transition-all duration-300 ${focusedInput === 'password' ? 'scale-[1.02]' : ''}`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20"
                    autoComplete="new-password"
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">Must be at least 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
                <div className={`relative transition-all duration-300 ${focusedInput === 'confirm' ? 'scale-[1.02]' : ''}`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onFocus={() => setFocusedInput('confirm')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-indigo-500/20"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="mt-1 w-4 h-4 accent-indigo-500 cursor-pointer" required />
                <label htmlFor="terms" className="text-sm text-gray-400 font-light cursor-pointer">
                  I agree to the{" "}
                  <span className="text-indigo-300 hover:text-indigo-200 transition-colors">Terms & Conditions</span> and{" "}
                  <span className="text-indigo-300 hover:text-indigo-200 transition-colors">Privacy Policy</span>
                </label>
              </div>

              {/* Message */}
              {message && <p className="text-yellow-400 text-center">{message}</p>}

              {/* Submit */}
              <button
                type="submit"
                className="relative w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-4 rounded-xl font-medium overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </div>
              </button>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-gray-400 font-light">
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")} className="text-indigo-300 hover:text-indigo-200 font-medium transition-colors duration-300 hover:underline underline-offset-4">
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm font-light">
            <p>© 2026 Your Brand. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
