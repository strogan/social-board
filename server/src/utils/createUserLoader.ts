import Dataloader from "dataloader";
import { User } from "../entities/User";

//takes id's of users [1,52,637,24636,33...]
//returns array of id and username [{id:1, username:"tim"},{},{},{}]
export const createUserLoader = () =>
  new Dataloader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });

    return userIds.map((userId) => userIdToUser[userId]);
  });
