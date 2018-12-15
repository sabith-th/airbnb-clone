import * as DataLoader from "dataloader";
import { User } from "../entity/User";

type BatchUser = (ids: string[]) => Promise<User[]>;

const batchUsers: BatchUser = async ids => {
  const users = await User.findByIds(ids);

  // Dataloader expects the returned array to have the same order as the input array
  const userMap: { [key: string]: User } = {};
  users.forEach(user => {
    userMap[user.id] = user;
  });

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchUsers);
