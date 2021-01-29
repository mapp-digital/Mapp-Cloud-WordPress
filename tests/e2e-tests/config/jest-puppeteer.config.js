module.exports = {
    launch: {
        browserContext: 'incognito',
        args: [
            '--no-sandbox',
            '--headless',
            '--disable-web-security',
            '--allow-insecure-localhost',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox'
        ]
    }
};
