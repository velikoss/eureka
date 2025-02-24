import { get } from "svelte/store";
import { _setVersion, _faculties, _challengeData, _logged } from "../routes/app/+layout";
import { news } from "../stores/news";
import { currentUser, type User } from "../stores/user";
import { LoginResponse, NewsResponse, TasksResponse, type APIResponse } from "./Response";
import { tasks } from "../stores/task";

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