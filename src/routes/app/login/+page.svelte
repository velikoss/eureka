<script lang="ts">
    import { Authorize, LoadNews, NewChallenge } from "$lib/Request";
    import { _challengeData, _faculties, _version, _webSocketHandler } from "../+layout";
    import { onMount } from 'svelte';
    import { sha256 } from 'hash.js';
    import { Md5 } from 'ts-md5';
    import { currentUser } from "../../../stores/user";
    import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";

    let version = 166;
    let login = '';
    let password = '';
    let selectedFaculty = '';
    let rememberMe = false;

    // Handle the login process
    const handleLogin = async () => {
        if (!login || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Send a new challenge request
        _webSocketHandler!.send(new NewChallenge());

        // Subscribe to challenge data
        _challengeData.subscribe((data) => {
            if (data === -1.0) return;

            console.log('Challenge data:', data);

            // Create the authorization request
            let auth = new Authorize();
            auth.user_id = login + "@edu.mirea.ru";
            auth.password = password;
            auth.key = sha256().update(Md5.hashStr(`0_${password}_${data}`, true)).digest('hex');
            auth.gen = 0;
            auth.g2a = 0;

            // Send the authorization request
            _webSocketHandler!.send(auth);
        });

        // Subscribe to the current user store
        currentUser.subscribe((value) => {
            if (value === null) return;

            // Redirect to /app if the user is logged in
            throw goto("/app");
        });
        
    };
</script>

<div class="w-screen h-[95vh] flex flex-col justify-center items-center justify-items-center">
    <div class="p-5 border">
        <div class="w-full flex flex-row gap-4">
            <p class="text-xl font-bold">Eureka</p>
            <div class="w-full h-[15px] border-b-2 border-dashed"></div>
        </div>
        <p class="text-xl">version: {version} (aurora api: <u class="{version!=$_version?"text-red-500":"text-black"}">{$_version == 0? "000" : $_version}</u>)</p>
        <div class="pt-5 h-0 border-b"></div>
        <div class="pb-6 h-0"></div>

        <p>Login (@edu.mirea.ru):</p>
        <input class="w-full border h-8 mb-2.5 px-2" type="text" bind:value={login}>
        <p>Password:</p>
        <input class="w-full border h-8 mb-2.5 px-2" type="password" bind:value={password}>
        <p>Faculty:</p>
        <select class="w-full border h-8 px-2 mb-2.5" bind:value={selectedFaculty}>
            {#each $_faculties as item, i }
                <option value="{i}">{item}</option>
            {/each}
        </select>

        <div class="flex items-center mb-2.5">
            <input class="border h-4 w-4 mr-2" type="checkbox" bind:checked={rememberMe}>
            <p>Remember me</p>
        </div>

        <button class="w-full border py-1 underline cursor-grab" type="submit" on:click={handleLogin}>Login</button>
    </div>
    малусенки 2025
</div>