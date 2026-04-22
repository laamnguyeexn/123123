import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { Meeting, User } from '../types';
import { MeetingDetails } from './MeetingDetails';

interface AdminContext {
  meetings: Meeting[];
  onUpdateAttendanceStatus: (
    meetingId: string,
    userId: string,
    status: 'attending' | 'not-attending' | 'maybe'
  ) => void;
  onAddNote: (meetingId: string, content: string) => void;
  user: User | null;
}

export function PersonalCalendar() {
  const { meetings, onUpdateAttendanceStatus, onAddNote, user } = useOutletContext<AdminContext>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
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

  const getMeetingsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Filter meetings where user is participant or has attendance status
    return meetings.filter((meeting) => {
      const meetingDate = meeting.date;
      const isParticipant = user && (
        meeting.participants.includes(user.name) ||
        meeting.participants.includes(user.email)
      );
      return meetingDate === dateStr && isParticipant;
    });
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  const upcomingMeetings = meetings
    .filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isParticipant = user && (
        meeting.participants.includes(user.name) ||
        meeting.participants.includes(user.email)
      );
      return meetingDate >= today && isParticipant;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Lịch cá nhân của tôi</h2>
          <p className="text-gray-600 text-sm mt-1">Xem các cuộc họp mà bạn tham gia</p>
        </div>
        <div className="flex items-center gap-2">
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
          <div className="min-w-[140px] text-center font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button
            onClick={goToNextMonth}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayMeetings = getMeetingsForDate(day);
              const hasMultipleMeetings = dayMeetings.length > 1;

              return (
                <div
                  key={index}
                  className={`min-h-[80px] p-2 border border-gray-100 rounded-lg ${
                    day
                      ? isToday(day)
                        ? 'bg-blue-50 border-blue-300'
                        : 'hover:bg-gray-50'
                      : 'bg-gray-50'
                  } ${dayMeetings.length > 0 ? 'cursor-pointer' : ''}`}
                >
                  {day && (
                    <>
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isToday(day) ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayMeetings.slice(0, 2).map((meeting) => (
                          <div
                            key={meeting.id}
                            onClick={() => setSelectedMeeting(meeting)}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded truncate hover:bg-blue-200 transition-colors"
                            title={meeting.title}
                          >
                            {meeting.title}
                          </div>
                        ))}
                        {hasMultipleMeetings && dayMeetings.length > 2 && (
                          <div className="text-xs text-gray-500 px-2">
                            +{dayMeetings.length - 2} khác
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Meetings Sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Cuộc họp sắp tới</h3>
          <div className="space-y-3">
            {upcomingMeetings.length === 0 ? (
              <p className="text-gray-500 text-sm">Không có cuộc họp sắp tới</p>
            ) : (
              upcomingMeetings.slice(0, 5).map((meeting) => (
                <div
                  key={meeting.id}
                  onClick={() => setSelectedMeeting(meeting)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-sm text-gray-900 mb-2">{meeting.title}</div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={12} />
                      <span>{new Date(meeting.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} />
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedMeeting && (
        <MeetingDetails
          meeting={selectedMeeting}
          user={user}
          onClose={() => setSelectedMeeting(null)}
          onUpdateAttendanceStatus={onUpdateAttendanceStatus}
          onAddNote={onAddNote}
        />
      )}
    </div>
  );
}
