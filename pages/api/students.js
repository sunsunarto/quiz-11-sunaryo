import { readStudents, writeStudents } from '../../lib/studentStore';

export default function handler(req, res) {
  let students = readStudents();

  switch (req.method) {
    case 'GET':
      return res.status(200).json(students);

    case 'POST':
      const newStudent = { ...req.body, id: Date.now().toString() };
      students.push(newStudent);
      writeStudents(students);
      return res.status(201).json(newStudent);

    case 'PUT':
      const updated = req.body;
      students = students.map((s) => (s.id === updated.id ? updated : s));
      writeStudents(students);
      return res.status(200).json(updated);

    case 'DELETE':
      const { id } = req.body;
      students = students.filter((s) => s.id !== id);
      writeStudents(students);
      return res.status(200).json({ success: true });

    default:
      return res.status(405).end();
  }
}
