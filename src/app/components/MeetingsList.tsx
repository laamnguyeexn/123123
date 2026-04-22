import { useState } from 'react';
import { Clock, MapPin, Users, Calendar, Edit2, Trash2, Search, Eye } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { Meeting, User } from '../types';
import { MeetingDetails } from './MeetingDetails';

interface AdminContext {
  meetings: Meeting[];
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: string) => void;
  onUpdateAttendanceStatus: (
    meetingId: string,
    userId: string,
    status: 'attending' | 'not-attending' | 'maybe'
  ) => void;
  onAddNote: (meetingId: string, content: string) => void;
  user: User | null;
}

export function MeetingsList() {
  const { meetings, onEdit, onDelete, onUpdateAttendanceStatus, onAddNote, user } =
    useOutletContext<AdminContext>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || meeting.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Đã lên lịch';
      case 'in-progress':
        return 'Đang diễn ra';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Danh sách cuộc họp</h2>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc họp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="scheduled">Đã lên lịch</option>
          <option value="in-progress">Đang diễn ra</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <p className="text-gray-500">Không tìm thấy cuộc họp nào</p>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{meeting.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{meeting.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{new Date(meeting.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{meeting.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span>{meeting.participants.length} người tham gia</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                    {getStatusText(meeting.status)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  {meeting.participants.slice(0, 5).map((participant, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium"
                    >
                      {participant.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {meeting.participants.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                      +{meeting.participants.length - 5}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMeeting(meeting)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Xem chi tiết"
                  >
                    <Eye size={18} />
                  </button>
                  {user?.role === 'admin' || user?.role === 'manager' && (
                    <>
                      <button
                        onClick={() => onEdit(meeting)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(meeting.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
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
