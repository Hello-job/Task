type Field = {
  key: string;
  name: string;
  icon: string;
};

type Fields = {
  [key: string]: Field;
};

const fields: Fields = {
  textarea: {
    key: 'textarea',
    name: '多行文本',
    icon: 'iconsingle_line_text'
  },
  select: {
    key: 'textarea',
    name: '单选',
    icon: 'iconsingle_choice'
  }
};

export { fields };
export type { Fields, Field };
