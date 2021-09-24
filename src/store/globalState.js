import { createSlice, configureStore } from '@reduxjs/toolkit'


const initialState = {
               name: '',
               imageRSave: [],
               randomDynamisedArray: [],
               score: 0
}

const globalState = createSlice({
               name: "globalState",
               initialState: initialState,
               reducers: {

                              scoreCounter(state, action) {
                                             state.score = action.payload.counter
                              },


                              cardManupulate(state, action) {
                                             let array = [];

                                             console.log('store', action.payload.imgArray)

                                             for (let i = 0; i < action.payload.imgArray.length; i++) {

                                                            array.push(i)
                                             }

                                             let currentIndex = array.length, randomIndex;

                                             while (currentIndex !== 0) {


                                                            randomIndex = Math.floor(Math.random() * currentIndex);

                                                            currentIndex--;

                                                            [array[currentIndex], array[randomIndex]] = [
                                                                           array[randomIndex], array[currentIndex]];

                                             }

                                             console.log(array);

                                             state.imageRSave = array
                                             console.log("IMAGERSAVE store", state.imageRSave)

                                             let randomArray = [];
                                             for (let i in action.payload.imgArray) {

                                                            i = state.imageRSave[i]

                                                            console.log(`img`, action.payload.imgArray[i])
                                                            randomArray.push({
                                                                           img: action.payload.imgArray[i]
                                                            })
                                             }
                                             state.randomDynamisedArray = randomArray;
                                             console.log(`store2`, state.randomDynamisedArray)


                              },
                              nameHandler(state, action) {

                                             state.name = action.payload.userName

                              }
               },
})


export const store = configureStore({
               reducer: globalState.reducer,

})

export const actionState = globalState.actions;