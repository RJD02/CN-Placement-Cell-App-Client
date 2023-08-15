import { createSlice , PayloadAction} from "@reduxjs/toolkit";

interface InitialState {
    value: number,
}

const updateCounterActions: string = 'Counter';

const initialState: InitialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: updateCounterActions,
    initialState,
    reducers: {
        increment: (state) => {
            // Redux toolkit allows us to write "mutating" logic in reducers.
            // It doesn't actually mutate the state because it uses the
            // Immer library, which detects changes to a "draft state" and
            // produces a brand new immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        setCounter: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
})

export const {increment, decrement, incrementByAmount, setCounter} = counterSlice.actions;

export default counterSlice.reducer;
