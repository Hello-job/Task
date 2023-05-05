const baseColumn = {
  name: 'title',
  label: '标题',
  field: {
    type: 'textarea'
  },
  width: 200
};

type ColumnType = typeof baseColumn;

export type { ColumnType };
