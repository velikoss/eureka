import { get } from "svelte/store";
import { _setVersion, _faculties, _challengeData, _logged } from "../routes/app/+layout";
import { news } from "../stores/news";
import { currentUser, type User } from "../stores/user";
import { LoginResponse, NewsResponse, TasksResponse, type APIResponse } from "./Response";
import { tasks } from "../stores/tasks";
import { currentTask, currentTaskFiles, currentTaskTests, type Task, type TaskFile, type TaskTest } from "../stores/task";

export abstract class APIRequest {
    abstract callback(response: APIResponse): void;
}

export class GetStudentArmVersion implements APIRequest {
    callback(response: APIResponse): void {
        console.log(response.data);
        _setVersion(response.data as unknown as number);
    }
}

interface Faculty {
    text: string; // Define the properties you expect in the response
    // Add other properties if needed
}

export class GetAuthInstituteList implements APIRequest {
    callback(response: APIResponse): void {
        console.log(response.data);
        let faculties: Faculty[] = response.data as Faculty[];
        _faculties.set(faculties!!.map((e) => e.text));
    }
}

export class NewChallenge implements APIRequest {
    callback(response: APIResponse): void {
        console.log(response.data);
        _challengeData.set(response.data as unknown as number);
    }
}

export class Authorize extends APIRequest {
    public user_id: string | undefined;
    public password: string | undefined;
    public key: string | undefined;
    public gen: number | undefined;
    public g2a: number | undefined;

    callback(response: LoginResponse): void {
        if (!response.success) return;
        let user: User = response.student!;
        user.auth_key = response.authKey ?? ""; 
        currentUser.set(user);
        _logged.set(true);
    }
}

export class GetStats extends APIRequest {
    callback(response: LoginResponse): void {
        _logged.set(response.success);
    }
}

export class LoadNews extends APIRequest {
    callback(response: NewsResponse): void {
        if (response.data && Array.isArray(response.data)) {
            news.update(() => {return response.data??[];}); // Update the store
        } else {
            console.error("Invalid data format:", response.data);
        }
    }
}

export class GetTaskList extends APIRequest {
    callback(response: TasksResponse): void {
        if (response.data && Array.isArray(response.data)) {
            tasks.update(() => {return response.data??[];}); // Update the store
        } else {
            console.error("Invalid data format:", response.data);
        }
    }
}

export class GetTask extends APIRequest {
    callback(response: APIResponse): void {
        if (!response.success) return;
        let data: Task = response.data! as Task;
        currentTask.set(data);
    }
}

export class GetTaskFiles2 extends APIRequest {
    callback(response: APIResponse): void {
        if (!response.success) return;
        let tasks: TaskFile[] = response.data as TaskFile[];
        currentTaskFiles.set(tasks);
    }
}

export class GetTaskTests extends APIRequest {
    callback(response: APIResponse): void {
        if (!response.success) return;
        let tests: TaskTest[] = response.data as TaskTest[];
        currentTaskTests.set(tests);
    }
}

export class GetTaskTestsValidity extends APIRequest {
    callback(response: APIResponse): void {
        if (!response.success) return;

        // needed?
    }
}

export class GetUnitsList extends APIRequest {
    callback(response: APIResponse): void {
        if (!response.success) return;
    }
}

export class LoadUserPreferences extends APIRequest {
    callback(response: APIResponse): void {
        if (!response.success) return;
    }
}

export class SendKBE extends APIRequest {
    start: number = new Date().getUTCSeconds();
    list: object = [[2264,"keydown",86,false,false,false,86,"v","KeyV",false,0],[2285,"keydown",69,false,false,false,69,"e","KeyE",false,0],[2326,"keyup",86,false,false,false,86,"v","KeyV",false,0],[2416,"keyup",69,false,false,false,69,"e","KeyE",false,0],[2879,"keydown",76,false,false,false,76,"l","KeyL",false,0],[2951,"keyup",76,false,false,false,76,"l","KeyL",false,0],[3050,"keydown",73,false,false,false,73,"i","KeyI",false,0],[3132,"keyup",73,false,false,false,73,"i","KeyI",false,0],[3206,"keydown",75,false,false,false,75,"k","KeyK",false,0],[3272,"keyup",75,false,false,false,75,"k","KeyK",false,0],[3355,"keydown",73,false,false,false,73,"i","KeyI",false,0],[3451,"keyup",73,false,false,false,73,"i","KeyI",false,0],[3590,"keydown",89,false,false,false,89,"y","KeyY",false,0],[3618,"keyup",89,false,false,false,89,"y","KeyY",false,0],[3649,"keydown",190,false,false,false,190,".","Period",false,0],[3728,"keyup",190,false,false,false,190,".","Period",false,0],[3810,"keydown",75,false,false,false,75,"k","KeyK",false,0],[3888,"keyup",75,false,false,false,75,"k","KeyK",false,0],[3973,"keydown",190,false,false,false,190,".","Period",false,0],[4044,"keydown",65,false,false,false,65,"a","KeyA",false,0],[4058,"keyup",190,false,false,false,190,".","Period",false,0],[4079,"keyup",65,false,false,false,65,"a","KeyA",false,0],[8293,"keydown",18,false,false,true,18,"Alt","AltLeft",false,0]];

    callback(response: APIResponse): void {
        if (!response.success) return;
    }
}