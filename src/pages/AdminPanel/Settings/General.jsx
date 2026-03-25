import { useEffect, useState } from 'react';
import api from '../../../api/axios';

const General = () => {
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState('');

    const [loadingTitle, setLoadingTitle] = useState(false);
    const [loadingPhoto, setLoadingPhoto] = useState(false);

    const [isFetching, setIsFetching] = useState(true);

    // Fetch existing data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const [titleRes, photoRes] = await Promise.all([
                    api.get('/site-title'),
                    api.get('/site-photo'),
                ]);

                setTitle(titleRes.data.title || '');
                setPhoto(photoRes.data.photo || '');
            } catch (error) {
                console.error(error);
                alert('Failed to fetch site data');
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, []);

    // Generic update handler
    const handleUpdate = async (type) => {
        try {
            if (type === 'title') setLoadingTitle(true);
            if (type === 'photo') setLoadingPhoto(true);

            const payload = type === 'title' ? { title } : { photo };
            const endpoint = type === 'title' ? '/site-title' : '/site-photo';

            const res = await api.put(endpoint, payload);
            alert(`${type === 'title' ? 'Title' : 'Photo'} updated successfully!`);
            console.log(`${type} updated:`, res.data);
        } catch (error) {
            console.error(error);
            alert(`Failed to update ${type}`);
        } finally {
            if (type === 'title') setLoadingTitle(false);
            if (type === 'photo') setLoadingPhoto(false);
        }
    };

    if (isFetching) return <p className="text-center mt-6">Loading...</p>;

    return (
        <div className="space-y-6 max-w-md mx-auto mt-8">

            {/* Title Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate('title');
                }}
                className="space-y-3 p-4 border rounded shadow"
            >
                <h2 className="text-lg font-semibold">Site Title</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter site title"
                    className="input input-bordered w-full"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loadingTitle}
                >
                    {loadingTitle ? 'Saving...' : 'Save Title'}
                </button>
            </form>

            {/* Photo Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate('photo');
                }}
                className="space-y-3 p-4 border rounded shadow"
            >
                <h2 className="text-lg font-semibold">Site Photo</h2>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="Enter image URL"
                    className="input input-bordered w-full"
                    required
                />

                {photo && (
                    <div className="mt-2">
                        <p className="text-sm mb-1">Preview:</p>
                        <img
                            src={photo}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded border"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loadingPhoto}
                >
                    {loadingPhoto ? 'Saving...' : 'Save Photo'}
                </button>
            </form>
        </div>
    );
};

export default General;