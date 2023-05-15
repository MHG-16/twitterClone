import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";


const useLike = (post: Post, userId?: string) => {
    
    const router = useRouter();

    const isLiked = useMemo(() => {
        const list = post?.likedIds || []
        return userId ? list.includes(userId) : false;
    }, [post?.likedIds, userId]);

    const toggleLike = useCallback(async () => {
        try{
            let request;
            request = ! isLiked ? () => axios.post('/api/like/',{postId : post.id})
            : () => axios.delete(`/api/like/${post.id}`);
            await request();
            router.refresh();
            toast.success("Success") 
        }catch(error){
            toast.error("Something went wrong!");
        }
    }, [isLiked, post.id, router])

    return {
        isLiked,
        toggleLike
    }
}

export default useLike;