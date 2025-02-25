<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Task } from '../stores/tasks';
    import TaskBar from './TaskBar.svelte';

    export let task: Task;

    function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }) {
        goto(`/app/task/${task.id}`)
    }
</script>

<button type="button" class="border w-full flex flex-row mb-2.5 p-1 gap-3" on:click={handleClick}>
    <div class="relative bottom-0 w-1 h-full {task.status === 4 ? "bg-green-500": task.status === 3 ? "bg-red-500" : ""}"></div>
    <div class="w-full flex flex-col">
        <div class="flex flex-row justify-between">
            <p class="font-bold text-xl mb-1">{task.name}</p>
            <p class="font-bold text-xl mb-1 right-0 text-right place-self-end">{new Date(parseInt(task.date_added) * 1000).toDateString()}</p>
        </div>
        {@html task.comment}
    </div>
</button>