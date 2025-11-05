// components/StudentTable.js
import { Table, Input, Space, Button } from 'antd';

export default function StudentTable({ students, onEdit, onDelete, onSearch }) {
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Actions',
      render: (_, student) => (
        <Space>
          <Button onClick={() => onEdit(student)}>Edit</Button>
          <Button danger onClick={() => onDelete(student)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search by name"
        onChange={(e) => onSearch(e.target.value)}
        style={{ marginBottom: 16 }}
        allowClear
      />
      <Table rowKey="id" columns={columns} dataSource={students} />
    </>
  );
}
