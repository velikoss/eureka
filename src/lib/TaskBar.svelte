<script lang="ts">
    import { get, writable, type Writable } from "svelte/store";
    import { Tools, ToolsLang, type Task } from "../stores/task";
    import { getContext, onMount } from "svelte";

    export let state1: Writable<string>;
    let state = get(state1);
    export let task: Task;

    let toolsUsed: any[] = [];

    task.tools.forEach(element => {
        toolsUsed.push({
            "value": ToolsLang[Tools[element.id-1] as keyof typeof ToolsLang],
            "key": Tools[element.id-1]
        });
    });
</script>
<div class="flex flex-col">
    <div class="w-full border-b px-1 py-0.5">
        {task.name}
    </div>
    {#if $state1}
        {#each toolsUsed as tool}
            <button class="w-full border-b px-1 py-0.5 {tool.key === state ? "underline" : ""}" on:click={() => {
                state1.set(tool.key);
                state = tool.key;
            }}>
                {tool.key === state ? "> " : ""}{tool.value}
            </button>
        {/each}
    {/if}
</div>