import { useKeycloak } from '@/lib/useKeycloak';
import { useRouter } from 'next/navigation';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { keycloak, authenticated } = useKeycloak();
    const router = useRouter();

    if (!keycloak) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
      keycloak.login();
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}