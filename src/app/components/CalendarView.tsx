import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Users as UsersIcon } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { Meeting, User as UserType } from '../types';

interface AdminContext {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
  user: UserType | null;
}

export function CalendarView() {
  const { meetings, onMeetingClick, user } = useOutletContext<AdminContext>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'personal' | 'department'>('personal');

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const getMeetingsForDate = (day: number) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toDateString();

    const allMeetings = meetings.filter((m) => new Date(m.date).toDateString() === dateStr);

    if (viewMode === 'personal') {
      return allMeetings.filter(
        (m) => m.participants.includes(user?.name || '') || m.participants.includes(user?.email || '')
      );
    }

    return allMeetings;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-24"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayMeetings = getMeetingsForDate(day);
    const isToday =
      day === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear();

    days.push(
      <div
        key={day}
        className={`min-h-24 border border-gray-200 p-2 ${
          isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
        }`}
      >
        <div
          className={`text-sm mb-1 ${
            isToday ? 'text-blue-600 font-semibold' : 'text-gray-700'
          }`}
        >
          {day}
        </div>
        <div className="space-y-1">
          {dayMeetings.slice(0, 3).map((meeting) => (
            <button
              key={meeting.id}
              onClick={() => onMeetingClick(meeting)}
              className="w-full text-left text-xs p-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors truncate"
            >
              {meeting.time} {meeting.title}
            </button>
          ))}
          {dayMeetings.length > 3 && (
            <div className="text-xs text-gray-500 pl-1">+{dayMeetings.length - 3} khác</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mr-2">
            <button
              onClick={() => setViewMode('personal')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 ${
                viewMode === 'personal'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User size={16} />
              Lịch cá nhân
            </button>
            <button
              onClick={() => setViewMode('department')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-2 ${
                viewMode === 'department'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UsersIcon size={16} />
              Lịch phòng ban
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hôm nay
          </button>
          <button
            onClick={goToPreviousMonth}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">{days}</div>
      </div>
    </div>
  );
}
