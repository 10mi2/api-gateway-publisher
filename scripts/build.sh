#!/bin/bash
echo "We are assuming you have installed the aws cli"

# Clean the existing dist directory to ensure we get the latest
rm -rf dist

# Install and bundle the UI in the dist directory
npm i
webpack

# This will parse the config doc and download the swagger json files to correct directory
# It is expected that you have properly configured access to your AWS environment
node scripts/fetch-api-gateway-swagger.js
