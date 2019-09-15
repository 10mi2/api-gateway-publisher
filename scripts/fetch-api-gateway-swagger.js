// This script fetches the api gateway ID swagger documents and compiles them into dist/swagger-config.json
// If the config has a row with an external url, then it will pass that config along as well.

const execSync = require('child_process').execSync;
const fs = require('fs')

// Relative path to the config module. Just importing it as JSON
const config = require('../config.json')
const distDir = 'dist'

// Create the directories in order to pass the swagger files to them
const servicePath = `${distDir}/services`
if (!fs.existsSync(servicePath)) {
  fs.mkdirSync(servicePath)
}

// This will get build into the dist directory as swagger-config.json
const swaggerConfig = {
  urls: []
}

config.forEach(row => {
  let urlLocation

  if (row.url === undefined) {
    urlLocation = `services/${row.name}.yaml`
    const cmd = `aws apigateway get-export --parameters extensions='integrations' --rest-api-id ${row.id} --stage-name ${row.stageName} --accepts application/yaml --export-type oas30 ${distDir}/${urlLocation}`
    execSync(cmd)
  } else {
    urlLocation = row.url
  }

  swaggerConfig.urls.push({
    url: urlLocation,
    name: row.name
  })
})

// Now write the output of the swagger config
fs.writeFileSync(`${distDir}/swagger-config.json`, JSON.stringify(swaggerConfig))
