<script>
	import SaveButton from "./components/SaveButton.svelte";
	import Layout from './components/Layout.svelte';

	import { configuration } from "./store/configuration";
	$: debugConfig = JSON.stringify($configuration);
	let debug = false;
	if (document.cookie.indexOf('wt_debug') !== -1) {
		debug = true;
	}

</script>
<main>
	{#if debug}
		<textarea cols="70" bind:value={debugConfig}></textarea>
	{/if}
	<p>For a detailed step-by-step implementation guide, please visit <a href="https://docs.mapp.com/display/WP" target="_blank">docs.mapp.com/display/WP</a></p>
	<Layout />
	<p>
		<SaveButton />
	</p>
</main>