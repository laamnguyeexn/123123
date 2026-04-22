import { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { Meeting, MeetingNote, User } from '../types';

interface MeetingDetailsProps {
  meeting: Meeting;
  user: User | null;
  onClose: () => void;
  onUpdateAttendanceStatus: (
    meetingId: string,
    userId: string,
    status: 'attending' | 'not-attending' | 'maybe'
  ) => void;
  onAddNote: (meetingId: string, content: string) => void;
}

export function MeetingDetails({
  meeting,
  user,
  onClose,
  onUpdateAttendanceStatus,
  onAddNote,
}: MeetingDetailsProps) {
  const [newNote, setNewNote] = useState('');
  const currentUserStatus = user ? meeting.attendanceStatus?.[user.id] : undefined;

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim() && user) {
      onAddNote(meeting.id, newNote.trim());
      setNewNote('');
    }
  };

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

  const formatNoteTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{meeting.title}</h2>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
              {getStatusText(meeting.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Mô tả</h3>
            <p className="text-gray-600">{meeting.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 mt-0.5" size={20} />
              <div>
                <div className="text-sm text-gray-500">Ngày</div>
                <div className="font-medium text-gray-900">
                  {new Date(meeting.date).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-gray-400 mt-0.5" size={20} />
              <div>
                <div className="text-sm text-gray-500">Thời gian</div>
                <div className="font-medium text-gray-900">{meeting.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-gray-400 mt-0.5" size={20} />
              <div>
                <div className="text-sm text-gray-500">Địa điểm</div>
                <div className="font-medium text-gray-900">{meeting.location}</div>
              </div>
            </div>

            {meeting.department && (
              <div className="flex items-start gap-3">
                <Users className="text-gray-400 mt-0.5" size={20} />
                <div>
                  <div className="text-sm text-gray-500">Phòng ban</div>
                  <div className="font-medium text-gray-900">{meeting.department}</div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Người tham gia</h3>
            <div className="space-y-2">
              {meeting.participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    {participant.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-900">{participant}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Trạng thái tham dự của bạn</h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  user && onUpdateAttendanceStatus(meeting.id, user.id, 'attending')
                }
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  currentUserStatus === 'attending'
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CheckCircle size={18} />
                Tham gia
              </button>
              <button
                onClick={() =>
                  user && onUpdateAttendanceStatus(meeting.id, user.id, 'maybe')
                }
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  currentUserStatus === 'maybe'
                    ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HelpCircle size={18} />
                Có thể
              </button>
              <button
                onClick={() =>
                  user && onUpdateAttendanceStatus(meeting.id, user.id, 'not-attending')
                }
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  currentUserStatus === 'not-attending'
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <XCircle size={18} />
                Không tham gia
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={20} />
              Ghi chú cuộc họp
            </h3>

            <form onSubmit={handleSubmitNote} className="mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Thêm ghi chú của bạn..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Thêm ghi chú
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {meeting.notes && meeting.notes.length > 0 ? (
                meeting.notes.map((note) => (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                          {note.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{note.userName}</div>
                          <div className="text-xs text-gray-500">{formatNoteTime(note.createdAt)}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm ml-10">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">Chưa có ghi chú nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
