import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { MeetingForm } from './MeetingForm';
import { Meeting, Notification } from '../types';
import { useAuth } from '../context/AuthContext';

export function AdminLayout() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | undefined>();
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Họp Ban Giám Đốc',
      description: 'Họp định kỳ hàng tuần với Ban Giám Đốc để đánh giá tiến độ công việc',
      date: '2026-04-06',
      time: '09:00',
      location: 'Phòng họp tầng 5',
      participants: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'],
      status: 'scheduled',
      department: 'Giám đốc',
      notes: [],
      attendanceStatus: {},
    },
    {
      id: '2',
      title: 'Họp team Marketing',
      description: 'Thảo luận chiến lược marketing quý 2',
      date: '2026-04-06',
      time: '14:00',
      location: 'Phòng họp tầng 3',
      participants: ['Hoàng Văn E', 'Võ Thị F', 'Đặng Văn G'],
      status: 'scheduled',
      department: 'Marketing',
      notes: [],
      attendanceStatus: {},
    },
    {
      id: '3',
      title: 'Review dự án ABC',
      description: 'Đánh giá tiến độ và kết quả dự án ABC',
      date: '2026-04-07',
      time: '10:00',
      location: 'Phòng họp A',
      participants: ['Nguyễn Văn A', 'Trần Văn H', 'Lê Thị I', 'Phan Văn K'],
      status: 'scheduled',
      department: 'Dự án',
      notes: [],
      attendanceStatus: {},
    },
    {
      id: '4',
      title: 'Họp chuyên môn phát triển sản phẩm',
      description: 'Thảo luận các tính năng mới cho sản phẩm',
      date: '2026-04-08',
      time: '13:30',
      location: 'Phòng họp tầng 4',
      participants: ['Bùi Văn L', 'Đinh Thị M', 'Dương Văn N', 'Cao Thị O', 'Hồ Văn P'],
      status: 'scheduled',
      department: 'Phát triển',
      notes: [],
      attendanceStatus: {},
    },
    {
      id: '5',
      title: 'Tổng kết quý 1',
      description: 'Họp tổng kết kết quả kinh doanh quý 1/2026',
      date: '2026-04-05',
      time: '09:00',
      location: 'Hội trường tầng 1',
      participants: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'],
      status: 'completed',
      department: 'Công ty',
      notes: [],
      attendanceStatus: {},
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Cuộc họp sắp bắt đầu',
      message: 'Họp Ban Giám Đốc bắt đầu lúc 09:00',
      type: 'reminder',
      meetingId: '1',
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'Cuộc họp mới được tạo',
      message: 'Họp team Marketing đã được lên lịch',
      type: 'meeting',
      meetingId: '2',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: 'Cập nhật cuộc họp',
      message: 'Review dự án ABC đã được cập nhật thời gian',
      type: 'update',
      meetingId: '3',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ]);

  const handleAddMeeting = () => {
    setEditingMeeting(undefined);
    setShowForm(true);
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setShowForm(true);
  };

  const handleSaveMeeting = (meetingData: Omit<Meeting, 'id'> | Meeting) => {
    if ('id' in meetingData) {
      setMeetings(meetings.map((m) => (m.id === meetingData.id ? meetingData as Meeting : m)));
    } else {
      const newMeeting: Meeting = {
        ...meetingData,
        id: Date.now().toString(),
      };
      setMeetings([...meetings, newMeeting]);
    }
    setShowForm(false);
    setEditingMeeting(undefined);
  };

  const handleDeleteMeeting = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa cuộc họp này?')) {
      setMeetings(meetings.filter((m) => m.id !== id));
    }
  };

  const handleMeetingClick = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setShowForm(true);
  };

  const handleUpdateAttendanceStatus = (
    meetingId: string,
    userId: string,
    status: 'attending' | 'not-attending' | 'maybe'
  ) => {
    setMeetings(
      meetings.map((m) =>
        m.id === meetingId
          ? {
              ...m,
              attendanceStatus: {
                ...m.attendanceStatus,
                [userId]: status,
              },
            }
          : m
      )
    );
  };

  const handleAddNote = (meetingId: string, content: string) => {
    const newNote = {
      id: Date.now().toString(),
      meetingId,
      userId: user?.id || '1',
      userName: user?.name || 'Unknown',
      content,
      createdAt: new Date().toISOString(),
    };

    setMeetings(
      meetings.map((m) =>
        m.id === meetingId
          ? {
              ...m,
              notes: [...(m.notes || []), newNote],
            }
          : m
      )
    );
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleApproveMeeting = (meetingId: string) => {
    setMeetings(
      meetings.map((m) =>
        m.id === meetingId ? { ...m, status: 'completed' as const } : m
      )
    );

    // Add notification
    const meeting = meetings.find((m) => m.id === meetingId);
    if (meeting) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: 'Cuộc họp được duyệt',
        message: `${meeting.title} đã được phê duyệt`,
        type: 'update',
        meetingId: meeting.id,
        createdAt: new Date().toISOString(),
        read: false,
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  const handleRejectMeeting = (meetingId: string) => {
    if (confirm('Bạn có chắc chắn muốn từ chối cuộc họp này?')) {
      setMeetings(
        meetings.map((m) =>
          m.id === meetingId ? { ...m, status: 'cancelled' as const } : m
        )
      );

      // Add notification
      const meeting = meetings.find((m) => m.id === meetingId);
      if (meeting) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: 'Cuộc họp bị từ chối',
          message: `${meeting.title} đã bị từ chối`,
          type: 'cancelled',
          meetingId: meeting.id,
          createdAt: new Date().toISOString(),
          read: false,
        };
        setNotifications([newNotification, ...notifications]);
      }
    }
  };

  return (
    <div className="size-full flex bg-gray-50">
      <Sidebar
        onAddMeeting={handleAddMeeting}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onClearAllNotifications={handleClearAllNotifications}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet
            context={{
              meetings,
              onEdit: handleEditMeeting,
              onDelete: handleDeleteMeeting,
              onMeetingClick: handleMeetingClick,
              onUpdateAttendanceStatus: handleUpdateAttendanceStatus,
              onAddNote: handleAddNote,
              onApproveMeeting: handleApproveMeeting,
              onRejectMeeting: handleRejectMeeting,
              user,
              notifications,
              onMarkNotificationAsRead: handleMarkNotificationAsRead,
              onClearAllNotifications: handleClearAllNotifications,
            }}
          />
        </div>
      </main>

      {showForm && (
        <MeetingForm
          meeting={editingMeeting}
          onSave={handleSaveMeeting}
          onClose={() => {
            setShowForm(false);
            setEditingMeeting(undefined);
          }}
        />
      )}
    </div>
  );
}
