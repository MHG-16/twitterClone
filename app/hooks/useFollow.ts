import { useCallback, useMemo } from "react";

import { User } from "@prisma/client";
import useLoginModal from "./useLoginModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const useFollow = (user: User, userId: string) => {
    
    const loginModal = useLoginModal();
    const router = useRouter();

    const isFollowing = useMemo(() => {
        const list = user?.followingIds || [];
        return list.includes(userId);
    }, [user, userId]);

    const toggleFollow = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!user) return loginModal.onOpen();

        try{
            let request;
            request = isFollowing ? () => axios.delete("/api/follow/")
            : () => axios.post(`/apu/follow/${userId}`);

            await request();
            router.refresh();
            toast.success("Success");
        }catch(error){
            toast.error("Something went wrong")
        }
    }, [isFollowing, loginModal, router, user, userId]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;