import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { getStreamToken } from "../lib/api";
import { useUser } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);

  const {
    data: tokenData,
    isLoading: tokenLoading,
    error: tokenError,
  } = getStreamToken({
    queryKey: ["streamToken"],
    queryfn: getStreamToken,
    enabled: !!user,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !user) return;

      try {
        const client = StreamChat.getInstance(apiKey);
        await client.connectUser({
          id: user.id,
          name: user.fullName,
          image: user.imageUrl,
        });
        setChatClient(client);
      } catch (error) {
        console.log("Error connecting to Stream Chat:", error);
        Sentry.captureException(error);
      }
    };
    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, user]);

  return { chatClient, isLoading: tokenLoading, error: tokenError };
};
