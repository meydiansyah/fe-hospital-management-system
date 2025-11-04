import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeedbackState {
  fullName: string;
  phoneNumber: string;
  email: string;
  visitDate: string;
  hospital: string;
  patientType: string;
  serviceType: string;
  message: string;
}

const initialState: FeedbackState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  visitDate: "",
  hospital: "",
  patientType: "",
  serviceType: "",
  message: "",
};

interface UpdateFieldPayload {
  field: keyof FeedbackState;
  value: string;
}

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = feedbackSlice.actions;
export default feedbackSlice.reducer;
