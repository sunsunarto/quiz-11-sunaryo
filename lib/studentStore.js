import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'students.json');

export function readStudents() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading students.json:', err);
    return [];
  }
}

export function writeStudents(students) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
  } catch (err) {
    console.error('Error writing students.json:', err);
  }
}
