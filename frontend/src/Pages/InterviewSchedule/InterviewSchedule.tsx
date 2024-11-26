import React from 'react';

const InterviewSchedule = () => {
    const handleAddAppointmentClick = () => {
      // 打开 Google Calendar 添加事件的链接
      window.open('https://calendar.google.com', '_blank');
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Interview Schedule</h1>
        <button 
          onClick={handleAddAppointmentClick} 
          style={{
            backgroundColor: '#f44336', // Google Calendar 的红色
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Add Interview Appointment
        </button>
      </div>
    );
  };
  
  export default InterviewSchedule;