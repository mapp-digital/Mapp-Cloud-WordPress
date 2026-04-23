@Library('wt-jenkins-lib@sdk-pixel-docker') _

javascriptPipelinePixelPlugin {
    codeHost = 'github'
    appName = 'mapp_cloud_wordpress'
    artifacts = '**'
    sonarScript = 'bash sonar.sh'
    npmScripts = [
        install: ':',
        version: '',
        publish: ':'
    ]
    npmRegistries = []
}
