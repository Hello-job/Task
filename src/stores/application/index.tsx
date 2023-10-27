import { createModel } from '@rematch/core';
import { RootModel } from '../models';

import type { ApplicationType } from '@/types';

export const application = createModel<RootModel>()({
  state: {
    dataSource: [],
    columns: [],
    projectInfo: {},
    projectList: []
  } as ApplicationType,
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
