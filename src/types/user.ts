
export interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    date: string;
}

export interface Register {
    s_name: string;
    s_pass: string;
}
export interface DialogueData {
    conversation_id: string;
    created_at: string;
    inputs: object;
    introduction: string;
    is_deleted: boolean;
    names: string;
    s_id?: number;
    updated_at: string;
    users:string;
  }