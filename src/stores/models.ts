import { Models } from '@rematch/core';
import { userInfo } from './userInfo';
import { uploadFile } from './upload';
import { soketService } from './websoket';
import { application } from './application';
import { project } from './project';
export interface RootModel extends Models<RootModel> {
  userInfo: typeof userInfo;
  uploadFile: typeof uploadFile;
  soketService: typeof soketService;
  application: typeof application;
  project: typeof project;
}
export const models: RootModel = {
  userInfo,
  uploadFile,
  soketService,
  application,
  project
};
