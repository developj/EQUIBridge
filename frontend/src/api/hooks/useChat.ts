import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChat } from "../api";
import { ChatRequest, ChatResponse } from "../interface";

export const useChat = () => {
  const queryClient = useQueryClient();

  return useMutation<ChatResponse, unknown, ChatRequest>({
    mutationFn: sendChat,
    onSuccess: (data) => {
      // Optionally append the new reply into a "chat" query cache
      // so our UI can render the history.
      //But we currently do not have any query that return chat.
      queryClient.setQueryData<ChatResponse[]>(
        ["chatHistory"],
        (old = []) => [...old, data]
      );
    },
  });
};
