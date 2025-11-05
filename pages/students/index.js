import { useEffect, useState } from 'react';
import { Button, message, Spin } from 'antd';
import StudentTable from '../../components/StudentTable';
import StudentFormModal from '../../components/StudentFormModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import { apiRequest } from '../../utils/apiClient';
import { showSuccess, showError } from '../../utils/messages';

export default function StudentQuizPage() {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/api/students');
      console.log('Fetched students:', data);
      setStudents(data);
      setFiltered(data);
    } catch (err) {
      console.error('Fetch error:', err);
      showError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    setSelected(null);
    setFormVisible(true);
  };

  const handleEdit = (student) => {
    setSelected(student);
    setFormVisible(true);
  };

  const handleDelete = (student) => {
    setSelected(student);
    setDeleteVisible(true);
  };

  const handleSubmit = async (student) => {
    try {
      const method = selected ? 'PUT' : 'POST';
      await apiRequest('/api/students', method, student);
      showSuccess(`Student ${selected ? 'updated' : 'added'} successfully`);
      setFormVisible(false);
      fetchStudents();
    } catch (err) {
      console.error('Submit error:', err);
      showError('Failed to save student');
    }
  };

  const confirmDelete = async () => {
    try {
      await apiRequest('/api/students', 'DELETE', { id: selected.id });
      showSuccess('Student deleted successfully');
      setDeleteVisible(false);
      fetchStudents();
    } catch (err) {
      console.error('Delete error:', err);
      showError('Failed to delete student');
    }
  };

  const handleSearch = (keyword) => {
    const filteredList = students.filter((s) =>
      s.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(filteredList);
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Student
      </Button>

      {loading ? (
        <Spin tip="Loading students..." />
      ) : (
        <StudentTable
          students={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={handleSearch}
        />
      )}

      <StudentFormModal
        visible={formVisible}
        student={selected}
        onSubmit={handleSubmit}
        onCancel={() => setFormVisible(false)}
      />

      <ConfirmDeleteModal
        visible={deleteVisible}
        student={selected}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteVisible(false)}
      />
    </>
  );
}
