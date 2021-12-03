import Dataloader from "dataloader";
import { Updoot } from "../entities/Updoot";

//takes id's of users and posts in object [{postId:5, userId:10},{postId:4, userId:14}]
//returns array of values of updoots [{postId:5, userId:10,value:1},{},{},{}]
export const createUpdootLoader = () =>
  new Dataloader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootIdToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });
      return keys.map((key) => updootIdToUpdoot[`${key.userId}|${key.postId}`]);
    }
  );
