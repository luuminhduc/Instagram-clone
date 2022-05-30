import { hideLoading, showLoading } from "../loadingAction/actions";
import { showModal } from "../modalAction/actions";
import * as actions from "./actionTypes";
import { storage } from "../../../firebase/config";

const processFile = (file) => {
	return new Promise((resolve, reject) => {
		const date = new Date();
		const name = file.name + date.toISOString();
		const storageRef = storage.ref(name);
		storageRef.put(file, { contentType: "image/jpeg" }).on(
			"state_changed",
			() => {},
			(err) => {
				reject(err);
			},
			async () => {
				const src = await storageRef.getDownloadURL();
				resolve(src);
			}
		);
	});
};

export const addPost =
	(post, history) =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch(showLoading());
		const firestore = getFirestore();

		const fileList = [];

		const { text, time, uid, likes, files } = post;
		for (let f of files) {
			fileList.push(f);
		}

		Promise.all(fileList.map((file) => processFile(file)))
			.then((values) => {
				const newPost = { text, time, uid, likes, imageList: values };
				firestore
					.collection("posts")
					.add(newPost)
					.then(() => {
						history.push("/");
						dispatch(hideLoading());
					})
					.catch((err) => {
						dispatch(hideLoading());
						dispatch(
							showModal({ title: "Something went wrong", text: err.message })
						);
					});
			})
			.catch((err) => {
				dispatch(
					showModal({ title: "Something went wrong", text: err.message })
				);
			});
	};

export const fetchPostList =
	() =>
	(dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("posts")
			.orderBy("time", "desc")
			.onSnapshot((snap) => {
				const docs = [];
				snap.forEach((doc) => docs.push({ ...doc.data(), id: doc.id }));
				dispatch({
					type: actions.FETCH_POST_LIST,
					payload: docs,
				});
			});
	};

export const selectPost = (post) => {
	return {
		type: actions.SELECT_POST,
		payload: post,
	};
};
