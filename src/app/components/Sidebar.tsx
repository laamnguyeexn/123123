import { Calendar, Clock, Users, LayoutDashboard, Settings, Plus, LogOut, Building2, Bell, UserCheck, CheckSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { NotificationsDropdown } from './NotificationsDropdown';
import { Notification } from '../types';

interface SidebarProps {
  onAddMeeting: () => void;
  notifications: Notification[];
  onMarkNotificationAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
}

export function Sidebar({
  onAddMeeting,
  notifications,
  onMarkNotificationAsRead,
  onClearAllNotifications,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { id: '/admin', icon: LayoutDashboard, label: 'Tổng quan', roles: ['admin', 'manager', 'guest'] },
    { id: '/admin/calendar', icon: Calendar, label: 'Lịch làm việc', roles: ['admin', 'manager', 'guest'] },
    { id: '/admin/personal-calendar', icon: UserCheck, label: 'Xem lịch cá nhân', roles: ['admin', 'manager', 'guest'] },
    { id: '/admin/department-calendar', icon: Building2, label: 'Xem lịch phòng ban', roles: ['admin', 'manager', 'guest'] },
    { id: '/admin/meetings', icon: Users, label: 'Tham gia cuộc họp', roles: ['admin', 'manager', 'guest'] },
    { id: '/admin/approve-meetings', icon: CheckSquare, label: 'Duyệt lịch họp', roles: ['admin', 'manager'] },
    { id: '/admin/notifications', icon: Bell, label: 'Nhận thông báo', roles: ['admin', 'manager', 'guest'] },
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role || 'guest')
  );

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
            <Building2 className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="font-semibold text-lg text-gray-900">Quản lý lịch</h1>
            <p className="text-xs text-gray-500">TechCorp Vietnam</p>
          </div>
          <NotificationsDropdown
            notifications={notifications}
            onMarkAsRead={onMarkNotificationAsRead}
            onClearAll={onClearAllNotifications}
          />
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 mb-1">Xin chào,</div>
          <div className="font-medium text-sm text-gray-900">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
      </div>

      <button
        onClick={onAddMeeting}
        className="mx-4 my-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30"
        style={{ display: user?.role === 'admin' || user?.role === 'manager' ? 'flex' : 'none' }}
      >
        <Plus size={20} />
        <span>Tạo cuộc họp mới</span>
      </button>

      <nav className="flex-1 px-3">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.id;
          return (
            <Link
              key={item.id}
              to={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          to="/admin/settings"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === '/admin/settings'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings size={20} />
          <span>Cài đặt</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
