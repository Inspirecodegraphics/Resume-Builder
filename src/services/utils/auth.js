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
}
export async function signUpWithEmailPassword(email, password) {
	return auth().createUserWithEmailAndPassword(email, password);
}
export async function resetPassword(email) {
	return auth().sendPasswordResetEmail(email);
}

export function getProvider(providerId) {
	switch (providerId) {
		case auth.TwitterAuthProvider.PROVIDER_ID:
			return new auth.TwitterAuthProvider();
		case auth.GoogleAuthProvider.PROVIDER_ID:
			return new auth.GoogleAuthProvider();
		case auth.FacebookAuthProvider.PROVIDER_ID:
			return new auth.FacebookAuthProvider();
		case auth.GithubAuthProvider.PROVIDER_ID:
			return new auth.GithubAuthProvider();
		default:
			throw new Error(`No provider implemented for ${providerId}`);
	}
}

export function oneTapSignIn() {
	window.google.accounts.id.initialize({
		client_id:
			"1058073675937-8jutvojbbef07qvdhgiqavrej4htglkc.apps.googleusercontent.com",
		callback: handleOneTapSignIn,
	});
	auth().onAuthStateChanged((user) => {
		if (!user) {
			window.google.accounts.id.prompt((notification) => {
				if (notification.isNotDisplayed()) {
					console.log(notification.getNotDisplayedReason());
				} else if (notification.isSkippedMoment()) {
					console.log(notification.getSkippedReason());
				} else if (notification.isDismissedMoment()) {
					console.log(notification.getDismissedReason());
				}
			});
		}
	});
}

const handleOneTapSignIn = (response) => {
	var credential = auth.GoogleAuthProvider.credential(response.credential);
	auth()
		.signInWithCredential(credential)
		.catch((error) => {
			console.log(error);
		})
		.then((data) => {
			// console.log(data);
		});
};

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
