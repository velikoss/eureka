import { _setVersion, _faculties, _challengeData, _logged } from "../routes/app/+layout";
import { news } from "../stores/news";
import { currentUser, type User } from "../stores/user";
import { LoginResponse, NewsResponse, type APIResponse } from "./Response";

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
    // {"data":{"count":20,"offset":0},"ser_task":"loadNews","arm_task_id":10,"v":165}
    callback(response: NewsResponse): void {
        console.log(response.data)
        news.set(response.data)
    }
}