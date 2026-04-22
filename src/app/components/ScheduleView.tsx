import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { Meeting } from '../types';

interface AdminContext {
  meetings: Meeting[];
  onMeetingClick: (meeting: Meeting) => void;
}

export function ScheduleView() {
  const { meetings, onMeetingClick } = useOutletContext<AdminContext>();
  const groupedMeetings: { [key: string]: Meeting[] } = {};

  meetings.forEach((meeting) => {
    const dateKey = new Date(meeting.date).toLocaleDateString('vi-VN');
    if (!groupedMeetings[dateKey]) {
      groupedMeetings[dateKey] = [];
    }
    groupedMeetings[dateKey].push(meeting);
  });

  const sortedDates = Object.keys(groupedMeetings).sort((a, b) => {
    const dateA = a.split('/').reverse().join('-');
    const dateB = b.split('/').reverse().join('-');
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Lịch công tác</h2>

      <div className="space-y-6">
        {sortedDates.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <p className="text-gray-500">Chưa có lịch công tác nào</p>
          </div>
        ) : (
          sortedDates.map((date) => {
            const dateMeetings = groupedMeetings[date].sort((a, b) => {
              return a.time.localeCompare(b.time);
            });

            return (
              <div key={date} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <Calendar size={20} />
                    <span className="font-semibold">{date}</span>
                    <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded text-sm">
                      {dateMeetings.length} cuộc họp
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {dateMeetings.map((meeting) => (
                    <button
                      key={meeting.id}
                      onClick={() => onMeetingClick(meeting)}
                      className="w-full p-6 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center justify-center min-w-[80px] p-3 bg-blue-50 rounded-lg">
                          <Clock size={20} className="text-blue-600 mb-1" />
                          <span className="font-semibold text-blue-600">{meeting.time}</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{meeting.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{meeting.description}</p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-gray-400" />
                              <span>{meeting.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-gray-400" />
                              <span>{meeting.participants.length} người</span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                meeting.status === 'scheduled'
                                  ? 'bg-blue-100 text-blue-700'
                                  : meeting.status === 'in-progress'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : meeting.status === 'completed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {meeting.status === 'scheduled'
                                ? 'Đã lên lịch'
                                : meeting.status === 'in-progress'
                                ? 'Đang diễn ra'
                                : meeting.status === 'completed'
                                ? 'Hoàn thành'
                                : 'Đã hủy'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
