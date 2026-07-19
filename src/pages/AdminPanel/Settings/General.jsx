import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import FormBlock from "./FormBlock.jsx";
import { UploadCV } from "./UploadCV.jsx";

const initialForm = {
    name: "",
    title: "",
    description: "",
    photoUrl: "",
    photoFile: null,
    photoType: "url",
    introTitle: "",
    introVideoUrl: "",
    videoFile: null,
    videoType: "url",
    introVideo: null,
    cvUrl: "",
    cvFile: null,
    cvType: "url"
};

const General = () => {
    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(true);
    const [loadingType, setLoadingType] = useState(null);

    // SAFE FIELD UPDATE
    const updateField = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/user");
                const data = res.data;

                // SINGLE NORMALIZATION LAYER
                setForm({
                    ...initialForm,

                    name: data?.name?.name ?? "",
                    title: data?.title?.title ?? "",
                    description: data?.description?.description ?? "",

                    photoUrl: data?.photo ?? "",

                    introTitle: data?.intro?.title ?? "",
                    introVideoUrl: data?.intro?.video ?? "",
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

                if (
                    form.photoType === "file" &&
                    form.photoFile
                ) {
                    payload.append(
                        "photo",
                        form.photoFile
                    );
                } else {
                    payload.append(
                        "photo",
                        form.photoUrl
                    );
                }
            }

            // INTRO
            if (type === "intro") {
                endpoint = "/api/user/user-intro";

                payload = new FormData();

                payload.append(
                    "title",
                    form.introTitle || ""
                );

                if (
                    form.videoType === "file" &&
                    form.videoFile
                ) {
                    payload.append(
                        "video",
                        form.videoFile
                    );
                } else {
                    payload.append(
                        "video",
                        form.introVideoUrl || ""
                    );
                }
            }

            // ENDPOINTS
            if (type === "name") endpoint = "/api/user/user-name";
            if (type === "title") endpoint = "/api/user/user-title";
            if (type === "description") endpoint = "/api/user/user-description";
            if (type === "cv") endpoint = "/api/user/user-cv";

            const res = await api.patch(endpoint, payload);

            if (type === "photo") {
                setForm(prev => ({
                    ...prev,
                    photoUrl:
                        res.data?.photo ||
                        res.data ||
                        prev.photoUrl,
                }));
            }

            if (type === "intro") {
                setForm(prev => ({
                    ...prev,
                    introVideoUrl:
                        res.data?.video ||
                        prev.introVideoUrl,
                }));
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingType(null);
        }
    };

    if (loading) {
        return (
            <p className="text-center mt-6">
                Loading...
            </p>
        );
    }
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

            {/* Upload CV */}
            <UploadCV />

            {/* PHOTO */}
            <div className="p-4 border border-base-300 rounded shadow space-y-3">
                <h2 className="text-lg font-semibold">Photo</h2>

                <select
                    value={form.photoType}
                    onChange={(e) =>
                        updateField("photoType", e.target.value)
                    }
                    className="select select-info w-full"
                >
                    <option value="url">Paste URL</option>
                    <option value="file">Upload Image</option>
                </select>

                {/* Always mounted File Input */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateField("photoFile", e.target.files?.[0] || null)}
                    className={`file-input w-full ${form.photoType !== "file" ? "hidden" : ""}`}
                />

                {/* PREVIEW */}
                {form.photoType === "url" && (
                    <FormBlock
                        type="text"
                        placeholder="Photo URL"
                        value={form.photoUrl}
                        onChange={(e) =>
                            updateField("photoUrl", e.target.value)
                        }
                        className="input input-info w-full"
                    />
                )}

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
            <div className="p-4 border border-base-300 rounded shadow space-y-3">

                <h2 className="text-lg font-semibold">Intro</h2>

                <select
                    value={form.videoType}
                    onChange={(e) => updateField("videoType", e.target.value)}
                    className="select select-info w-full"
                >
                    <option value="url">Paste URL</option>
                    <option value="file">Upload Video</option>
                </select>

                <input
                    type="text"
                    placeholder="Intro title"
                    value={form.introTitle || ""}
                    onChange={(e) =>
                        updateField("introTitle", e.target.value)
                    }
                    className="input input-info w-full"
                />

                {form.videoType === "file" && (
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                            updateField("videoFile", e.target.files?.[0] || null)
                        }
                        className="file-input w-full"
                    />
                )}

                {form.videoType === "url" && (
                    <input
                        type="text"
                        placeholder="Intro video URL"
                        value={form.introVideoUrl || ""}
                        onChange={(e) =>
                            updateField("introVideoUrl", e.target.value)
                        }
                        className="input input-info w-full"
                    />
                )}

                {form.videoType === "file" && form.videoFile && (
                    <video
                        src={URL.createObjectURL(form.videoFile)}
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
