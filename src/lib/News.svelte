<script lang="ts">
    export let title: string;
    export let content: string;
    export let date_add: number; 
</script>

<div class="border w-full mb-2.5 p-1">
    <p class="font-bold text-2xl mb-1">{title}</p>
    {@html content}
</div>