import React from 'react';
import AssignmentForm from '../components/AssignmentForm';
import ViewSubmissions from '../components/ViewSubmissions';

function TeacherDashboard({ user }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Teacher Dashboard</h1>
      <AssignmentForm teacherId={user.user_id} />
      <ViewSubmissions />
    </div>
  );
}

export default TeacherDashboard;
