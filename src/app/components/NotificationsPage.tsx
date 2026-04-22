import { Bell, X } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { Notification } from '../types';

interface AdminContext {
  notifications: Notification[];
  onMarkNotificationAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
}

export function NotificationsPage() {
  const { notifications, onMarkNotificationAsRead, onClearAllNotifications } = useOutletContext<AdminContext & { notifications: Notification[]; onMarkNotificationAsRead: (id: string) => void; onClearAllNotifications: () => void }>();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return '📅';
      case 'reminder':
        return '⏰';
      case 'update':
        return '✏️';
      case 'cancelled':
        return '❌';
      default:
        return '📢';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Thông báo</h2>
          <p className="text-gray-600 text-sm mt-1">
            {unreadNotifications.length > 0
              ? `Bạn có ${unreadNotifications.length} thông báo chưa đọc`
              : 'Không có thông báo mới'
            }
          </p>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={onClearAllNotifications}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Chưa đọc</h3>
            <div className="space-y-3">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <span className="size-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{formatTime(notification.createdAt)}</span>
                        <button
                          onClick={() => onMarkNotificationAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Đánh dấu đã đọc
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Đã đọc</h3>
            <div className="space-y-3">
              {readNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow opacity-75"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{notification.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <span className="text-xs text-gray-500">{formatTime(notification.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Không có thông báo nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
