"use client";

import { useEffect, useState } from "react";
import { useIdContext } from "@/context/IdContext"; // adjust path
import { useRouter } from "next/navigation";

export default function Home() {
  const [toggle, setToggle] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const { id, setId } = useIdContext();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const localId = localStorage.getItem("idRoom");
    if (localId) {
      const parsedId = JSON.parse(localId);
      setId(parsedId);
    }
    if (id) {
      router.push(`/game-start`);
    }
  }, [setId, id]);

  const handleCreate = () => {
    setSpinner(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
      .then((response) => response.json())
      .then((data) => {
        setId(data.id);
        localStorage.setItem("idRoom", JSON.stringify(data.id));
        setSpinner(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSpinner(false);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Rock Paper Scissors</h1>

      <div className="my-8 space-x-4">
        <button className="border" onClick={() => setToggle(true)}>
          create
        </button>
        <button className="border" onClick={() => setToggle(false)}>
          join
        </button>
      </div>

      {toggle ? (
        <div className="flex flex-col items-center">
          <h2>Create Your Room</h2>
          {spinner ? (
            <p>LOADING...</p>
          ) : (
            <button
              className="bg-red-400 pl-6 pr-6 pt-2 pb-2 rounded-md text-white"
              onClick={handleCreate}
            >
              Create
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2>Join Room</h2>
          {spinner ? (
            <p>LOADING...</p>
          ) : (
            <form
              className="flex flex-col items-center"
              onSubmit={(e) => {
                e.preventDefault();
                if (roomId) {
                  setId(roomId);
                  localStorage.setItem("idRoom", JSON.stringify(roomId));
                  router.push(`/game-start`);
                }
              }}
            >
              <input
                type="text"
                className="bg-amber-50 text-black"
                onChange={(e) => setRoomId(e.target.value.trim())}
              />
              <button className="bg-red-400 pl-6 pr-6 pt-2 pb-2 rounded-md text-white">
                Join
              </button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}
