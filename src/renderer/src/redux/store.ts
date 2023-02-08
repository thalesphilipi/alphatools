import { configureStore, Store } from "@reduxjs/toolkit";
import autoBidCreationSlice from "./autoBid/autoBidCreationSlice";
import autoBidInstancesSlice, { updateTime } from "./autoBid/autoBidInstancesSlice";
import userSlice from "./userSlice";


export const store: Store = configureStore({
    reducer: {
        user: userSlice,
        autoBidInstances: autoBidInstancesSlice,
        autoBidCreation: autoBidCreationSlice
    }
})

setInterval(() => {
    store.dispatch(updateTime());
}, 1000);