import { init } from '@rematch/core';
import type { RematchDispatch, RematchRootState } from '@rematch/core';
import type { RootModel } from './models';
import { models } from './models';

const store = init({ models });
type Store = typeof store;
type Dispatch = RematchDispatch<RootModel>;
type RootState = RematchRootState<RootModel>;

export type { Store, Dispatch, RootState };
export default store;
