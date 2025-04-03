
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunicationRecord {
  id: string;
  type: 'email' | 'notification';
  subject: string;
  content: string;
  recipients: string[];
  sentAt: string;
  sentBy: string;
  status: 'sent' | 'failed' | 'pending';
}
