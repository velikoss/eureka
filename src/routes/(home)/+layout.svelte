<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<main class="font-mono w-screen">
	<div class="px-5 py-2 border-b topbar flex flex-row justify-between items-baseline">
		<p class="text-xl font-bold">Eureka</p>
		<div class="flex flex-row gap-5">
			<a href="/app" class="underline">Войти в систему</a>
		</div>
	</div>
	{@render children()}
</main>