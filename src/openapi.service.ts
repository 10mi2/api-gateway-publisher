

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