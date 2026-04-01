import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import FormBlock from "../../../components/admin/FormBlock/FormBlock.jsx";

const General = () => {
    const [user, setUser] = useState(null);

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingType, setLoadingType] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/user");
                const data = res.data;
                // console.log(data);
                setUser(data);

                setName(data?.name?.name || "");
                setTitle(data?.title?.title || "");
                setDescription(data?.description?.description || "");
                setPhoto(data?.photo?.photo || "");
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleUpdate = async (type) => {
        setLoadingType(type);
        try {
            let payload = {};
            let endpoint = "";

            switch (type) {
                case "name":
                    payload = { name };
                    endpoint = "api/user/user-name";
                    break;

                case "title":
                    payload = { title };
                    endpoint = "api/user/user-title";
                    break;

                case "description":
                    payload = { description };
                    endpoint = "api/user/user-description";
                    break;

                case "photo":
                    payload = { photo };
                    endpoint = "api/user/user-photo";
                    break;

                default:
                    return;
            }

            const res = await api.patch(endpoint, payload);
            console.log(res.data);

            setUser(prev => ({
                ...prev,
                [type]: { ...prev[type], ...payload }
            }));

            alert(`${type} updated successfully`);
            // console.log(res.data);

        } catch (error) {
            console.error(error);
            alert(`Failed to update ${type}`);
        } finally {
            setLoadingType(null);
        }
    };

    if (!user) return <p className="text-center mt-6">Loading...</p>;

    return (
        <div className="grid grid-cols-2 gap-12">

            {/* Name */}
            <FormBlock
                title="Name"
                value={name}
                setValue={setName}
                onSave={() => handleUpdate("name")}
                loading={loadingType === "name"}
            />

            {/* Title */}
            <FormBlock
                title="Title"
                value={title}
                setValue={setTitle}
                onSave={() => handleUpdate("title")}
                loading={loadingType === "title"}
            />

            {/* Description */}
            <FormBlock
                title="Description"
                value={description}
                setValue={setDescription}
                onSave={() => handleUpdate("description")}
                loading={loadingType === "description"}
                textarea
            />

            {/* Photo */}
            <div className="p-4 border rounded shadow space-y-3">
                <h2 className="text-lg font-semibold">Photo</h2>

                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="input input-bordered w-full"
                />

                {photo && (
                    <img
                        src={photo}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded"
                    />
                )}

                <button
                    onClick={() => handleUpdate("photo")}
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default General;