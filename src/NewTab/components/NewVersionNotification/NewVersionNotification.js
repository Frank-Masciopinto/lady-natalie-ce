import React, { useState, useEffect } from 'react';

const MyComponent = () => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Check if the notification has already been closed
        if (localStorage.getItem('notificationClosed-v3.1.1') !== 'true') {
            setShowNotification(true);
        }
    }, []);

    const handleCloseNotification = () => {
        // Set state to hide notification
        setShowNotification(false);

        // Set value in localStorage so the notification won't show again
        localStorage.setItem('notificationClosed-v3.1.1', 'true');
    };

    return (
    <span>
        {
            showNotification && <div className="fixed top-28 right-5 bg-white bg-opacity-80 dark:bg-opacity-80 shadow-lg rounded-xl p-4 max-w-sm flex items-center space-x-4 z-50 dark:bg-slate-600">
                <p className="text-gray-800 text-sm flex-grow dark:text-white mr-6">
                    New feature alert! We've added more popular links in settings. The right most icon is now a daily todo list which clears the checkmarks at the end of every day. You can also hide this in settings.
                </p>
                <div 
                    className="absolute top-1 right-2 p-1 text-gray-800 cursor-pointer hover:text-red-700 transition-all duration-2 hover:font-bold"
                    onClick={handleCloseNotification}
                >
                    &#10005; {/* This is the Unicode character for a heavy multiplication sign, resembling a bold "X" */}
                </div>
            </div>
            }
        </span>
    );
};

export default MyComponent;