import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";
import getProfileImage from "../utilities/getProfileImage";
import Button from "./uI/Button";
import { supabase } from "../supabase/client";

export default function GameChat({ game }) {
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState("");
  
  const profile = useAuthStore((state) => state.profile);
  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select(
        `
      *,
      profile: profiles(id,username,avatar_url)
      `,
      )
      .eq("game_id", game.id)
      .order("id", { ascending: false })
      .limit(10);

    // console.log(data);
    if (data) {
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log(payload);
          fetchMessages();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addMessage = async () => {
    if (message.length >= 1 ) {
      await supabase
        .from("messages")
        .insert([{ text: message, game_id: game.id, profile_id: profile.id }]);

      await fetchMessages();
      setMessage("");
    }
  };

  return (
    <div className="ml-auto w-96">
      <div className="pt-24">
        {messages && messages.length > 0 ? (
          <div className="flex flex-col-reverse text-xs h-[300px] overflow-y-scroll pr-5 bg-slate-500 dark:bg-slate-500 dark:bg-opacity-60 dark:backdrop:blur-md bg-opacity-60  backdrop:blur">
            {messages.map((el, i) => (
              <div
                key={i}
                className={`mb-4 flex flex-col ${
                  el.profile_id === profile.id ? "items-end" : ""
                }`}
              >
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full border border-cyan-500 bg-black object-cover"
                    src={getProfileImage(el.profile.avatar_url)}
                  />
                  <p className="ml-4">{el.profile.username}</p>
                </div>
                <p className="ml-12 italic">{el.text}</p>
              </div>
            ))}
          </div>
        ) : (
          "No message in this chat"
        )}
        <div>
          <br />
          <br />

          <textarea
            name=""
            id=""
            rows="4"
            placeholder="Add Note"
            className="w-full bg-slate-600 p-2"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>

          <div className="mt-4 text-right">
            <Button label="Send message" type="subtmi" onClick={addMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
