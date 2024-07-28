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
      const nowTime = [now.getHours(), now.getMinutes()];

      reminders.forEach(reminder => {
        const reminderTime = reminder.time.split(':').map(Number);

        if (reminderTime[0] === nowTime[0] && reminderTime[1] === nowTime[1]) {
          console.log('Showing notification for reminder:', reminder);
          showNotification(reminder);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reminders]);

  const fetchReminders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/fetch-reminder', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: userId,
        },
      });
      setReminders(response.data);
    } catch (error) {
      console.error('Error fetching reminders:', error.response?.data || error.message);
    }
  };

  const showNotification = (reminder) => {
    if (Notification.permission === 'granted') {
      new Notification('Reminder', {
        body: `You have a reminder: ${reminder.type} at ${reminder.time}`,
        icon: '/path-to-icon/icon.png', // Adjust the path to your icon if you have one
      });
    } else {
      console.log('Notification permission not granted.');
    }
  };

  return (
    <ReminderContext.Provider value={{ reminders, fetchReminders }}>
      {children}
    </ReminderContext.Provider>
  );
};
