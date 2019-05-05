import firebase from "../../firebase";
import { eventChannel } from "redux-saga";
import { all, cancelled, fork, put, take } from "redux-saga/effects";
import { actions } from "./UserReducer";

const authEventsChannel = eventChannel(emit => {
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (!user) return firebase.auth().signInAnonymously();
    const { uid: userId, isAnonymous } = user;
    emit({ userId, isAnonymous });
  });

  return unsubscribe;
});

function* watchAuth() {
  try {
    while (true) {
      const { userId, isAnonymous } = yield take(authEventsChannel);
      if (isAnonymous) yield put({ type: actions.anonymousLogin, isAnonymous });
      if (userId) yield put({ type: actions.setId, userId });
    }
  } finally {
    if (yield cancelled()) authEventsChannel.close();
  }
}

export default function* UserSagas() {
  yield all([fork(watchAuth)]);
}
