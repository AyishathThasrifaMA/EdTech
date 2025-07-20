import React, { useEffect, useState } from 'react';
import { API } from '../api';

function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const res = await API.get('/assignments');
      setAssignments(res.data);
    };
    fetchAssignments();
  }, []);

  return (
    <div>
      <h3>Available Assignments</h3>
      <ul>
        {assignments.map(assign => (
          <li key={assign.id}>
            ID: {assign.id}, Title: {assign.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewAssignments;
