import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.KEYCLOAK_URL as string,
  realm: process.env.KEYCLOAK_REALM as string,
  clientId: process.env.KEYCLOAK_CLIENT_ID as string,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;