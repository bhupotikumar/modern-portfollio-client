import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import FormBlock from "./FormBlock.jsx";

const initialForm = {
    name: "",
    title: "",
    description: "",
    photoUrl: "",
    photoFile: null,
    photoType: "url",
    introTitle: "",
    introVideo: null
};

const General = () => {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false);
    const [loadingType, setLoadingType] = useState(null);

    // 🔥 SAFE FIELD UPDATE
    const updateField = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value ?? ""
        }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/user");
                const data = res.data;

                setUser(data);

                // 🔥 SINGLE NORMALIZATION LAYER (NO BUG EVER HERE)
                setForm({
                    name: data?.name?.name ?? "",
                    title: data?.title?.title ?? "",
                    description: data?.description?.description ?? "",

                    photoUrl: data?.photo?.photo ?? "",
                    photoFile: null,
                    photoType: "url",

                    introTitle: data?.intro?.title ?? "",
                    introVideo: null
                });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleUpdate = async (type) => {
        setLoadingType(type);

        try {
            let endpoint = "";
            let payload;

            // TEXT
            if (["name", "title", "description"].includes(type)) {
                payload = { [type]: form[type] ?? "" };
            }

            // PHOTO
            if (type === "photo") {
                endpoint = "/api/user/user-photo";
                payload = new FormData();

                if (form.photoType === "file" && form.photoFile) {
                    payload.append("photo", form.photoFile);
                } else {
                    payload.append("photo", form.photoUrl ?? "");
                }
            }

            // INTRO
            if (type === "intro") {
                endpoint = "/api/user/user-intro";
                payload = new FormData();

                if (form.introTitle) payload.append("title", form.introTitle);
                if (form.introVideo) payload.append("video", form.introVideo);
            }

            // ENDPOINTS
            if (type === "name") endpoint = "/api/user/user-name";
            if (type === "title") endpoint = "/api/user/user-title";
            if (type === "description") endpoint = "/api/user/user-description";

            const res = await api.patch(endpoint, payload);

            // 🔥 SAFE MERGE (NO STRUCTURE BREAK)
            setUser((prev) => ({
                ...prev,
                ...res.data
            }));

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingType(null);
        }
    };

    if (!user) return <p className="text-center mt-6">Loading...</p>;

    return (
        <div className="grid grid-cols-2 gap-12">

            {/* NAME */}
            <FormBlock
                title="Name"
                value={form.name || ""}
                setValue={(v) => updateField("name", v)}
                onSave={() => handleUpdate("name")}
                loading={loadingType === "name"}
            />

            {/* TITLE */}
            <FormBlock
                title="Title"
                value={form.title || ""}
                setValue={(v) => updateField("title", v)}
                onSave={() => handleUpdate("title")}
                loading={loadingType === "title"}
            />

            {/* DESCRIPTION */}
            <FormBlock
                title="Description"
                value={form.description || ""}
                setValue={(v) => updateField("description", v)}
                textarea
                onSave={() => handleUpdate("description")}
                loading={loadingType === "description"}
            />

            {/* PHOTO */}
            <div className="p-4 border rounded shadow space-y-3">

                <h2 className="text-lg font-semibold">Photo</h2>

                <select
                    value={form.photoType}
                    onChange={(e) => updateField("photoType", e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="url">Paste URL</option>
                    <option value="file">Upload Image</option>
                </select>

                {form.photoType === "url" ? (
                    <input
                        type="text"
                        value={form.photoUrl || ""}
                        onChange={(e) =>
                            updateField("photoUrl", e.target.value)
                        }
                        className="input input-bordered w-full"
                    />
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            updateField("photoFile", e.target.files?.[0] || null)
                        }
                        className="file-input w-full"
                    />
                )}

                {/* PREVIEW */}
                {form.photoType === "file" && form.photoFile ? (
                    <img
                        src={URL.createObjectURL(form.photoFile)}
                        className="w-32 h-32 object-cover rounded"
                        alt="preview"
                    />
                ) : (
                    form.photoUrl && (
                        <img
                            src={form.photoUrl}
                            className="w-32 h-32 object-cover rounded"
                            alt="preview"
                        />
                    )
                )}

                <button
                    onClick={() => handleUpdate("photo")}
                    className="btn btn-primary w-full"
                    disabled={loadingType === "photo"}
                >
                    {loadingType === "photo" ? "Saving..." : "Save"}
                </button>
            </div>

            {/* INTRO */}
            <div className="p-4 border rounded shadow space-y-3">

                <h2 className="text-lg font-semibold">Intro</h2>

                <input
                    type="text"
                    placeholder="Intro title"
                    value={form.introTitle || ""}
                    onChange={(e) =>
                        updateField("introTitle", e.target.value)
                    }
                    className="input input-bordered w-full"
                />

                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                        updateField("introVideo", e.target.files?.[0] || null)
                    }
                    className="file-input w-full"
                />

                {form.introVideo && (
                    <video
                        src={URL.createObjectURL(form.introVideo)}
                        controls
                        className="w-full rounded"
                    />
                )}

                <button
                    onClick={() => handleUpdate("intro")}
                    className="btn btn-primary w-full"
                    disabled={loadingType === "intro"}
                >
                    {loadingType === "intro" ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default General;