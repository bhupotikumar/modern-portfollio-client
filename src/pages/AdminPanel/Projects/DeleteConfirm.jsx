import Modal from "../Modal/Modal";

const DeleteConfirm = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
            <p className="text-gray-400 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
                <button onClick={onClose} className="btn">
                    Cancel
                </button>
                <button onClick={onConfirm} className="btn btn-error">
                    Delete
                </button>
            </div>
        </Modal>
    );
};

export default DeleteConfirm;