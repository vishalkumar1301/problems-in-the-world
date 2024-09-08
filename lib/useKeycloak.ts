import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
} as const;

export function useKeycloak() {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useKeycloak: Initializing Keycloak with config:', keycloakConfig);
    if (!keycloakConfig.url || !keycloakConfig.realm || !keycloakConfig.clientId) {
      console.error('useKeycloak: Missing Keycloak configuration');
      setError('Missing Keycloak configuration');
      setInitialized(true);
      return;
    }

    const keycloakInstance = new Keycloak(keycloakConfig);
    keycloakInstance.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
      .then((auth) => {
        console.log('useKeycloak: Keycloak initialized successfully');
        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
        setInitialized(true);
      })
      .catch((error) => {
        console.error('useKeycloak: Keycloak init error:', error);
        setError(error.message || 'Failed to initialize Keycloak');
        setInitialized(true);
      });
  }, []);

  return { keycloak, authenticated, initialized, error };
}