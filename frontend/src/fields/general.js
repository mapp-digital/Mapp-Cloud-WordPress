export const General = {
    v: {
        inputValue: [
            {
                value: 5,
                label: {
                    en: 'Tag Integration',
                    de: 'Tag Integration'
                }
            },
            {
                value: 6,
                label: {
                    en: 'Google Tag Manager',
                    de: 'Google Tag Manager'
                }
            },
        ],
        help: {
            en: 'Please choose if you want to use Tag Integration or Google Tag Manager for your implementation.',
            de: 'Wählen Sie zwischen Tag Integration und Google Tag Manager.'
        },
        label: 'Mapp Intelligence Pixel Version',
    },
    tiId: {
        inputValue: '111111111111111',
        label: 'Tag Integration ID',
        help: {
            en: 'Enter your Tag Integration ID.',
            de: 'Geben Sie Ihre Tag Integration ID ein.'
        },
        condition: {
            _operator: 'and',
            v: 5
        },
        validation: '^\\d{15}$',
        errorMessage: {
            en: 'The tiId has to consist of 15 numbers.',
            de: 'Die tiId muss aus 15 Ziffern bestehen.'
        }
    },
    tiDomain: {
        inputValue: 'responder.wt-safetag.com',
        label: 'Tag Integration Domain',
        help: {
            en: 'If you use a custom Tag Integration Domain, please indicate it here, otherwise keep empty and "responder.wt-safetag.com" will be used.',
            de: 'Falls Sie eine Custom Responder Domain haben geben Sie die URL hier ein, anderseits lassen Sie "responder.wt-safetag.com".'
        },
        condition: {
            v: 5
        },
        validation: '^(?:[\\w-]+\\.)+([a-z]|[A-Z]|[0-9]){2,6}$',
        errorMessage: {
          en: 'Please enter a valid URL or keep empty',
          de: 'Bitte gültige URL eingeben oder leer lassen'
      }
    },
    gtmId: {
      inputValue: '',
      label: 'Google Tag Manager Container ID',
      help: {
        en: 'Enter your Google Tag Manager Container ID if you have not embedded the Google Tag Manager script already on your website.',
        de: 'GTM Container ID'
      },
      condition: {
        v: 6
      },
      validation: '(?:^$|^GTM-[A-Z0-9]{1,7}$)',
      errorMessage: {
        en: 'GTM Conatiner ID not valid - keep this field empty or enter \"GTM-XXXXXXX\" ID.',
        de: 'GTM ID'
      }
    },
    filterKeys: {
        type: 'textarea',
        inputValue: '',
        label: 'Exclude keys',
        help: {
            en: 'Please enter the keys you do not want to include in the datalayer here (comma separated). customFields are excluded by default.',
            de: 'Geben Sie an welche Keys nicht im _ti dataLayer auftauchen sollen'
        }
    },
    excludeWpUser: {
        inputValue: false,
        label: 'Exclude users',
        help: {
            en: 'Disable tracking for users logged into WordPress.',
            de: 'Tracking deaktivieren für Nutzer die in Wordpress eingeloggt sind',
        }
    },
  acquire: {
    type: 'textarea',
    inputValue: '',
    label: 'Mapp Acquire',
    help: {
      en: 'If you use Mapp Acquire alongside Mapp Intelligence, please add your Mapp Acquire tracking script here.',
      de: 'Wenn Sie Mapp Acquire nutzen, fügen Sie den Trackingcode hier ein.'
    },
    validation: '(?:^$|id=(\\d+?)&m=(\\d+?)\\D)',
    errorMessage: {
      en: 'Could not detect Mapp Acquire script input.',
      de: 'Konnte das Mapp Acquire Script nicht korrekt erkennen.'
    }
  },
    // mapp: {
    //     type: 'dropdown',
    //     inputValue: [
    //         {
    //             value: 'none',
    //             label: {
    //                 en: 'None',
    //                 de: 'Keins'
    //             }
    //         },
    //         {
    //             value: 'retail',
    //             label: {
    //                 en: 'Retail',
    //                 de: 'Retail'
    //             }
    //         },
    //     ],
    //     help: {
    //         en: 'Select Mapp package',
    //         de: 'Wählen Sie Ihr Mapp Paket'
    //     },
    //     label: 'Mapp Package'
    // },
};
