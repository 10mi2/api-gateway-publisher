
export interface ResourceProperties {
  DefinitionKey: string
  DefinitionBody?: string
  APIGatewayId?: string
  APIGatewayStage?: string
}

export function initializeSpec(api) {
  // Initialize Tags
  if (api.tags === undefined) {
    api.tags = []
  }
  
  // Initialize paths
  if (api.paths === undefined) {
    api.paths = {}
  }

  // Initialize components
  if (api.components === undefined) {
    api.components = {
      securitySchemes: {},
      schemas: {},
    }
  } else {
    if (api.components.schemas === undefined) {
      api.components.schemas = {}
    }
    if (api.components.schemas === undefined) {
      api.components.securitySchemes = {}
    }
  }
  return api
}

// function placeholder() {
//   // Build the Tag Hash of all of them first with the current spec so it gets overwritten
//   const tagsHash = {};
//   (api.tags || []).forEach(tag => {
//     tagsHash[tag.name] = tag
//   });
//   // Incoming overwrites if there is a duplicate
//   (incomingSpec.tags || []).forEach(tag => {
//     tagsHash[tag.name] = tag
//   })

//   // Build Tags
//   // Initialize tags and components so we only get what we are using
//   api.tags = []
//   const components = {
//     schemas: {},
//     securitySchemes: {}
//   }
//   Object.assign(components.schemas, api.components.schemas, incomingSpec.components.schemas)

//   // Now iterate the paths and append tags as we encounter them
//   Object.keys(api.paths).map((currentPath) => {
//     const pathObj = api.paths[currentPath];
//     // Append Tags
//     (pathObj.tags || []).forEach(tag => api.tags.push(tagsHash[tag]));
//   })

//   // Build the Models
//   Object.assign(api.components || {}, incomingSpec.components)
//   // Build the Security Specs
//   Object.assign(api.securitySchemes || {}, incomingSpec.secruitySchemes)
// }