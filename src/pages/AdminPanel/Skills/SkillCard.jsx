import { formatDistanceToNow } from 'date-fns';
import React from 'react';

const SkillCard = ({ skill, category, handleEdit, handleDelete, getFileUrl }) => {
    return (
        <div
            className="flex items-center justify-between shadow-lg shadow-base-content/30 border border-base-content/30 p-2 mb-4 text-xl"
        >
            <div className="flex items-center gap-2">
                <img
                    src={
                        skill.logoType === "file"
                            ? getFileUrl(skill.logo)
                            : skill.logo || "/placeholder.png"
                    }
                    alt={skill.title}
                    className="w-6 h-6 object-contain"
                />

                {/* Title */}
                <span>{skill.title}</span>
            </div>
            <div className="flex items-center gap-2">
                <small className="text-right text-sm text-gray-300">
                    {formatDistanceToNow(new Date(skill.updatedAt), {
                        addSuffix: true,
                    })}
                </small>
                <button
                    onClick={() => handleEdit(skill, category._id)}
                    className="btn btn-primary"
                >
                    Edit
                </button>

                <button
                    onClick={() => handleDelete(skill, category._id)}
                    className="btn btn-error"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SkillCard;