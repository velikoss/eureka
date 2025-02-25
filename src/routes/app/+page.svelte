<script lang="ts">
    import News from "$lib/News.svelte";
    import { onMount } from "svelte";
    import { news } from "../../stores/news";
    import { _sendRequest, _webSocketHandler } from "./+layout";
    import { GetTaskList, LoadNews, LoadUserPreferences } from "$lib/Request";
    import { derived, get, writable } from "svelte/store";
    import { tasks } from "../../stores/tasks";
    import Task from "$lib/Task.svelte";
    let _news: any = [];
    let _tasks: any = [];

    onMount(async () => {
        await _sendRequest(new LoadNews());
        await _sendRequest(new GetTaskList());
        await _sendRequest(new LoadUserPreferences());
        setInterval(() => {
            _news = get(news);
            _tasks = get(tasks);
        }, 100);
    })
</script>
<div class="w-full flex flex-row mt-2.5">
    <div class="w-1/2 flex flex-col px-2.5">
        {#if _tasks.length === 0}
            <p>Loading tasks...</p>
        {:else}
            {#each _tasks as task}
                <Task task={task} />
            {/each}
        {/if}
    </div>   
    <div class="w-1/2 flex flex-col px-2.5">
        {#if _news.length === 0}
            <p>Loading news...</p>
        {:else}
            {#each _news as newsItem, i}
                <News title={newsItem.title} content={newsItem.content} date_add={newsItem.date_add} />
            {/each}
        {/if}
    </div>
</div>