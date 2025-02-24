import type { News } from "../stores/news";
import type { User } from "../stores/user";

export class APIResponse {
    success: boolean = false;
    data: object | undefined;
    arm_task_id: number | undefined;
}

export class NewsResponse extends APIResponse {
    declare data: News[] | undefined;
}

export class LoginResponse extends APIResponse {
    student: User | undefined;
    authKey: string | undefined;
}