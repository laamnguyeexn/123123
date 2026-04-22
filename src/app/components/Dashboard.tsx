import { Calendar, Users, Clock, TrendingUp, Eye } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { Meeting, User } from '../types';
import { useState } from 'react';
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

export function Dashboard() {
  const { meetings, onUpdateAttendanceStatus, onAddNote, user } = useOutletContext<AdminContext>();
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const today = new Date();
  const todayMeetings = meetings.filter((m) => {
    const meetingDate = new Date(m.date);
    return meetingDate.toDateString() === today.toDateString();
  });

  const upcomingMeetings = meetings.filter((m) => {
    const meetingDate = new Date(m.date);
    return meetingDate > today;
  });

  const stats = [
    {
      label: 'Họp hôm nay',
      value: todayMeetings.length,
      icon: Calendar,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Họp sắp tới',
      value: upcomingMeetings.length,
      icon: Clock,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Tổng cuộc họp',
      value: meetings.length,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Hoàn thành',
      value: meetings.filter((m) => m.status === 'completed').length,
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tổng quan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} ${stat.textColor} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
                <div className={`${stat.color} h-2 w-2 rounded-full`}></div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Họp hôm nay</h3>
          <div className="space-y-3">
            {todayMeetings.length === 0 ? (
              <p className="text-gray-500 text-sm">Không có cuộc họp nào hôm nay</p>
            ) : (
              todayMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Clock size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{meeting.title}</div>
                    <div className="text-sm text-gray-500">{meeting.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        meeting.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : meeting.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {meeting.status === 'scheduled'
                        ? 'Đã lên lịch'
                        : meeting.status === 'in-progress'
                        ? 'Đang diễn ra'
                        : 'Hoàn thành'}
                    </span>
                    <Eye size={16} className="text-gray-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Họp sắp tới</h3>
          <div className="space-y-3">
            {upcomingMeetings.slice(0, 5).length === 0 ? (
              <p className="text-gray-500 text-sm">Không có cuộc họp sắp tới</p>
            ) : (
              upcomingMeetings.slice(0, 5).map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{meeting.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(meeting.date).toLocaleDateString('vi-VN')} - {meeting.time}
                    </div>
                  </div>
                  <Eye size={16} className="text-gray-400" />
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
