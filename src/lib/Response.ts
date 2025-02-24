export class APIResponse {
    success: boolean = false;
    data: object | undefined;
    arm_task_id: number | undefined;
}

export class LoginResponse extends APIResponse {
    authKey: string | undefined;
}