import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
  // Specify the initial store state
  {showProductCode: true},
  //Define an action for the reducer to dispatch
  on(createAction('[Product] Toggle Product Code'), state => {
    console.log('Original State', JSON.stringify(state));

    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  })
)
