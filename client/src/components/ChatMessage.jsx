
import { formatMessageTime } from "@/utils/dateUtils";

const ChatMessage = ({ message, isUser }) => {
  const { text, timestamp } = message;
  const formattedTime = formatMessageTime(timestamp);
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`
          max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl relative
          ${isUser 
            ? 'bg-newsmate-message-user text-newsmate-dark-gray rounded-tr-none' 
            : 'bg-newsmate-message-bot text-newsmate-dark-gray rounded-tl-none'
          }
        `}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap">{text}</p>
        <span className="block text-right text-xs text-gray-500 mt-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
