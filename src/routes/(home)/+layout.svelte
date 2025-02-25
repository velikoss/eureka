<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<main class="font-mono w-screen">
	<div class="fixed w-screen top-0 left-0 px-5 py-2 border-b topbar bg-white flex flex-row justify-between items-baseline">
		<p class="text-xl font-bold">Eureka</p>
		<div class="flex flex-row gap-5">
			<a href="/app" class="underline">Войти в систему</a>
		</div>
	</div>
	<div class="h-12"></div>
	{@render children()}
</main>