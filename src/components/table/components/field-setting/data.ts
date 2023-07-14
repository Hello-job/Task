type FieldType = {
  type: string;
  title: string;
  icon: string;
};

type FieldsType = {
  [key: string]: FieldType;
};

const fields: FieldsType = {
  textarea: {
    type: 'textarea',
    title: '多行文本',
    icon: 'iconsingle_line_text'
  },
  select: {
    type: 'select',
    title: '单选',
    icon: 'iconsingle_choice'
  }
};

export { fields };
export type { FieldsType, FieldType };
