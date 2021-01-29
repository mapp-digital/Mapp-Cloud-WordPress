import { writable, derived } from 'svelte/store';
import Fields from '../fields/allFields';
export const activePage = writable('General');
let config = document.getElementById('mappConfig').value;
const defaults = {
  General: {
    v: 5,
    excludeWpUser: false,
    tiId: '111111111111111',
    tiDomain: 'responder.wt-safetag.com',
    filterKeys: 'customFields'
  }
};

if (config === '{"General":{"v":5}}') {
    config = defaults;
}
else {
  try {
    config = JSON.parse(config);
  }
  catch(e) {
    config = defaults;
  }
}

export const configuration = writable(config);

export const entries = derived(
    configuration,
    ($configuration)=> $configuration.General.v === 5 ? ['General'] : Object.keys(Fields)
);

// TODO validation for all and not just General
// TODO bake in condition
export const validated = derived(
  configuration,
  ($configuration) => {
    const generalConfig = $configuration.General;
    const generalFields = Fields.General
    const generalConfigKeys = Object.keys(generalFields);
    for(let i = 0; i < generalConfigKeys.length; i++) {
      const currentConfigValue = generalConfig[generalConfigKeys[i]];
      if(generalFields[generalConfigKeys[i]].validation && currentConfigValue) {
        const r = new RegExp(generalFields[generalConfigKeys[i]].validation);
        if(!r.test(currentConfigValue)) {
          return generalFields[generalConfigKeys[i]].label;
        }
      }
    }
    return true;
  }
)
