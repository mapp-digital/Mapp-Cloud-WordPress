<script>
    import {configuration, entries, validated} from '../store/configuration';
    const cleanConfig = (config) => {
        const cleanedConfig = {
            General: {
                v: $configuration.General.v,
                trackWpUser: $configuration.General.trackWpUser
            }
        };
        let props;
        let value;
        $entries.forEach((entry) => {
            if ($configuration[entry]) {
                cleanedConfig[entry] = {};
                props = Object.keys($configuration[entry]);
                props.forEach((prop) => {
                    value = $configuration[entry][prop];
                    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'object' || (typeof value === 'string' && value.length > 0)) {
                        cleanedConfig[entry][prop] = value;
                    }
                });
            }
        });
        if(cleanedConfig.General.hasOwnProperty('acquire')) {
          cleanedConfig.General.acquire = cleanedConfig.General.acquire.replace('script', '');
        }
        return cleanedConfig;
    };
    const saveSettings = () => {
        configuration.set(cleanConfig($configuration));
        document.getElementById('mappConfig').value = JSON.stringify($configuration);
        document.getElementById('mapp_form').submit();
    }
</script>

<button disabled={$validated !== true} class="button-primary" on:click|preventDefault={saveSettings}>Save Changes</button>
{#if $validated !== true}
  <p>Please enter a valid value for: {$validated}</p>
{/if}

