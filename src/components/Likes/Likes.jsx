import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Likes = ({ likes = 0 }) => {

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(likes);

    const handleLike = (e) => {
        e.stopPropagation()
        setLiked(!liked);
        setLikesCount((prev) => prev + (liked ? -1 : 1));
    };


    return (
        <div className="flex items-center">
            <button onClick={handleLike}>
                {liked ? (
                    <AiFillLike className="text-2xl text-primary" />
                ) : (
                    <AiOutlineLike className="text-2xl" />
                )}
            </button>
            <span className="mx-1 mt-1">{likesCount}</span>
        </div>
    );
};

export default Likes;