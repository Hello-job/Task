import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import { defaultColumns, defaultDataSource } from './data';

import type { applicationType } from './types';

export const project = createModel<RootModel>()({
  state: {
    dataSource: defaultDataSource,
    columns: defaultColumns
  } as applicationType,
  reducers: {
    setDataSource(state, payload) {
      return {
        ...state,
        dataSource: payload
      };
    },
    setColumns(state, payload) {
      return {
        ...state,
        dataSource: payload
      };
    }
  },
  effects: dispatch => ({
    async getDataSource() {
      return [];
    }
  })
});
