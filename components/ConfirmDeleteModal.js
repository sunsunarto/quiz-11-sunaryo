import { Modal } from 'antd';

export default function ConfirmDeleteModal({ visible, student, onConfirm, onCancel }) {
  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okButtonProps={{ danger: true }}
    >
      Are you sure you want to delete <strong>{student?.name}</strong>?
    </Modal>
  );
}
