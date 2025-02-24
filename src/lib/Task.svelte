<script lang="ts">
    import type { Task } from '../stores/task';

    export let task: Task;
</script>

<div class="border w-full mb-2.5 p-1 {task.status === 4 ? "bg-green-100": task.status === 3 ? "bg-red-100" : ""}">
    <div class="flex flex-row justify-between">
        <p class="font-bold text-xl mb-1">{task.name}</p>
        <p class="font-bold text-xl mb-1 right-0 text-right place-self-end">{new Date(parseInt(task.date_added) * 1000).toDateString()}</p>
    </div>
    {@html task.comment}
    {JSON.stringify(task.tools)}
</div>