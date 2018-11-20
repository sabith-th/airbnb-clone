import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";

export const createTypeORMConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
