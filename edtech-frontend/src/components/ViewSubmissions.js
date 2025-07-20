import React, { useState } from 'react';
import { API } from '../api';

function ViewSubmissions() {
  const [assignmentId, setAssignmentId] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    const res = await API.get(`/view-submissions/${assignmentId}`);
    setSubmissions(res.data);
  };

  return (
    <div>
      <h3>View Submissions</h3>
      <input
        type="text"
        placeholder="Assignment ID"
        value={assignmentId}
        onChange={e => setAssignmentId(e.target.value)}
      />
      <button onClick={fetchSubmissions}>Fetch</button>
      <ul>
        {submissions.map(sub => (
          <li key={sub.id}>Submission ID: {sub.id}, Student ID: {sub.student_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewSubmissions;
