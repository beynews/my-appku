import React, { useState, useEffect } from 'react';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        class: ''
    });
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students'));
        if (storedStudents) {
            setStudents(storedStudents);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        const newStudent = { ...formData, id: Date.now() };
        setStudents([...students, newStudent]);
        setFormData({
            name: '',
            age: '',
            gender: '',
            class: ''
        });
    };

    const handleDeleteStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const handleEditStudent = (id) => {
        const studentToEdit = students.find(student => student.id === id);
        setEditingStudent(studentToEdit);
        setFormData(studentToEdit);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        const updatedStudents = students.map(student => {
            if (student.id === editingStudent.id) {
                return { ...formData, id: editingStudent.id };
            }
            return student;
        });
        setStudents(updatedStudents);
        setEditingStudent(null);
        setFormData({
            name: '',
            age: '',
            gender: '',
            class: ''
        });
    };

    return (
        <div className="container">
            <h1>Student List</h1>
            <form onSubmit={editingStudent ? handleSaveChanges : handleAddStudent} className="form-container">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" className="form-control" id="age" name="age" onChange={handleInputChange} value={formData.age} />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select className="form-control" id="gender" name="gender" onChange={handleInputChange} value={formData.gender}>
                        <option value="">-- Select Gender --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class:</label>
                    <select className="form-control" id="class" name="class" onChange={handleInputChange} value={formData.class}>
                        <option value="">-- Select Class --</option>
                        <option value="programmer">Programmer</option>
                        <option value="desain">Design</option>
                        <option value="multimedia">Multimedia</option>
                        <option value="manajemen">management</option>
                        <option value="lainnya">Other</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">{editingStudent ? 'Save Changes' : 'Add Student'}</button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.class}</td>
                            <td>
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditStudent(student.id)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

export default Student;
