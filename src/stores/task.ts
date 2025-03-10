import { writable } from "svelte/store";

export const Tools = [
    "problem","method","algo","algo-scheme","code","tests","report","aovt_operation","acmas_p1_t1", "acmas_p1_t2", "acmas_send", "algo2", "intro", "conclusion", "method2"
]

export const ToolsLang = {
    "problem" : "Постановка задачи",
    "method": "Метод решения",
    "algo" : "Алгоритм",
    "algo-scheme" : "Блок-схема",
    "code" : "Исходный код",
    "tests" : "Тестирование",
    "report" : "Отчет",
    "aovt_operation" : "aovt_operation", // idk i'm from 1 course cant know for sure what's this
    "acmas_p1_t1" : "acmas_p1_t1",  // idk i'm from 1 course cant know for sure what's this
    "acmas_p1_t2" : "acmas_p1_t2",  // idk i'm from 1 course cant know for sure what's this
    "acmas_send" : "acmas_send",  // idk i'm from 1 course cant know for sure what's this
    "algo2" : "Алгоритм", 
    "intro" : "intro",  // idk i'm from 1 course cant know for sure what's this
    "conclusion" : "conclusion",  // idk i'm from 1 course cant know for sure what's this
    "method2" : "Метод решения"
}

export interface Algo {
    id: number;
    no: number; // id + 1
    predicate: string;
    actions: string;
    next: string;
    comment: string;
}

export interface Algo2 {
    kind: string;
    class: string;
    access: string;
    name: string;
    params: string;
    ret: string;
    func: string;
    algo: Algo[];
}

export interface Tool {
    id: number;
    status: number;
}

//idk here
export interface Method2 {
    main: object;
    classes: object[];
}

// todo: any to corresponding types 
export interface Task {
    algo2: Algo2[];
    tools: Tool[];
    _armVer: number;
    method2: Method2;
    parent_id: number;
    __lastSaved: number;
    template_id: number;
    test_passed: boolean;
    task_readiness: number;
    graph_png_array: string;
    is_code_available: boolean;
    graph_svg: string;
    id: number;
    status: number;
    date_added: string;
    type: number;
    algo_text: string;
    algo_graph: string;
    method_description: string;
    comment: string;
    date_control: string;
    subject_id: number;
    teacher_name: string;
    teacher_surname: string;
    teacher_patronymic: string;
    name: string;
    task_text: string;
    task_input: string;
    theory_text: string;
    task_output: string;
}

export class TaskFile {
    name: string | undefined;
    file: string | undefined;
}

export interface TaskTest {
    rowid: number;
    student_task_id: number;
    test_input_data: string;
    test_output_data: string;
    test_comments: string;
    test_output_result: string;
    is_success: boolean;
    test_result: string;
}

export const currentTask = writable<Task>()
export const currentTaskFiles = writable<TaskFile[]>()
export const currentTaskTests = writable<TaskTest[]>()
