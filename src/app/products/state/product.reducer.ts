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
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
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
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
    }
  }
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
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),

  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updateProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );

    return {
      ...state,
      products: updateProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),

  on(ProductActions.updateProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
