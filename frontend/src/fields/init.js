export const Init = {
    trackId: {
        inputValue: '111111111111111',
        help: {
            en: 'Enter your track ID',
            de: 'Geben Sie Ihre Track ID ein'
        }
    },
    trackDomain: {
        inputValue: '',
        label: 'Trackdomain',
        help: {
            en: 'Enter your track domain',
            de: 'Geben Sie Ihre eigene Trackdomain ein'
        }
    },
    cookie: {
        inputValue: [
            {
                value: '1',
                label: {
                    en: 'Clientside',
                    de: 'Clientseitig'
                }
            },
            {
                value: '3',
                label: {
                    en: 'Serverside',
                    de: 'Serverseitig'
                }
            },
        ],
        help: {
            en: 'Select if cookies shall be set by the client via JS or via trackserver',
            de: 'Cookies per JS im Client oder mit dem Trackserver setzen'
        }
    },
    domain: {
        inputValue: 'document.location.hostname',
        label: 'domain',
        help: {
            en: 'Domains to be excluded as referrer, e.g. your own and payment providers',
            de: 'Domains deren Referrer ausgeschlossen werden sollen, also Ihre eigene sowie z.B. Payment Provider'
        }
    },
    selection: {
        label: {en: 'mapping example', de: 'Mapping Beispiel'},
        multiValue: true
    }
}
