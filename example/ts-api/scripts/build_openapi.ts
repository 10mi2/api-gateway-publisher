import * as YAML from 'yaml';
import { templateSettings, template } from 'lodash';

import { readFileSync, writeFileSync } from 'fs';

// Env variables we pass in to the current template
const ENV = process.env.ENV || 'dev'
const DOMAIN = ENV === 'prod' ? process.env.DOMAIN : `${ENV}.${process.env.DOMAIN}`
const API_VERSION = process.env.API_VERSION || '1'

// Load Template Spec
const specStr = readFileSync('./specs/openapi.yaml', { encoding: 'utf-8'})

// Init the template
const params = {
  Env: ENV,
  Domain: DOMAIN,
  ApiVersion: API_VERSION
}

templateSettings.interpolate = /\${([\s\S]+?)}/g;
const compiled = template(specStr)
const compiledSpecStr = compiled(params)
const compiledJSON = YAML.parse(compiledSpecStr)

// Now write the output as a json file
writeFileSync('./specs/openapi.json', JSON.stringify(compiledJSON))
