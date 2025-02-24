<script lang="ts">
    import News from "$lib/News.svelte";
    import { onMount } from "svelte";
    import { news } from "../../stores/news";
    import { _sendRequest, _webSocketHandler } from "./+layout";
    import { LoadNews } from "$lib/Request";
    import { derived, get, writable } from "svelte/store";
    let _news: any = [];

    onMount(async () => {
        await _sendRequest(new LoadNews());
        const newsUpdater = setInterval(() => {
            _news = get(news);
            if (_news.length > 0) {
                clearInterval(newsUpdater);
            } 
        }, 100);
    })
</script>
<div class="w-full flex flex-row mt-2.5">
    <div class="w-1/2"></div>   
    <div class="w-1/2 flex flex-col px-5">
        {#if _news.length === 0}
            <p>Loading news...</p>
        {:else}
            {#each _news as newsItem, i}
                <News title={newsItem.title} content={newsItem.content} date_add={newsItem.date_add} />
            {/each}
        {/if}
    </div>
</div>