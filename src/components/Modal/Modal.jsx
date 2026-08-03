
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-lg"
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
                className={`relative z-100 rounded-xl overflow-hidden bg-base-200/80 shadow-2xl shadow-base-content/40 ${width} animate-fadeIn w-full`}
            >
                {/* Header */}
                <div className='flex items-center'>
                    <h2 className='w-full text-base md:text-xl text-center font-bold p-2'>{title}</h2>
                    <button
                        onClick={onClose}
                        className='p-2 md:p-4 text- text-2xl text-primary-content hover:text-base-content'
                    >
                        ✕
                    </button>
                </div>
                {/* Body */}
                <div className="overflow-auto">{children}</div>

            </div>

        </div>
    );
};

export default Modal;