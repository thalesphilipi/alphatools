import { createSlice } from "@reduxjs/toolkit"
import { InfoTask, Task } from "@renderer/interfaces/AutoBidInterfaces";


interface InitialStateType {
    addedTasks: InfoTask[],
}

const initialState: InitialStateType = {
    addedTasks: []
}

export const slice = createSlice({
    name: 'autoBidCreation',
    initialState,
    reducers: {
        addTask(state, { payload }) {
            return { ...state, addedTasks: [payload, ...state.addedTasks] }
        },
        removeTask(state, { payload }) {
            const newAddedTasks = [...state.addedTasks];
            return {
                ...state, addedTasks: [...newAddedTasks.slice(0, payload), ...newAddedTasks.slice(payload + 1)]
            };
        },
        clearAddedTasks(state){
            return {...state, addedTasks: []};
        }
    }
})

export const { addTask, removeTask, clearAddedTasks } = slice.actions;

export const selectAutoBidCreation = state => state.autoBidCreation;

export default slice.reducer;