import { createModel } from '@rematch/core';
import { RootModel } from '../models';

import type { applicationType } from './types';

export const application = createModel<RootModel>()({
  state: {
    dataSource: [],
    columns: []
  } as applicationType,
  reducers: {
    setDataSource(state, payload) {
      return {
        ...state,
        dataSource: payload
      };
    }
  },
  effects: () => ({
    async getDataSource() {
      return [];
    }
  })
});
