import { all, fork } from "redux-saga/effects";
import User from "./components/User/UserSagas";
import VolatileList from "./components/VolatileList/VolatileListSagas";

export default function* RootSaga() {
  yield all([fork(User), fork(VolatileList)]);
}
