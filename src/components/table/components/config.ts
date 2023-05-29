import { TextCell, SingleSelectCell } from './custom-field';
import { EnumAll } from '@/shared';

const { CustomField } = EnumAll;
const formWidget = {
  [CustomField.TEXTAREA]: TextCell,
  [CustomField.SINGLESELECT]: SingleSelectCell
};

export { formWidget };
