<script lang="ts">
    import type { TaskFile } from '../stores/task';
    import CodeMirror from "svelte-codemirror-editor";
    import { cpp } from "@codemirror/lang-cpp";

    export let files: TaskFile[];
    let activeFile = files[0]; // Default to the first file
    let value = activeFile.file??"";
    

</script>

<div>
    <select bind:value={activeFile} on:change={() => {}}>
        {#each files as file}
            <option value={file}>{"> "}{file.name}</option>
        {/each}
    </select>
    <div class="border"> 
        <CodeMirror bind:value on:change:{change} lang={cpp()} />
    </div>
</div>

<style>

</style>