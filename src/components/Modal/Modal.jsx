
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-1/2"
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center'>
            {/* Overlay */}
            <div
                className='absolute inset-0 z-20 bg-base backdrop-blur-sm'
                onClick={onClose}
            />
            {/* Modal */}
            <div
                className={`relative z-100 rounded-xl overflow-hidden bg-base-200/80 shadow-2xl shadow-base-content/40 w-full ${width} animate-fadeIn`}
            >
                {/* Header */}
                <div className='flex items-center'>
                    <h2 className='w-full text-xl text-center font-bold'>{title}</h2>
                    <button
                        onClick={onClose}
                        className='p-4 text-gray-500 text-2xl hover:text-base-content'
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