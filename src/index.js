var SwaggerUIBundle = require('swagger-ui-dist/swagger-ui-bundle')
var StandalonePreset = require('swagger-ui-dist/swagger-ui-standalone-preset')
require('swagger-ui-dist/swagger-ui.css')
require('./index.html')

window.onload = (ev) => {
  const ui = SwaggerUIBundle({
    configUrl: 'swagger-config.json',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      StandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  window.ui = ui
}
