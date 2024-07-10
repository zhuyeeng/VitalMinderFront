import { useEffect } from 'react';

const useReminderNotifications = (reminders) => {
  useEffect(() => {
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission); // Log permission status
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else {
      console.log('Notification permission already granted.');
    }
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      console.log(`Checking reminders at ${currentHour}:${currentMinute}`); // Log current time

      reminders.forEach(reminder => {
        const [reminderHour, reminderMinute] = reminder.time.split(':').map(Number);
        console.log(`Reminder time: ${reminderHour}:${reminderMinute}`); // Log reminder time
        if (reminderHour === currentHour && reminderMinute === currentMinute) {
          console.log('Reminder matched:', reminder); // Log matching reminder
          showNotification(reminder);
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reminders]);

  const showNotification = (reminder) => {
    if (Notification.permission === 'granted') {
      console.log('Showing notification for:', reminder); // Log notification details
      new Notification('Medication Reminder', {
        body: `It's time to take your medication: ${reminder.medication_types}`,
        icon: '/path-to-icon/icon.png' // Adjust the path to your icon if you have one
      });
    } else {
      console.log('Notification permission not granted');
    }
  };
};

export default useReminderNotifications;
