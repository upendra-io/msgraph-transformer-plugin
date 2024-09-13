'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var alpha = require('@backstage/plugin-catalog-backend-module-msgraph/alpha');

const MICROSOFT_GRAPH_USER_ID_ANNOTATION = "graph.microsoft.com/user-id";
async function myUserTransformer(user, userPhoto) {
  if (!user.id || !user.displayName || !user.userPrincipalName) {
    return void 0;
  }
  const name = normalizeUserPrincipalName(user.userPrincipalName);
  const entity = {
    apiVersion: "backstage.io/v1alpha1",
    kind: "User",
    metadata: {
      name,
      annotations: {
        [MICROSOFT_GRAPH_USER_ID_ANNOTATION]: user.id
      }
    },
    spec: {
      profile: {
        displayName: user.displayName
      },
      memberOf: []
    }
  };
  if (user.mail) entity.spec.profile.email = user.mail;
  if (userPhoto) entity.spec.profile.picture = userPhoto;
  return entity;
}
function normalizeUserPrincipalName(name) {
  return name.trim().replace("@ford.com", "").toLocaleUpperCase();
}
const catalogModuleMsGraphTransformer = backendPluginApi.createBackendModule({
  pluginId: "catalog",
  moduleId: "ms-graph-transformer",
  register(env) {
    env.registerInit({
      deps: {
        microsoftGraphTransformers: alpha.microsoftGraphOrgEntityProviderTransformExtensionPoint
      },
      async init({ microsoftGraphTransformers }) {
        microsoftGraphTransformers.setUserTransformer(myUserTransformer);
      }
    });
  }
});

exports.catalogModuleMsGraphTransformer = catalogModuleMsGraphTransformer;
//# sourceMappingURL=module-BSgVl7wC.cjs.js.map
