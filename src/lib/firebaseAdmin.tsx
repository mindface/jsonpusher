import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth";

const { NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,NEXT_PUBLIC_FIREBASE_PRIVATE_KEY } = process.env;

if (!NEXT_PUBLIC_FIREBASE_PROJECT_ID || !NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL || !NEXT_PUBLIC_FIREBASE_PRIVATE_KEY) {
  throw new Error(
    `Missing Firebase environment variables: 
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}, 
    NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=${NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL}, 
    NEXT_PUBLIC_FIREBASE_PRIVATE_KEY=${NEXT_PUBLIC_FIREBASE_PRIVATE_KEY}`
  );
}

export const certSet = cert({
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  privateKey: NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") ?? "",
});
export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: certSet,
  });

export const adminAuth = getAuth();
