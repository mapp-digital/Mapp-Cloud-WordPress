<script lang="ts">
	import ExcludeUserCheckbox from './lib/ExcludeUserCheckbox.svelte';
	import PixelVersionSelect from './lib/PixelVersionSelect.svelte';
	import SaveButton from './lib/SaveButton.svelte';
	import Text from './lib/Text.svelte';
	import { t } from './lib/translations';
	import { v, acquire, tiId, gtmId, filterKeys, tiDomain } from './store/settings';
	import {
		acquireValidated,
		tiIdValidated,
		tiDomainValidated,
		gtmIdValidated
	} from './store/validation';
	import { saveSettings } from './store/saveSettings';
</script>

<main>
	<p>{t.docs}<a href={t.link} target="_blank">{t.link}</a></p>
		<table class="form-table">
			<tbody>
				<PixelVersionSelect />
				{#if $v === 5}
					<Text
						id="mapp_tiId"
						label={t.header.ti_id}
						hint={t.hints.ti_id}
						configStore={tiId}
						validated={$tiIdValidated}
						errorMessage={t.error.ti_id}
					/>
					<Text
						id="mapp_tidomain"
						label={t.header.ti_domain}
						hint={t.hints.ti_domain}
						configStore={tiDomain}
						validated={$tiDomainValidated}
						errorMessage={t.error.ti_domain}
					/>
				{:else if $v === 6}
					<Text
						id="mapp_gtmId"
						label={t.header.gtm_id}
						hint={t.hints.gtm_id}
						configStore={gtmId}
						validated={$gtmIdValidated}
						errorMessage={t.error.gtm_id}
					/>
				{/if}
				<Text
					id="mapp_filterKeys"
					label={t.header.exclude_keys}
					hint={t.hints.exclude_keys}
					configStore={filterKeys}
					type="textarea"
				/>
				<ExcludeUserCheckbox />
				<Text
					id="mapp_acquire"
					label={t.header.acquire}
					hint={t.hints.acquire}
					configStore={acquire}
					validated={$acquireValidated}
					errorMessage={t.error.acquire}
					type="textarea"
				/>
			</tbody>
		</table>
		<SaveButton />
</main>

<style>
</style>
