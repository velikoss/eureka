<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { _webSocketHandler } from '../../+layout';
    import { GetTask, GetTaskFiles2, GetTaskTests, GetTaskTestsValidity, GetUnitsList, SendKBE } from '$lib/Request';
    import { currentTask, currentTaskFiles } from '../../../../stores/task';
    import { get, writable } from 'svelte/store';
    import type { Task, TaskFile } from '../../../../stores/task';
    import TaskBar from '$lib/TaskBar.svelte';
    import CodeEditor from '$lib/CodeEditor.svelte';
    let id = page.params.id;
    let state = writable("problem");
    let _state = "";
    let _task: Task | undefined;
    let _taskFiles: TaskFile[] | undefined;
    onMount(() => {
        _webSocketHandler.send(new SendKBE());
        _webSocketHandler.send(new GetTask(), parseInt(id));
        _webSocketHandler.send(new GetTaskFiles2(), parseInt(id));
        _webSocketHandler.send(new GetTaskTests(), parseInt(id));
        _webSocketHandler.send(new GetTaskTestsValidity(), parseInt(id));
        setInterval(() => {
            _task = get(currentTask);
            _state = get(state);
            _taskFiles = get(currentTaskFiles);
        }, 0);
    });
</script>

<div class="task flex flex-row gap-1 divide-black divide-solid divide-x -mt-1">
    <div class="w-64 h-screen flex flex-col place-content-between">
        {#if _task}
            <TaskBar task={_task} state1={state}></TaskBar>
        {/if}
        <p class="text-center pb-12">малюсенки 2025</p>
    </div>
    <div class="w-full p-2">
        {#if !_task}
        <p>Loading task...</p>
        {/if}
        {#if _task}
        {#if _state == "problem"}
            {@html _task?.theory_text} 
            {@html _task?.task_text} 
            {@html _task?.algo_text} 
        {/if}
        {#if _state == "method2"}
            {JSON.stringify(_task.method2)}
        {/if}
        {#if _state == "algo2"}
            {#each _task.algo2 as algo}
                {#each algo.algo as algo2}
                    {JSON.stringify(algo2)} <br>
                {/each}
            {/each}
        {/if}
        {#if _state == "algo-scheme"}
            {JSON.stringify(_task.algo_graph)}
        {/if}
        {#if _state == "code"}
            <CodeEditor files={_taskFiles!}> </CodeEditor>
        {/if}
        {/if}
    </div>
</div>