
import React, { useState } from 'react';
import { API } from '../api';

function AssignmentForm({ teacherId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createAssignment = async () => {
    if (!title || !description || !teacherId) {
      alert('All fields are required.');
      return;
    }

    try {
      await API.post('/create-assignment', {
        title: title,
        description: description,
        teacher_id: Number(teacherId),
      });

      alert('Assignment created successfully.');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating assignment:', error.response?.data || error.message);
      alert('Failed to create assignment.');
    }
  };

  return (
    <div>
      <h3>Create Assignment</h3>
      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />
      <textarea
        placeholder="Assignment Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />
      <button onClick={createAssignment}>Create</button>
    </div>
  );
}

export default AssignmentForm;
