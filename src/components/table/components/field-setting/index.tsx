import { useRef, useState, useMemo, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { Icon } from '@/components';
import { fields } from './data';
import cls from 'classnames';
import { widgets } from './components';
import { EnumAll } from '@/shared';
import type { FieldType } from './data';
import type { ColumnType } from '@/types';
import type { operationColumnType } from '@/view/project-overview/interface';

const { CustomField } = EnumAll;
interface FieldSettingType {
  column?: ColumnType;
  columns: ColumnType[];
  onClose: () => void;
  handleColumnsAction: (params: operationColumnType) => void;
}

const settingFieldWidth = 336;
const offsetWidth = 10;
const FieldSetting: React.FC<FieldSettingType> = ({
  column,
  columns,
  onClose,
  handleColumnsAction
}: FieldSettingType) => {
  const [form] = Form.useForm();
  const settingFieldRef = useRef<HTMLDivElement>(null);
  const [showFields, setShowFields] = useState(false);
  const [settingOffset, setSettingOffset] = useState({ left: 300, top: 0 });
  const [currentField, setCurrentField] = useState<null | FieldType>(null);

  const visibleFields = useMemo(() => {
    return Object.values(fields);
  }, []);

  useEffect(() => {
    if (!column) {
      setCurrentField(visibleFields[0]);
      form.setFieldsValue({
        title: visibleFields[0].title
      });
    }
  }, []);

  const handleSettingFieldsoffset = () => {
    const bodyOffsetWidth = document.body.offsetWidth;

    const settingFieldDom = settingFieldRef.current;
    const offsetInfo = settingFieldDom?.getBoundingClientRect();

    if (!offsetInfo) return { left: 300, top: 0 };

    const settingFieldsLeft = offsetInfo?.x - settingFieldWidth - offsetWidth;
    const settingFieldsRight = offsetInfo?.x + settingFieldWidth + offsetWidth;

    const offset = {
      left:
        bodyOffsetWidth - offsetInfo?.right > settingFieldWidth
          ? settingFieldsRight
          : settingFieldsLeft,
      top: offsetInfo.top
    };
    setSettingOffset(offset);
  };

  useEffect(() => {
    window.addEventListener('resize', handleSettingFieldsoffset);
    return () => {
      window.removeEventListener('resize', handleSettingFieldsoffset);
    };
  }, []);

  useEffect(() => {
    const settingFieldDom = settingFieldRef.current;
    function handleMouseDown(e: MouseEvent) {
      if (!settingFieldDom?.contains(e.target as HTMLElement)) {
        onClose();
      }
    }
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    handleSettingFieldsoffset();
  }, [showFields]);

  const onFinish = (values: any) => {
    let params: any;
    switch (currentField?.type) {
      case CustomField.TEXTAREA:
        params = {
          name: `field_${+new Date()}`,
          title: values.title,
          field: {
            type: currentField?.type,
            ...values.props
          }
        };
        break;
      case CustomField.SINGLESELECT:
        params = {
          name: `field_${+new Date()}`,
          title: values.title,
          field: {
            type: currentField?.type,
            props: {
              ...values.props
            }
          }
        };
        break;
    }

    handleColumnsAction({
      type: 'add',
      column: params
    });
    onClose();
  };

  const FieldConfigCom = useMemo(() => {
    if (currentField) {
      const Widget = widgets[currentField?.type];
      return Widget;
    }
  }, [currentField]);

  const FieldConfigComProps = useMemo(() => {
    return {
      form
    };
  }, [form]);

  const handleAddField = (field: FieldType) => {
    setCurrentField(field);
    const currentFieldCount = columns.filter(
      item => item.field.type === field.type
    ).length;
    form.setFieldsValue({
      title: field.title + currentFieldCount
    });
    setShowFields(false);
  };

  const settingFields = (
    <div
      style={{ left: settingOffset.left, top: settingOffset.top }}
      className={`fixed shadow-base bg-white w-[${settingFieldWidth}px]`}>
      <div className="p-4 flex flex-col">
        <p className="text-left">基础字段</p>
        <div className="flex">
          {visibleFields.map((field: FieldType) => {
            return (
              <div
                key={field.icon}
                className={cls(
                  'w-20 h-20 mb-4 mr-4 text-textGray flex flex-col items-center justify-center rounded-4px border border-solid border-[#f1f3f9] rounded-[4px]',
                  {
                    'border-violet-500': field.type === currentField?.type,
                    'text-violet-500': field.type === currentField?.type
                  }
                )}
                onClick={() => handleAddField(field)}>
                <Icon type={field.icon} />
                <span>{field.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-[336px] p-5 rounded-[4px] shadow-base relative bg-white"
      ref={settingFieldRef}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <>{showFields && settingFields}</>
        <Form.Item label="列名" name="title" required>
          <Input placeholder="请输入列名" />
        </Form.Item>
        <Form.Item label="列类型">
          <div
            className="flex justify-between items-center px-1 py-2 rounded-[4px] bg-grayCustom"
            onClick={() => {
              setShowFields(!showFields);
            }}>
            <span>{currentField?.title}</span>
            <Icon type="iconxcx_open" rotate={showFields ? 180 : 0} />
          </div>
        </Form.Item>
        {FieldConfigCom && (
          <div className="border-0 border-t-[1px] border-solid border-textLight pt-2 ">
            <FieldConfigCom {...FieldConfigComProps} />
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}>
            取消
          </Button>
          <Button
            className="ml-2"
            type="primary"
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              form.submit();
            }}>
            确定
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FieldSetting;
