export type Role = 'FACULTY' | 'HOD' | 'ACADEMIC' | 'STUDENT';

export type RequestStatus = 
  | 'PENDING_HOD' 
  | 'REJECTED_HOD' 
  | 'PENDING_ACADEMIC' 
  | 'IMPLEMENTED'
  | 'EXPIRED';

export type RequestType = 'marks' | 'date' | 'venue' | 'revaluation';

export interface ChangeRequest {
  id: string | number;
  request_id: string;
  faculty_id: string;
  faculty_name: string;
  type: RequestType;
  student_name?: string;
  student_reg_num?: string;
  subject_name?: string;
  description: string;
  old_value?: string;
  new_value?: string;
  status: RequestStatus;
  hod_comment?: string;
  academic_comment?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  student_reg_num?: string;
  status?: 'APPROVED' | 'PENDING_FACULTY' | 'PENDING_HOD' | 'PENDING_ACADEMIC' | 'REJECTED';
}
