import React, { createContext, useState, useContext } from 'react';
import ToastContainer from '../ToastContainer';
const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts([...toasts, { id, message, type }]);

        setTimeout(() => {
            setToasts(toasts.filter(toast => toast.id !== id));
        }, 3000); // Display time for each toast
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
};