const FormBlock = ({
    title,
    value = "",
    setValue,
    onSave,
    loading = false,
    textarea = false
}) => {
    return (
        <div className="p-4 border border-base-content/30 rounded shadow-lg shadow-base-content/30 space-y-3">

            <h2 className="text-lg font-semibold text-primary-content">{title}</h2>

            {textarea ? (
                <textarea
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}
                    className="textarea textarea-info text-primary-content textarea-bordered w-full"
                />
            ) : (
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => setValue(e.target.value)}
                    className="input input-info text-primary-content input-bordered w-full"
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