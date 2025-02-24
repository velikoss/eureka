<script lang="ts">
    import { onMount } from 'svelte';
    import { _setWSH, _WebSocketHandler, _webSocketHandler } from './+layout';
    import { GetAuthInstituteList, GetStudentArmVersion } from '$lib/Request';

    let { children } = $props();

    onMount(() => {
        if (_webSocketHandler == null || (_webSocketHandler as _WebSocketHandler).isClosed()) {
            const wsh = new _WebSocketHandler('ws://localhost:8765');
            _setWSH(wsh);
            wsh.onOpen(() => {
                console.log("WebSocket connected");
                wsh.send(new GetStudentArmVersion());
                wsh.send(new GetAuthInstituteList());
            });
            wsh.connect();
        }
    });
</script>

<main>
    <div class="topbar"></div>
    {@render children()}
</main>