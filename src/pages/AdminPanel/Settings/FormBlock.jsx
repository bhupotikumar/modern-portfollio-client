const FormBlock = ({ title, value, setValue, onSave, loading, textarea }) => {
    return (
        <div className="p-4 border border-base-content/30 rounded shadow-lg shadow-base-content/30 space-y-3">
            <h2 className="text-lg font-semibold">{title}</h2>

            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="textarea textarea-bordered w-full"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="input input-bordered w-full"
                />
            )}

            <button
                onClick={onSave}
                className="btn btn-primary w-full"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
};

export default FormBlock;