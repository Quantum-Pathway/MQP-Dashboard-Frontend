import keycloak, { initializeKeycloak } from "./keycloak";

function getApplicationUrl(path = "/") {
  const safePath =
    typeof path === "string" &&
      path.startsWith("/") &&
      !path.startsWith("//")
      ? path
      : "/";
  return new URL(safePath, window.location.origin).toString();
}


async function initialize() {
  const authenticated = await initializeKeycloak();
  
  return {
    authenticated,
    user: authenticated
      ? {
          id: keycloak.tokenParsed?.sub || null,
          username: keycloak.tokenParsed?.preferred_username || null,
          email: keycloak.tokenParsed?.email || null,
          fullName: keycloak.tokenParsed?.name || null,
        }
      : null,
    realmRoles: keycloak.tokenParsed?.realm_access?.roles ?? [],
    clientRoles: keycloak.tokenParsed?.resource_access?.[keycloak.clientId]?.roles ?? [],
    tokenExpiresAt: keycloak.tokenParsed?.exp
      ? keycloak.tokenParsed.exp * 1000
      : null,
  };
}

function login(redirectPath = "/") {
  return keycloak.login({
    redirectUri: getApplicationUrl(redirectPath),
  });
}

function logout(reason = "manual") {
  sessionStorage.setItem("logoutReason", reason);
  return keycloak.logout({
    redirectUri: getApplicationUrl("/welcome"),
  });
}

function getAccessToken() {
  return keycloak.token ?? null;
}

// function isAuthenticated() {
//   return Boolean(
//     keycloak.authenticated && keycloak.token
//   );
// }

const authService = {
  initialize,
  login,
  logout,
  getAccessToken,
  //isAuthenticated,
};

export default authService;
