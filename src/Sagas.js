import { all, fork } from "redux-saga/effects";
import User from "./components/User/UserSagas";

export default function* RootSaga() {
  yield all([fork(User)]);
}
