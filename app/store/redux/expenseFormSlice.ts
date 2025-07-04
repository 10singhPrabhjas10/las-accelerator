import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IExpenseFormState} from '../../screens/expenseManagement/ExpenseManagement.Interface';

interface ExpenseFormState {
  forms: Array<{form: IExpenseFormState; isDraft: boolean}>;
  isDraft: boolean;
}

const intitalState: ExpenseFormState = {
  forms: [],
  isDraft: false,
};

const expenseFormSlice = createSlice({
  name: 'expenseForm',
  initialState: intitalState,
  reducers: {
    setExpenseFormWithFlag(
      state,
      action: PayloadAction<{form: IExpenseFormState; isDraft: boolean}>,
    ) {
      state.forms.push(action.payload);
    },
    clearExpenseForm(state) {
      state.forms = [];
    },
    updateExpenseFormWithFlag(
      state,
      action: PayloadAction<{
        id: number;
        form: IExpenseFormState;
        isDraft: boolean;
      }>,
    ) {
      const idx = action.payload.id;
      if (state.forms[idx]) {
        state.forms[idx] = {
          form: action.payload.form,
          isDraft: action.payload.isDraft,
        };
      }
    },
  },
});

export const {
  setExpenseFormWithFlag,
  updateExpenseFormWithFlag,
  clearExpenseForm,
} = expenseFormSlice.actions;
export default expenseFormSlice.reducer;
