#!/bin/bash
export STACK_NAME=${STACK_NAME:=ts-api}
export STACK_BUCKET=${STACK_BUCKET:=openapi-plumbing}
export OPEN_API_CONTENT=`cat specs/openapi.json`
