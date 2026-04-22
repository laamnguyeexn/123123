import { createBrowserRouter } from 'react-router';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './components/Dashboard';
import { CalendarView } from './components/CalendarView';
import { MeetingsList } from './components/MeetingsList';
import { PersonalCalendar } from './components/PersonalCalendar';
import { DepartmentCalendar } from './components/DepartmentCalendar';
import { NotificationsPage } from './components/NotificationsPage';
import { ApproveMeetings } from './components/ApproveMeetings';
import { SettingsPage } from './components/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'calendar',
        element: <CalendarView />,
      },
      {
        path: 'personal-calendar',
        element: <PersonalCalendar />,
      },
      {
        path: 'department-calendar',
        element: <DepartmentCalendar />,
      },
      {
        path: 'meetings',
        element: <MeetingsList />,
      },
      {
        path: 'approve-meetings',
        element: <ApproveMeetings />,
      },
      {
        path: 'notifications',
        element: <NotificationsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Trang không tìm thấy</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    ),
  },
]);
