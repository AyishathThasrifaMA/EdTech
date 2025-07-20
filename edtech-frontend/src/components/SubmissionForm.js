import React, { useState } from 'react';
import { API } from '../api';

function SubmissionForm({ studentId }) {
  const [assignmentId, setAssignmentId] = useState('');
  const [content, setContent] = useState('');

  const submitAssignment = async () => {
    if (!assignmentId || !content || !studentId) {
      alert('All fields are required.');
      return;
    }

    try {
      await API.post('/submit-assignment', {
        assignment_id: Number(assignmentId),
        student_id: Number(studentId),
        content: content,
      });

      alert('Assignment submitted successfully.');
      setAssignmentId('');
      setContent('');
    } catch (error) {
      console.error('Error submitting assignment:', error.response?.data || error.message);
      alert('Failed to submit assignment.');
    }
  };

  return (
    <div>
      <h3>Submit Assignment</h3>
      <input
        type="text"
        placeholder="Assignment ID"
        value={assignmentId}
        onChange={(e) => setAssignmentId(e.target.value)}
      /><br /><br />
      <textarea
        placeholder="Your submission..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br /><br />
      <button onClick={submitAssignment}>Submit</button>
    </div>
  );
}

export default SubmissionForm;
