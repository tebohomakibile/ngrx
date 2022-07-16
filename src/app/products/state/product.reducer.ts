import { createAction, createReducer, on } from "@ngrx/store";

import { Product } from "../product";
import * as AppState from "src/app/state/app.state";

/*
  Because feature modules are lazy loaded, we extend
  the the global state so we do not break the boundaries
  of lazy loading. Thev we refer to global application state
*/
export interface State extends AppState.State {
  products: ProductState;
}
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const productReducer = createReducer<ProductState>(
  // Specify the initial store state
  {showProductCode: true} as ProductState,
  //Define an action for the reducer to dispatch
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    console.log('Original State', JSON.stringify(state));

    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  })
)
