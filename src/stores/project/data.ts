export const defaultColumns = [
  {
    name: 'title',
    title: '标题',
    index: 0,
    field: {
      type: 'textarea'
    },
    width: 200
  },
  {
    name: 'recordStatus',
    title: '记录状态',
    index: 1,
    field: {
      type: 'select',
      props: {
        options: [
          {
            id: 9,
            color: '#E1E2E4',
            name: '未开始'
          },
          {
            id: 8,
            color: '#377AFF',
            name: '进行中'
          },
          {
            id: 10,
            color: '#45CB7E',
            name: '已完成'
          }
        ]
      }
    },
    width: 200
  },
  {
    name: 'text',
    title: '多行文本',
    index: 2,
    field: {
      type: 'textarea'
    },
    width: 300
  }
];

export const defaultDataSource = [
  {
    id: 1,
    index: 0,
    title: '数字化转型',
    recordStatus: 9,
    text: '错误处理',
    text2: '成功处理990'
  },
  {
    id: 2,
    index: 1,
    title: '表格数据',
    recordStatus: 8,
    text: '错误处理',
    text2: '成功处理99'
  },
  {
    id: 3,
    index: 2,
    title: '看板数据',
    recordStatus: 10,
    text: '错误处理',
    text2: '成功处理'
  }
];
