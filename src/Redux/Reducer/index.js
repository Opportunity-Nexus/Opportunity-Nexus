import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import profileReducer from "../Slices/ProfileSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
});
export default rootReducer;
