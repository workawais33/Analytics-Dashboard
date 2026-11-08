import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "The latest analytics report looks great.",
    time: "10:42 AM",
    initials: "SJ",
    unread: 2,
  },
  {
    id: 2,
    name: "Michael Chen",
    message: "Can you review the regional data?",
    time: "9:35 AM",
    initials: "MC",
    unread: 1,
  },
  {
    id: 3,
    name: "Emily Davis",
    message: "Thanks for the update.",
    time: "Yesterday",
    initials: "ED",
    unread: 0,
  },
];

const initialMessages = {
  1: [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Hi! I've reviewed the latest analytics dashboard.",
      time: "10:38 AM",
      own: false,
    },
    {
      id: 2,
      sender: "You",
      message:
        "Great. Did you notice anything important in the regional data?",
      time: "10:40 AM",
      own: true,
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      message:
        "Yes, North America has shown strong growth this month.",
      time: "10:42 AM",
      own: false,
    },
  ],

  2: [
    {
      id: 1,
      sender: "Michael Chen",
      message: "Hi! Can you review the regional data?",
      time: "9:30 AM",
      own: false,
    },
    {
      id: 2,
      sender: "You",
      message: "Sure. I'll review the latest regional performance.",
      time: "9:32 AM",
      own: true,
    },
    {
      id: 3,
      sender: "Michael Chen",
      message: "Perfect. Let me know if you notice anything unusual.",
      time: "9:35 AM",
      own: false,
    },
  ],

  3: [
    {
      id: 1,
      sender: "Emily Davis",
      message: "Thanks for the update.",
      time: "Yesterday",
      own: false,
    },
    {
      id: 2,
      sender: "You",
      message: "You're welcome. I'll keep you posted.",
      time: "Yesterday",
      own: true,
    },
  ],
};

function Chat() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(initialMessages);

  const currentMessages = chatMessages[selectedChat.id] || [];

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      message: trimmedMessage,
      time: "Now",
      own: true,
    };

    setChatMessages((previous) => ({
      ...previous,
      [selectedChat.id]: [
        ...(previous[selectedChat.id] || []),
        newMessage,
      ],
    }));

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-108px)] min-h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <aside className="hidden w-[300px] shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col">
        <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Messages
              </h1>
              <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                Recent conversations
              </p>
            </div>

            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <MoreVertical size={17} />
            </button>
          </div>

          <div className="relative mt-4">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search conversations..."
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:ring-4 focus:ring-teal-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-teal-500 dark:focus:bg-slate-800 dark:focus:ring-teal-500/10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {conversations.map((conversation) => {
              const active = selectedChat.id === conversation.id;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedChat(conversation)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition ${
                    active
                      ? "bg-teal-50 dark:bg-teal-500/10"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      active
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {conversation.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                        {conversation.name}
                      </p>

                      <span className="shrink-0 text-[10px] font-medium text-slate-400">
                        {conversation.time}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {conversation.message}
                      </p>

                      {conversation.unread > 0 && (
                        <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-teal-600 px-1 text-[9px] font-bold text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col bg-white dark:bg-slate-900">
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-100 px-4 sm:px-5 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 md:hidden dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              {selectedChat.initials}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                {selectedChat.name}
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-emerald-500">
                Online
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <MoreVertical size={17} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50/60 p-4 sm:p-6 dark:bg-slate-950/30">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <div className="py-2 text-center">
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
                Today
              </span>
            </div>

            {currentMessages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.own ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[65%] ${
                    item.own ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs font-medium leading-relaxed ${
                      item.own
                        ? "rounded-br-md bg-teal-600 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {item.message}
                  </div>

                  <span className="mt-1 px-1 text-[9px] font-medium text-slate-400 dark:text-slate-500">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 transition dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <Paperclip size={16} />
            </button>

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              className="min-w-0 flex-1 bg-transparent px-1 text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
            />

            <button
              type="button"
              className="hidden h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700 sm:flex dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <Smile size={16} />
            </button>

            <button
              type="button"
              onClick={handleSend}
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-teal-600 text-white transition hover:bg-teal-700"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Chat;