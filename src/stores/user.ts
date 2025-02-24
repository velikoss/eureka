import { writable } from "svelte/store";


// {"must_change_passw":false,"success":true,"student":{"id":11478,"student_name":"Кирилл","student_suname":"Великий","student_patronymic":"Александрович","group_id":802,"use_external_auth":true,"group_name":"ИВБО-12-24"},"authKey":"{d38af9c4-d54d-4973-b3f4-8173fc8ee085}","arm_task_id":4,"_type":"rsp"}
export interface User {
    id: number;
    group_id: number;
    group_name: string;
    student_name: string;
    student_suname: string;
    student_patronymic: string;
    auth_key: string;
}

export const currentUser = writable<User | undefined>(localStorage.getItem('currentUser') && localStorage.getItem('currentUser')!.charAt(0) == '{' ? JSON.parse(localStorage.getItem('currentUser')!) : undefined)
currentUser.subscribe((value) => localStorage.currentUser = JSON.stringify(value))