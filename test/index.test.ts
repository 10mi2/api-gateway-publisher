import { APIGatewayService } from '../src/services/apigateway.service';

import { readFileSync } from 'fs';


const spec: Object = JSON.parse(readFileSync('./test/assets/mockExport.json', { encoding: 'utf-8' }))

test('Ensure we got some json output', () => {
  expect(spec).toBeInstanceOf(Object)
  expect(spec).toBeTruthy()
})

test('Ensure we got some valid JSON output', () => {
  expect(spec).toHaveProperty('servers')
  expect (spec['servers']).toBeInstanceOf(Array)
})

test('expect the test to run', () => {
  const outputSpec = APIGatewayService.fixAwsNonsense(spec)
  expect(outputSpec.servers.length).toBe(1)
  expect(outputSpec.servers[0].variables.basePath.default).toBe('testing')
})