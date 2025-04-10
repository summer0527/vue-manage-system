
export interface User {
    s_id: number;
    s_portrait_class: string;
    s_portrait_role: string;
    is_deleted: boolean;
    created_at: Date;
  
}

export interface Register {
    s_name: string;
    s_pass: string;
}