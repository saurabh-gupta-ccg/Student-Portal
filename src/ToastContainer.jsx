import React from 'react';

const ToastContainer = ({ toasts }) => {
    return (
        <div className="fixed top-5 right-5 z-1000">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast ${toast.type} `+ `mb-3 p-4 rounded-md text-green-700 text-base`}>
                    {toast.message}
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;