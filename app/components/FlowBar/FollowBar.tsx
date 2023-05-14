"use client";

import Avatar from "../share/Avatar";
import { User } from "@prisma/client";

interface FollowBarProps {
    users: User[]
}
export const FollowBar : React.FC<FollowBarProps> = ({
    users
}) => {

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar user={user} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
