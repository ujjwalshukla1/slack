import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = new StreamChat(ENV.STREAM_API_KEY, ENV.STREAM_SECRET_KEY);

export const upsertStream = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted successfully");
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId, { mark_messages_deleted: true });
    console.log("Stream user deleted successfully");
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

export const generateToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log("Error generating token:", error);
    return null;
  }
};
