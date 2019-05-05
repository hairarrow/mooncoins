import { combineReducers } from "redux";
import User from "./components/User/UserReducer";
import VolatileList from "./components/VolatileList/VolatileListReducer";

export default combineReducers({ User, VolatileList });
