<script lang="ts">
	import { excludeWpUser } from "../store/settings";
	import { t } from "./translations";
</script>

<tr>
    <th scope="row">
        <label for="exclude_user">{t.header.exclude_users}</label>
    </th>
    <td>
        <fieldset>
            <legend class="screen-reader-text"><span>{t.header.exclude_users}</span></legend>
            <label for="exclude_user">
                <input type="checkbox" id="mapp_excludeWpUser" bind:checked={$excludeWpUser}>{t.hints.exclude_users}
            </label>
        </fieldset>
    </td>
</tr>