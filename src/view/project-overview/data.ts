const dataSource = [
  {
    id: 1,
    title: '数字化转型',
    recordStatus: 1,
    text: '错误处理'
  },
  {
    id: 2,
    title: '表格数据',
    recordStatus: 2,
    text: '错误处理'
  },
  {
    id: 3,
    title: '看板数据',
    recordStatus: 3,
    text: '错误处理'
  }
];

type rowItemType = {
  id: number;
  title: string;
  recordStatus: number;
  text: string;
  [key: string]: any;
};

export { dataSource };
export type { rowItemType };
