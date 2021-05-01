import { firestore as db } from "../firebase";
import { auth } from "./../firebase";

export const getResumes = async () => {
	const user = auth().currentUser;
	try {
		let resume = {};
		db.doc(`users/${user.uid}/resumes/${"1"}`).onSnapshot((doc) => {
			console.log("Current data: ", doc.data());
			resume = doc.data();
			return doc.data();
		});
		return resume;
	} catch (error) {
		console.error("Error fetching Document", error);
	}
};
export const getTechnologies = async () => {
	console.log("Get Tech");
	return new Promise((resolve) => {
		var docRef = db.collection("admin").doc("technologies");
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					// console.log("Document data:", doc.data());
					resolve(doc.data());
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});
};
export const writeTechnologies = async (data) => {
	const user = auth().currentUser;
	try {
		const resumeCollection = await db.doc(`/admin/technologies`).set(data);
		return resumeCollection;
	} catch (error) {
		console.error("Error fetching Document", error);
	}
};

export const writeResume = async (data, uid, resumeId) => {
	const ref = `/users/${uid}/resumes/${resumeId}`;
	try {
		const resumeCollection = await db.doc(ref).update(data);
		return resumeCollection;
	} catch (error) {
		console.error("Error fetching Document", error);
	}
};
