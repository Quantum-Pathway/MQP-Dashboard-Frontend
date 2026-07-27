import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL || "http://localhost:8082",
  realm: process.env.KEYCLOAK_REALM || "mqp-dashboard",
  clientId: process.env.KEYCLOAK_CLIENT_ID || "mqp-frontend",
});

let initializationPromise = null;

export function initializeKeycloak() {
  if (!initializationPromise) {
    initializationPromise = keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: false,
    });
  }
  return initializationPromise;
}

export default keycloak;