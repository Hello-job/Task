import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import { defaultColumns, defaultDataSource } from './data';
import $http from '@/services/http';
import { createProjectApi, getProjectListApi } from '@/services/api';
import type { applicationType } from './types';

export const project = createModel<RootModel>()({
  state: {
    dataSource: defaultDataSource,
    columns: defaultColumns,
    projectInfo: {},
    projectList: []
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
    },
    setProjectInfo(state, payload) {
      return {
        ...state,
        projectInfo: payload
      };
    },
    setProjectList(state, payload) {
      return {
        ...state,
        projectList: payload
      };
    }
  },
  effects: dispatch => ({
    async getDataSource() {
      return [];
    },
    async createProject(params: any) {
      const res = await $http.post(createProjectApi, params);
    },
    async getProjectList(params: any) {
      const res: any = await $http.get(getProjectListApi, params);
      dispatch.project.setProjectList(res.result);
    }
  })
});
