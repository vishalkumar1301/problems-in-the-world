import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

export function useKeycloak() {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const keycloakInstance = new Keycloak('/keycloak.json');
    console.log('useKeycloak: Keycloak instance created', keycloakInstance);
    keycloakInstance.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false,
      enableLogging: true // Enable Keycloak logging
    })
      .then((auth) => {
        console.log('useKeycloak: Keycloak initialized successfully', auth);
        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
        setInitialized(true);
      })
      .catch((error) => {
        console.error('useKeycloak: Keycloak init error:', error);
        console.error('useKeycloak: Keycloak config:', keycloakInstance.authServerUrl, keycloakInstance.realm, keycloakInstance.clientId);
        setError(`Failed to initialize Keycloak: ${error.message || 'Unknown error'}`);
        setInitialized(true);
      });
  }, []);

  return { keycloak, authenticated, initialized, error };
}