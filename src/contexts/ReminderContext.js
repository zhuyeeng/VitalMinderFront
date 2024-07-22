import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';

const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        const reminderDate = new Date(reminder.date);
        const reminderTime = reminder.time.split(':').map(Number);
        reminderDate.setHours(reminderTime[0]);
        reminderDate.setMinutes(reminderTime[1]);

        if (reminderDate <= now && reminderDate > new Date(now - 60000)) {
          showNotification(reminder);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reminders]);

  const fetchReminders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/fetch-reminder', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error.response?.data || error.message);
    }
  };

  const showNotification = (reminder) => {
    if (Notification.permission === 'granted') {
      new Notification('Appointment Reminder', {
        body: `You have an appointment: ${reminder.type} at ${reminder.time}`,
        icon: '/path-to-icon/icon.png', // Adjust the path to your icon if you have one
      });
    }
  };

  return (
    <ReminderContext.Provider value={{ reminders, fetchReminders }}>
      {children}
    </ReminderContext.Provider>
  );
};
