// components/StudentFormModal.js
import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';

export default function StudentFormModal({ visible, student, onSubmit, onCancel }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (student) form.setFieldsValue(student);
    else form.resetFields();
  }, [student, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (student) values.id = student.id;
      onSubmit(values);
    });
  };

  return (
    <Modal title={student ? 'Edit Student' : 'Add Student'} open={visible} onOk={handleOk} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
