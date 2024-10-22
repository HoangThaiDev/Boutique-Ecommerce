import env from "./enviroment";

let apiRootServer = "";

if (env.BUILD_MODE === "dev") {
  apiRootServer = env.URL_SERVER_DEV;
}
if (env.BUILD_MODE === "production") {
  apiRootServer = env.URL_SERVER_PRODUCTION;
}

export const API_ROOT = apiRootServer;
