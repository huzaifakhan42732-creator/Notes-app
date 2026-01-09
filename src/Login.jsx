import React, { useState } from "react";
import { Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter both username and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Save current user
      localStorage.setItem("currentUser", JSON.stringify(user));
      setMessage("Login successful! Redirecting... ✨");

      // Redirect to notes page after short delay
      setTimeout(() => navigate("/app"), 500);
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl mb-4 shadow-2xl shadow-purple-500/50 animate-glow">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-light text-white mb-2 tracking-wide">Welcome Back</h1>
            <p className="text-gray-400 font-light">Enter your credentials to continue</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
                <div className={`relative transition-all duration-300 ${focusedInput === 'username' ? 'scale-[1.02]' : ''}`}>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
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
                    placeholder="Enter your password"
                    value={password}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {/* Message */}
              {message && <p className="text-yellow-400 text-center">{message}</p>}

              {/* Login Button */}
              <button
                type="submit"
                className="relative w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-medium overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </div>
              </button>

              {/* Register Link */}
              <div className="text-center mt-4">
                <p className="text-gray-400 font-light">
                  Don't have an account?{" "}
                  <button onClick={() => navigate("/register")} className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-300 hover:underline underline-offset-4">
                    Create one
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

export default Login;
