import firebase from "../../firebase";
import { eventChannel } from "redux-saga";
import { all, cancelled, fork, put, take } from "redux-saga/effects";
import { actions } from "./VolatileListReducer";

const listChannel = eventChannel(emit => {
  const unsubscribe = firebase
    .firestore()
    .collection("Lists")
    .orderBy("createdOn", "desc")
    .limit(1)
    .onSnapshot(async ({ docs }) => emit({ docs }));

  return unsubscribe;
});

function* watchList() {
  try {
    while (true) {
      const { docs: lists } = yield take(listChannel);
      yield put({ type: actions.updateLoading, isLoading: true });
      const { list: rawList } = yield lists[0].data();
      const list = yield Promise.all(
        rawList.map(async it => {
          const coin = await it.get();
          return await { id: it.id, ...coin.data() };
        })
      );
      yield all([
        put({ type: actions.updateLoading, isLoading: false }),
        put({ type: actions.updateList, list })
      ]);
    }
  } finally {
    if (yield cancelled()) listChannel.close();
  }
}

export default function* VolatileListSagas() {
  yield all([fork(watchList)]);
}
