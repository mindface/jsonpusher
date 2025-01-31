import { cert } from "firebase-admin/app";
import { initFirestore } from "@auth/firebase-adapter";

const {
	NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
	NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
} = process.env;

export const firestore = initFirestore({
	credential: cert({
		projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
		privateKey: NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
	}),
});
