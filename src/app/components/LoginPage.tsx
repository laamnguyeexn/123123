import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Building2, Eye, EyeOff, User, Users } from 'lucide-react';

export function LoginPage() {
  const [loginType, setLoginType] = useState<'admin' | 'manager' | 'guest'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(email, password);

    if (success) {
      navigate('/admin');
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 size-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Back to home link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Về trang chủ</span>
        </a>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl mb-4">
              {loginType === 'admin' ? (
                <Building2 className="size-10 text-white" />
              ) : loginType === 'manager' ? (
                <Users className="size-10 text-white" />
              ) : (
                <User className="size-10 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {loginType === 'admin' ? 'Đăng nhập Admin' : loginType === 'manager' ? 'Đăng nhập Trưởng phòng' : 'Đăng nhập Khách'}
            </h2>
            <p className="text-gray-600">
              {loginType === 'admin' ? 'Truy cập hệ thống quản lý' : loginType === 'manager' ? 'Quản lý phòng ban và duyệt lịch' : 'Xem lịch và tham gia họp'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                loginType === 'admin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setLoginType('manager')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                loginType === 'manager'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trưởng phòng
            </button>
            <button
              type="button"
              onClick={() => setLoginType('guest')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                loginType === 'guest'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Khách
            </button>
          </div>

          {/* Demo credentials info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-900 font-medium mb-2">Thông tin đăng nhập demo:</p>
            {loginType === 'admin' ? (
              <>
                <p className="text-xs text-blue-700">Email: <span className="font-mono">admin@company.com</span></p>
                <p className="text-xs text-blue-700">Mật khẩu: <span className="font-mono">admin123</span></p>
              </>
            ) : loginType === 'manager' ? (
              <>
                <p className="text-xs text-blue-700">Email: <span className="font-mono">manager@company.com</span></p>
                <p className="text-xs text-blue-700">Mật khẩu: <span className="font-mono">manager123</span></p>
              </>
            ) : (
              <>
                <p className="text-xs text-blue-700">Email: <span className="font-mono">guest@company.com</span></p>
                <p className="text-xs text-blue-700">Mật khẩu: <span className="font-mono">guest123</span></p>
              </>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin size-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Đang đăng nhập...</span>
                </span>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Quên mật khẩu?
            </a>
          </div>
        </div>

        {/* Additional info */}
        <p className="text-center mt-6 text-white/80 text-sm">
          Cần hỗ trợ? <a href="#" className="text-white font-medium hover:underline">Liên hệ IT</a>
        </p>
      </div>
    </div>
  );
}
