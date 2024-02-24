import { useEffect, useRef } from "react";
import { ProfileAvatar } from "../../components/utility-components/profile/avatar";
import { ProfileDisplayName } from "../../components/utility-components/profile/display-name";
import { ChatObject } from "../../utils/types/types";
import { timeSinceMessageDisplayText } from "../../utils/messages/utils";

export const ChatButton = ({
  pubkeyOfChat,
  chatObject,
  openedChatPubkey,
  handleClickChat,
}: {
  pubkeyOfChat: string;
  chatObject: ChatObject;
  openedChatPubkey: string;
  handleClickChat: (pubkey: string) => void;
}) => {
  let messages = chatObject?.decryptedChat;
  let lastMessage =
    messages && messages.length > 0 && messages[messages.length - 1];
  let unreadCount = chatObject?.unreadCount;

  let divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pubkeyOfChat === openedChatPubkey) {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [openedChatPubkey]);

  return (
    <div
      key={pubkeyOfChat}
      className={`mx-3 mb-2  flex cursor-pointer items-center gap-4 rounded-md border-2 border-light-fg px-3 py-2 hover:opacity-70 dark:border-dark-fg ${
        pubkeyOfChat === openedChatPubkey ? "bg-[#ccccccb9]" : ""
      }`}
      onClick={() => handleClickChat(pubkeyOfChat)}
      ref={divRef}
    >
      <div className="flex-shrink-0 overflow-clip">
        <ProfileAvatar pubkey={pubkeyOfChat} />
      </div>
      <div className="flex w-2/3 flex-shrink-0 flex-col ">
        <ProfileDisplayName pubkey={pubkeyOfChat} />
        <span className="line-clamp-1 break-all text-light-text dark:text-dark-text">
          {lastMessage ? lastMessage.content : "No messages yet"}
        </span>
      </div>
      <div className="flex flex-shrink-0 flex-grow flex-col text-right text-light-text dark:text-dark-text">
        <div className="h-1/2">
          {unreadCount > 0 ? (
            <span className="ml-2 rounded-full bg-shopstr-purple-light p-1 text-xs text-light-bg dark:bg-shopstr-yellow-light dark:text-dark-bg">
              {unreadCount}
            </span>
          ) : (
            <div className="h-[20px]">{/* spacer */}</div>
          )}
        </div>
        <div className="h-1/2">
          <span>
            {lastMessage
              ? timeSinceMessageDisplayText(lastMessage.created_at).short
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
