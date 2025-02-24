import type { APIRequest } from "$lib/Request";
import type { APIResponse } from "$lib/Response";
import { get, writable, type Writable } from "svelte/store";
import { WebsocketBuilder, Websocket } from "websocket-ts";

export const ssr = false;

export let _logged = writable(false);
export let _challengeData = writable(-1.0);
export let _faculties: Writable<String[]> = writable([]);
export let _version = writable(0);
export function _setVersion(version: number) {
    _version.set(version);
}
export let _webSocketHandler: _WebSocketHandler;
export function _setWSH(webSocketHandler: _WebSocketHandler) {
    _webSocketHandler = webSocketHandler;
}

export class _WebSocketHandler {
    private ws: Websocket | null = null;
    private url: string;
    private requests = new Map<number, Function>();
    private i: number = 0;
    private onOpenCallback: (() => void) | null = null;
    private onMessageCallback: ((message: string) => void) | null = null;
    private onCloseCallback: (() => void) | null = null;
    private onErrorCallback: ((error: Event) => void) | null = null;

    constructor(url: string) {
        this.url = url;
        this.onMessageCallback = (message: string) => {
            console.log(`Received message: ${message}`);
            const data = JSON.parse(message);
            const taskId = data.arm_task_id; // Ensure this matches the server response
            const storedCallback = this.requests.get(taskId); // Retrieve the callback

            if (storedCallback) {
                storedCallback(data); // Invoke the callback
                this.requests.delete(taskId); // Clean up
            }
    
            // callback(message); // Invoke the global callback
        };
    }

    public connect(): void {
        this.ws = new WebsocketBuilder(this.url)
            .onOpen((ws, ev) => {
                if (this.onOpenCallback) {
                    this.onOpenCallback(); // Invoke the callback when the connection is open
                }
            })
            .onMessage((ws, ev) => {
                if (this.onMessageCallback) {
                    this.onMessageCallback(ev.data);
                }
            })
            .onClose((ws, ev) => {
                if (this.onCloseCallback) {
                    this.onCloseCallback();
                }
            })
            .onError((ws, ev) => {
                if (this.onErrorCallback) {
                    this.onErrorCallback(ev);
                }
            })
            .build();
    }

    public send(message: APIRequest): void {
        if (this.ws) {
            let task: string = message.constructor.name;
            task = task[0].toLowerCase() + task.substring(1);
            console.log(
                JSON.stringify(
                    {
                        'data': message,
                        'ser_task': task,
                        'arm_task_id': this.i + 1,
                        'v': get(_version)
                    }
                )
            );
            this.ws.send(JSON.stringify(
                {
                    'data': message,
                    'ser_task': task,
                    'arm_task_id': ++this.i,
                    'v': get(_version)
                }
            ));
            this.requests.set(this.i, message.callback); 
        } else {
            console.error("WebSocket is not connected");
        }
    }

    public isClosed(): boolean {
        return !this.ws || this.ws.readyState > 1; 
    }

    public close(): void {
        if (this.ws) {
            this.ws.close();
        } else {
            console.error("WebSocket is not connected");
        }
    }

    public onOpen(callback: () => void): void {
        this.onOpenCallback = callback; // Assign the callback
    }

    public onClose(callback: () => void): void {
        this.onCloseCallback = callback; // Assign the callback
    }

    public onError(callback: (error: Event) => void): void {
        this.onErrorCallback = callback; // Assign the callback
    }
}

// Usage example:
// const wsHandler = new WebSocketHandler("ws://your-websocket-url");
// wsHandler.onOpen(() => {
//     console.log("Connected!");
//     wsHandler.send("Hello, server!");
// });
// wsHandler.onMessage((message) => {
//     console.log("Received message:", message);
// });
// wsHandler.connect();