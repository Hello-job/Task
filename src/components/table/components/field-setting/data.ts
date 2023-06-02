type FieldType = {
  key: string;
  name: string;
  icon: string;
};

type FieldsType = {
  [key: string]: FieldType;
};

const fields: FieldsType = {
  textarea: {
    key: 'textarea',
    name: '多行文本',
    icon: 'iconsingle_line_text'
  },
  select: {
    key: 'select',
    name: '单选',
    icon: 'iconsingle_choice'
  }
};

export { fields };
export type { FieldsType, FieldType };
