import React, { useState, useEffect } from 'react';
import { sendChatMessage } from '../../lib/axios'; // Adjust the import path as needed
import NavBar from '../NavBar/NavBar';

const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSend = async () => {
        if (!message.trim()) return;

        const newMessage = { sender: 'user', text: message };
        setChatHistory([...chatHistory, newMessage]);

        try {
            const chatResponse = await sendChatMessage({ message, user_id: userId });
            const botMessage = { sender: 'bot', text: chatResponse.response };
            setChatHistory([...chatHistory, newMessage, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Sorry, there was an error processing your request.' };
            setChatHistory([...chatHistory, newMessage, errorMessage]);
        }

        setMessage('');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            <NavBar />
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-lg mx-auto">
                    <div className="flex flex-col h-[500px] sm:h-[600px]">
                        <div className="px-4 py-3 border-b dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Chatbot Assistant</h2>
                                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Online</div>
                            </div>
                        </div>
                        <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2" id="chatDisplay">
                            {chatHistory.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`chat-message max-w-xs rounded-lg px-3 py-1.5 text-sm ${chat.sender === 'user' ? 'self-end bg-blue-500 text-white' : 'self-start bg-gray-500 text-white'}`}
                                >
                                    {chat.text}
                                </div>
                            ))}
                        </div>
                        <div className="px-3 py-2 border-t dark:border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    placeholder="Type your message..."
                                    className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={handleSend}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
