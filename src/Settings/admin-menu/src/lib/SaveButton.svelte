<script lang="ts">
	import { wrongSettings } from '../store/validation';
	import { saveSettings, saveState } from '../store/saveSettings';
	import { t } from './translations';

	$: validated = $wrongSettings.length === 0;
	$: disabled = $saveState !== '' || !validated;
	$: label = $saveState === '' ? t.save_changes : $saveState;
</script>

<button type="submit" {disabled} class="button-primary" on:click={saveSettings}>{label}</button>
{#if !validated}
	<p>Please enter a valid value for: {$wrongSettings}</p>
{/if}
