import { Shield, Lock, Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';
import { useState } from 'react';

interface AdminModalProps {
  onClose: () => void;
  onAccessGranted: () => void;
}

export default function AdminModal({ onClose, onAccessGranted }: AdminModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kanthu123') {
      onAccessGranted();
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <div className="bg-white rounded-[2.5rem] p-12 max-w-md w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl transform -rotate-6">
            <Shield className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Admin Access</h2>
          <p className="text-gray-500 text-center font-medium leading-relaxed">
            Enter your password to access the dashboard and manage outfits.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:ring-0 focus:border-indigo-500 transition-all font-medium text-lg placeholder-gray-300"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-500 font-bold animate-pulse">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-[0_12px_24px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(79,70,229,0.6)] active:scale-[0.98]"
          >
            <LogIn className="w-5 h-5" />
            Access Admin Panel
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-8 w-full text-indigo-600 hover:text-indigo-800 font-bold flex items-center justify-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
