import { Post } from "@prisma/client";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useFollow from "./useFollow";

const useLike = (post: Post, userId?: string) => {
    
    const useLogin = useLoginModal();
    const router = useRouter();

    const isLiked = useMemo(() => {
        const list = post?.likedIds || []
        return userId ? list.includes(userId) : false;
    }, [post?.likedIds, userId]);

    const toggleLike = useCallback(async () => {
        if(!userId) return useLogin.onOpen();
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
    }, [isLiked, post.id, router, useLogin, userId])

    return {
        isLiked,
        toggleLike
    }
}