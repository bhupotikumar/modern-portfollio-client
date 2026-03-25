import React from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-lg"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`relative rounded-xl shadow-2xl shadow-white/60 w-full ${width} p-6 animate-fadeIn`}
            >
                {/* Header */}
                <div className="flex items-center mb-4">
                    <h2 className="w-full text-xl text-center font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;