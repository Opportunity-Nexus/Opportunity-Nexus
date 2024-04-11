import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	step: 1,
	opportunity: null,
	editOpportunity: false,
	editGlobalOpportunity: false,
};

const opportunitySlice = createSlice({
	name: "opportunity",
	initialState,
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload;
		},
		setOpportunity: (state, action) => {
			state.opportunity = action.payload;
		},
		setEditOpportunity: (state, action) => {
			state.editOpportunity = action.payload;
		},
		setEditGlobalOpportunity: (state, action) => {
			state.editGlobalOpportunity = action.payload;
		},
		resetOpportunityState: (state) => {
			state.step = 1;
			state.opportunity = null;
			state.editOpportunity = false;
			state.editGlobalOpportunity = false;
		},
	},
});

export const {
	setStep,
	setOpportunity,
	setEditOpportunity,
	setEditGlobalOpportunity,
	resetOpportunityState,
} = opportunitySlice.actions;

export default opportunitySlice.reducer;
