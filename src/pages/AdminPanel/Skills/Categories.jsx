import React, { useState } from 'react'
import api from '../../../api/axios.js';

const Categories = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddCategory = async (e,) => {
        e.preventDefault();
        if (!form.title) return alert("Category name is required");

        try {
            await api.post("/api/categories", {
                title: form.title,
                description: form.description
            });
            alert("Category created succesfully!");
            setForm({
                title: "",
                description: ""
            });

        } catch (error) {
            if (error.response?.status === 400) {
                alert(error.response.data.message);
                return;
            };
            alert("Failed to add category");
        }
    };

    return (
        <div>
            <div className="">
                <h1 className="mb-2 text-2xl font-semi-bold text-primary-content">Create new category :</h1>
                <form className="space-y-4" onSubmit={handleAddCategory}>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Category name (e.g. Frontend)"
                        className="input input-info text-primary-content input-bordered w-full"
                        value={form.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description (optional)"
                        className="input input-info text-primary-content input-bordered w-full"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-primary">Create Category</button>
                </form>
            </div>

            <div className="divider"></div>

            <div className="">
                <h1 className="mb-2 text-2xl font-semi-bold">Edit & Rearrange Categories</h1>
                <p className="text-gray-600">Drag and drop to rearrange categories. (Not implemented yet)</p>
                <p className="text-gray-600">Current order:</p>
                <ul className="list-disc list-inside">
                    <li className="text-gray-600">Category 1</li>
                    <li className="text-gray-600">Category 2</li>
                    <li className="text-gray-600">Category 3</li>
                </ul>
                <button className="btn btn-primary">Save Order</button>
            </div>

        </div>
    )
}

export default Categories;