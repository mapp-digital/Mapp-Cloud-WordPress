<script lang="ts">
	import { v } from '../store/settings';
	import { t } from './translations';
</script>

<tr>
	<th scope="row">
		{t.header.pixel_version}
	</th>
	<td>
		<fieldset>
			<legend class="screen-reader-text"><span>{t.header.pixel_version}</span></legend>
			<label>
				<input id="General_v_5" type="radio" bind:group={$v} value={5} />
				<span class="date-time-text format-i18n">Tag Integration</span>
			</label>
			<br />
			<label>
				<input id="General_v_6" type="radio" bind:group={$v} value={6} />
				<span class="date-time-text format-i18n">Google Tag Manager</span>
			</label>
			<br />
		</fieldset>
		<p class="description" id={'ti_help'}>{t.hints.pixel_version}</p>
	</td>
</tr>
