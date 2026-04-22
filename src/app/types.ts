export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  department?: string;
  notes?: MeetingNote[];
  attendanceStatus?: { [userId: string]: 'attending' | 'not-attending' | 'maybe' };
}

export interface MeetingNote {
  id: string;
  meetingId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'meeting' | 'reminder' | 'update' | 'cancelled';
  meetingId?: string;
  createdAt: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}
