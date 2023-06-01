import { createRoot } from 'react-dom/client';
import { Button } from 'antd';
import Modal from './index';

interface Params {
  title: string;
  content: React.ReactNode | string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const configModal = ({
  content,
  cancelText,
  confirmText,
  onCancel,
  onConfirm
}: Params) => {
  const container = document.createElement('div');

  const root = createRoot(container);

  const close = () => {
    root.unmount();
    onCancel && onCancel();
  };

  const foolter = (
    <div className="flex justify-end items-center">
      <Button className="mr-5" onClick={close}>
        {cancelText ?? '取消'}
      </Button>
      <Button
        type="primary"
        className="bg-violet"
        onClick={() => {
          onConfirm();
          close();
        }}>
        {confirmText ?? '确认'}
      </Button>
    </div>
  );

  root.render(
    <Modal open={true} foolter={foolter} onCancel={close}>
      <div className="pt-5 mb-4">{content}</div>
    </Modal>
  );

  return { close };
};

export default configModal;
