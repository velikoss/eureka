import { writable } from "svelte/store";

export interface News {
    title: string;
    content: string;
    date_add: string;
}

export const news = writable<News[]>([])