<script lang="ts">
    import { onMount } from 'svelte';
    import { _challengeData, _logged, _setWSH, _webSocketHandler, _WebSocketHandler } from './+layout';
    import { Authorize, GetAuthInstituteList, GetStats, GetStudentArmVersion, NewChallenge } from '$lib/Request';
    import { currentUser } from '../../stores/user';
    import { sha256 } from 'hash.js';
    import { Md5 } from 'ts-md5';
    import { goto } from '$app/navigation';
	import '../../app.css';
    import { page } from '$app/state';

    let { children } = $props();

    onMount(() => {
        if (_webSocketHandler == undefined || (_webSocketHandler as _WebSocketHandler).isClosed()) {
            const wsh = new _WebSocketHandler('ws://эврика.великосс.рф:8488');
            _setWSH(wsh);
            wsh.onOpen(() => {
                console.log("WebSocket connected");
                wsh.send(new GetStudentArmVersion());
                wsh.send(new GetAuthInstituteList());
                if ($currentUser != null) {
                    wsh.send(new GetStats());
                    _logged.subscribe((value) => {
                        if (!value) goto("/app/login")
                        currentUser.set(undefined);
                    })
                    // _webSocketHandler.send(new NewChallenge());
                    // _challengeData.subscribe((data) => {
                    //     if (data === -1.0) return;

                    //     console.log('Challenge data:', data);

                    //     // Create the authorization request
                    //     let auth = new Authorize();
                    //     auth.user_id = $currentUser.id.toString();
                    //     auth.password = $currentUser.auth_key;
                    //     auth.key = sha256().update(Md5.hashStr(`0_${$currentUser.auth_key}_${data}`, true)).digest('hex');
                    //     auth.gen = 0;
                    //     auth.g2a = 0;

                    //     _logged.subscribe((value) => {
                    //         if (!value) {
                    //             goto('/app/login');
                    //         }
                    //     });
                    //     // Send the authorization request
                    //     _webSocketHandler.send(auth);
                    // });
                } else {
                    goto('/app/login');
                }
            });
            wsh.connect();
        }
    });
</script>

<main class="font-mono w-screen">
	<div class="fixed w-screen top-0 left-0 bg-white px-5 py-2 border-b topbar flex flex-row justify-between items-baseline">
		<p class="text-xl font-bold">Eureka</p>
		<div class="flex flex-row gap-5">
			{#if $currentUser == null}
                <a href="/app/login" class="underline">Войти в систему</a>
            {/if}
            {#if $currentUser != null}
                {#if page.url.toString().includes("task")}
                    <a href="/app" class="underline">Закрыть задачу</a>
                {/if}
                <p>{$currentUser.student_suname} {$currentUser.student_name.substring(0,1)}.{$currentUser.student_patronymic.substring(0,1)}. ({$currentUser.group_name})</p>
            {/if}
		</div>
	</div>
    <div class="h-12"></div>
	{@render children()}
</main>