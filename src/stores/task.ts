import { writable } from "svelte/store";

export interface ToolComment {
    text: any;
    type: string;
}

export interface TaskTool {
    id: number;
    status: number;
    comments: ToolComment[];
}

export interface Task {
    id: number;
    teacher_task_id: number;
    status: number;
    task_delay: any;
    tools: TaskTool[];
    date_added: string;
    type: number;
    score: any;
    comment: any;
    name: string;
    parent_id: number;
    section_id: number;
    has_theory_text: boolean;
    subject_id: number;
    language_id: number;
    date_control: string;
    isLocked: boolean;
}

export const tasks = writable<Task[]>([])