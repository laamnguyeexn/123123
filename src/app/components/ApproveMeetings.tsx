import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Calendar, Users, MapPin, Eye } from 'lucide-react';
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
  onApproveMeeting: (meetingId: string) => void;
  onRejectMeeting: (meetingId: string) => void;
  user: User | null;
}

export function ApproveMeetings() {
  const { meetings, onApproveMeeting, onRejectMeeting, onUpdateAttendanceStatus, onAddNote, user } =
    useOutletContext<AdminContext>();
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  // Filter meetings that need approval (scheduled meetings)
  const pendingMeetings = meetings.filter((meeting) => {
    const isPending = meeting.status === 'scheduled';
    const isInDepartment = user?.role === 'admin' || meeting.department === user?.department;

    if (filter === 'pending') {
      return isPending && isInDepartment;
    }
    return isInDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Chờ duyệt';
      case 'in-progress':
        return 'Đang diễn ra';
      case 'completed':
        return 'Đã duyệt';
      case 'cancelled':
        return 'Từ chối';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Duyệt lịch họp</h2>
          <p className="text-gray-600 text-sm mt-1">
            Quản lý và phê duyệt các yêu cầu cuộc họp
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chờ duyệt ({pendingMeetings.filter(m => m.status === 'scheduled').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {pendingMeetings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
            <Clock size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {filter === 'pending' ? 'Không có cuộc họp nào cần duyệt' : 'Không có cuộc họp nào'}
            </p>
          </div>
        ) : (
          pendingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{meeting.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        meeting.status
                      )}`}
                    >
                      {getStatusText(meeting.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{meeting.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
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
                      <span>{meeting.participants.length} người</span>
                    </div>
                  </div>

                  {meeting.department && (
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
                      <Users size={14} />
                      <span>{meeting.department}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  {meeting.participants.slice(0, 5).map((participant, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium"
                      title={participant}
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
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye size={16} />
                    Chi tiết
                  </button>
                  {meeting.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => onApproveMeeting(meeting.id)}
                        className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <CheckCircle size={16} />
                        Duyệt
                      </button>
                      <button
                        onClick={() => onRejectMeeting(meeting.id)}
                        className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <XCircle size={16} />
                        Từ chối
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
