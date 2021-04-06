import { auth, firestore } from "../firebase";

export function signInWithGoogle() {
	const provider = new auth.GoogleAuthProvider();
	return auth().signInWithPopup(provider);
}
export function signInWithFacebook() {
	const provider = new auth.FacebookAuthProvider();
	return auth().signInWithPopup(provider);
}
export function signInWithTwitter() {
	const provider = new auth.TwitterAuthProvider();
	return auth().signInWithPopup(provider);
}
export async function signInWithEmailPassword(email, password) {
	return auth().signInWithEmailAndPassword(email, password);
	// Enter your username or email to reset your password.
	// You will receive an email with instructions on how to reset your password. If you are experiencing problems resetting your password contact us or send us an email
}
export async function signUpWithEmailPassword(email, password) {
	return auth().createUserWithEmailAndPassword(email, password);
}
export async function resetPassword(email) {
	return auth().sendPasswordResetEmail(email);
}

export function signInWithGitHub() {
	const provider = new auth.GithubAuthProvider();
	return auth().signInWithPopup(provider);
}

export function logout() {
	return auth().signOut();
}

export const generateUserDocument = async (user, additionalData) => {
	if (!user) return;

	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { email, displayName, photoURL } = user;
		try {
			await userRef.set({
				displayName,
				email,
				photoURL,
				...additionalData,
			});
		} catch (error) {
			console.error("Error creating user document", error);
		}
	}
	return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
	if (!uid) return null;
	try {
		const userDocument = await firestore.doc(`users/${uid}`).get();

		return {
			uid,
			...userDocument.data(),
		};
	} catch (error) {
		console.error("Error fetching user", error);
	}
};
