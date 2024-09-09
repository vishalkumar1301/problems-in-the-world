'use client';

import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@/lib/useKeycloak';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { keycloak, authenticated, initialized, error } = useKeycloak();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: initialized:', initialized);
    console.log('AuthProvider: authenticated:', authenticated);
    console.log('AuthProvider: keycloak:', keycloak);
    console.log('AuthProvider: error:', error);
    if (initialized) {
      setIsLoading(false);
    }

    // Check Keycloak server availability
    if (keycloak?.authServerUrl) {
      fetch(keycloak.authServerUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log('Keycloak server is accessible');
        })
        .catch(e => {
          console.error('Keycloak server is not accessible:', e);
        });
    }

  }, [initialized, authenticated, keycloak, error]);

  if (isLoading) {
    return <div>Initializing Keycloak...</div>;
  }

  if (error) {
    console.error('AuthProvider: Keycloak initialization error:', error);
    return <div>Error initializing Keycloak: {error}</div>;
  }

  if (!keycloak) {
    console.warn('AuthProvider: Keycloak not initialized');
    return <div>Keycloak not initialized. Please check your configuration.</div>;
  }

  if (!authenticated) {
    console.log('AuthProvider: Not authenticated, redirecting to login...');
    keycloak.login();
    return null;
  }

  return <>{children}</>;
}