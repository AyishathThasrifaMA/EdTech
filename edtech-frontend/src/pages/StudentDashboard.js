import React from 'react';
import SubmissionForm from '../components/SubmissionForm';
import ViewAssignments from '../components/ViewAssignments';

function StudentDashboard({ user }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Student Dashboard</h1>
      <ViewAssignments />
      <SubmissionForm studentId={user.user_id} />
    </div>
  );
}

export default StudentDashboard;
