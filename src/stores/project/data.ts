export const defaultColumns = [
  {
    name: 'title',
    label: '标题',
    index: 0,
    field: {
      type: 'textarea'
    },
    width: 200
  },
  {
    name: 'recordStatus',
    label: '记录状态',
    index: 1,
    field: {
      type: 'select',
      props: {
        options: [
          {
            id: 9,
            value: 1,
            color: '#E1E2E4',
            name: '未开始'
          },
          {
            id: 8,
            value: 2,
            color: '#377AFF',
            name: '进行中'
          },
          {
            id: 10,
            value: 3,
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
    label: '多行文本',
    index: 2,
    field: {
      type: 'textarea'
    },
    width: 300
  },
  {
    name: 'text2',
    label: '多行文本',
    index: 3,
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
    recordStatus: 1,
    text: '错误处理',
    text2: '成功处理990'
  },
  {
    id: 2,
    index: 1,
    title: '表格数据',
    recordStatus: 2,
    text: '错误处理',
    text2: '成功处理99'
  },
  {
    id: 3,
    index: 2,
    title: '看板数据',
    recordStatus: 3,
    text: '错误处理',
    text2: '成功处理'
  }
];
