import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import profileReducer from "../Slices/ProfileSlice";
import opportunityReducer from "../Slices/OpportunitySlice";

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	opportunity: opportunityReducer,
});
export default rootReducer;
