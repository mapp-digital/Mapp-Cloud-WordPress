<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { t } from './translations';
	export let id: string;
	export let label: string;
	export let hint: string;
	export let configStore: Writable<string>;
	export let validated: boolean = true;
	export let errorMessage: string = '';
	export let type: 'input' | 'textarea' = 'input';
	const helpId = `${id}_help`;
	$: className = validated ? 'description' : 'error-message';
</script>

<tr>
	<th scope="row">
		<label for={id}>{label}</label>
	</th>
	<td>
		{#if type === 'input'}
			<input
				{id}
				name={id}
				type="text"
				bind:value={$configStore}
				class="regular-text"
				aria-describedby={helpId}
			/>
		{:else if type === 'textarea'}
			<textarea
				{id}
				bind:value={$configStore}
				class="regular-text"
				aria-describedby={helpId}
			></textarea>
		{/if}
		<p class={className} id={helpId}>
			{hint}
			{#if !validated}
				- {t.error.error}: {errorMessage}
			{/if}
		</p>
	</td>
</tr>
