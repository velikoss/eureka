<script>
    import News from "$lib/News.svelte";
    import { onMount } from "svelte";
    import { news } from "../../stores/news";
    import { _webSocketHandler } from "./+layout";
</script>
<div class="w-full flex flex-row mt-2.5">
    <div class="w-1/2"></div>
    <div class="w-1/2 flex flex-col px-5">
        {#await news}
        {:then _news}
        {#each news as _news, i}
                <News title={_news.title} content={_news.content} date_add={parseInt(_news.date_add)}></News>
        {/each}
    </div>
</div>