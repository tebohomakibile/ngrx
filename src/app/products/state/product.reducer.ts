import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { Product } from '../product';
import * as AppState from 'src/app/state/app.state';
import * as ProductActions from './product.action';
import { Action } from 'rxjs/internal/scheduler/Action';

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
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: '',
};

const initialProduct: Product = {
  id: 0,
  productName: '',
  productCode: 'new',
  description: '',
  starRating: 0,
};

/*
  Create a feature selector. this means I am slicing only
  the products state from the global application state
*/
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);
export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const productReducer = createReducer<ProductState>(
  // Specify the initial store state
  // {showProductCode: true} as ProductState,
  initialState,
  //Define an action for the reducer to dispatch
  on(ProductActions.toggleProductCode, (state): ProductState => {
    console.log('Original State', JSON.stringify(state));

    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: initialProduct,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return{
      ...state,
      products:[],
      error: action.error
    }
  })
);
