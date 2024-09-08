import jwt from 'jsonwebtoken';


export async function verifyKeycloakToken(token: string): Promise<jwt.JwtPayload | null> {
  const publicKey = process.env.KEYCLOAK_PUBLIC_KEY;
  if (!publicKey) {
    console.error('KEYCLOAK_PUBLIC_KEY is not set');
    return null;
  }
  try {
    const decoded = jwt.verify(token, publicKey) as jwt.JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}