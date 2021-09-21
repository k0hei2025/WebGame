import { createSlice, configureStore } from '@reduxjs/toolkit'


const initialState = {
               name: ''
}

const globalState = createSlice({
               name: "globalState",
               initialState: initialState,
               reducers: {
                              nameHandler(state, action) {

                                             state.name = action.payload.userName

                              }
               },
})


export const store = configureStore({
               reducer: globalState.reducer,

})

export const actionState = globalState.actions;