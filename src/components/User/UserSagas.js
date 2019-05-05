import firebase from "../../firebase";
import { eventChannel } from "redux-saga";
import {
  all,
  cancelled,
  call,
  fork,
  put,
  take,
  takeEvery,
  select
} from "redux-saga/effects";
import { actions } from "./UserReducer";

const User = ({ User }) => User;

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
      yield put({ type: actions.anonymousLogin, isAnonymous });
      if (userId) yield put({ type: actions.setId, userId });
    }
  } finally {
    if (yield cancelled()) authEventsChannel.close();
  }
}

function* handleLogOut() {
  yield firebase.auth().signOut();
}

function* watchLogOut() {
  yield takeEvery(actions.logOut, handleLogOut);
}

const userNotificationsSettingChannel = userId =>
  eventChannel(emit => {
    const unsubscribe = firebase
      .firestore()
      .collection("Users")
      .doc(userId)
      .onSnapshot(async doc => {
        const { receiveNotifications } = await doc.data();
        emit({ receiveNotifications });
      });

    return unsubscribe;
  });

function* handleNotificationsSetting() {
  const { userId, isAnonymous } = yield select(User);
  if (isAnonymous) return;
  const channel = yield call(userNotificationsSettingChannel, userId);
  try {
    while (true) {
      const { receiveNotifications } = yield take(channel);
      yield put({ type: actions.updateNotifications, receiveNotifications });
    }
  } finally {
    if (yield cancelled()) channel.close();
  }
}

function* watchNotificationSetting() {
  yield takeEvery(actions.setId, handleNotificationsSetting);
}

export default function* UserSagas() {
  yield all([
    fork(watchAuth),
    fork(watchLogOut),
    fork(watchNotificationSetting)
  ]);
}
