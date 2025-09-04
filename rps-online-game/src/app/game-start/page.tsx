"use client";

import { useIdContext } from "@/context/IdContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";
import RpsPick from "../components/RpsPick";

const rps = [
  { name: "rock", value: 1 },
  { name: "scissors", value: 2 },
  { name: "paper", value: 3 },
];

export default function GamePage() {
  const [spinner, setSpinner] = useState(true);

  const { id, setId } = useIdContext();
  const router = useRouter();

  const [gameState, setGameState] = useState<number[] | []>([]);
  const [winner, setWinner] = useState<{ name: string; value: number } | null>(
    null
  );
  const [selection, setSelection] = useState<number[] | []>([]);

  useEffect(() => {
    console.log(selection);
  }, [selection]);

  useEffect(() => {
    if (!id) return router.push(`/`);
    setSpinner(false);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    if (socket.connected) {
      socket.emit("join_room", { roomId: id });
    } else {
      socket.once("connect", () => {
        socket.emit("join_room", { roomId: id });
      });
    }

    socket.on("receive_data", (data) => {
      setGameState((prev) => [...prev, data.message[0]]);
      console.log("data received", data);

      if (data.message[0] && data.message[1]) {
        const result = validateAndGetWinner(data.message[0], data.message[1]);
        setWinner(result);
        console.log(result);
        setGameState([]);
      }
    });

    return () => {
      socket.off("receive_data");
    };
  }, [id, router]);

  // useEffect(() => {
  //   // if (!(gameState.length === 2)) return;
  //   if (gameState[0] && gameState[1]) {
  //     getWinner(gameState[0], gameState[1]);
  //   }
  // }, [gameState]);

  if (spinner) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        LOADING...
      </div>
    );
  }

  const sendData = (theId: string, message: number[], selection: number[]) => {
    // if(message.length > 0) return alert("Array mus not be empty");

    socket.emit("game_data", {
      roomId: theId,
      message: [...message, selection[selection.length - 1]],
    });
    // socket.emit("game_data", {
    //   roomId: theId,
    //   message,
    // });
  };

  const leaveRoom = () => {
    if (id) socket.emit("leave_room", { roomId: id });

    localStorage.removeItem("idRoom");
    setId("");
    router.push(`/`);
  };

  function validateAndGetWinner(pick1: number, pick2: number) {
    const choice1 = rps.find((r) => r.value === pick1);
    const choice2 = rps.find((r) => r.value === pick2);

    if (!choice1 || !choice2) {
      throw new Error("Invalid pick value");
    }

    // Draw case
    if (pick1 === pick2) return null;

    // Explicit RPS rules
    if (
      (pick1 === 1 && pick2 === 2) || // rock beats scissors
      (pick1 === 2 && pick2 === 3) || // scissors beats paper
      (pick1 === 3 && pick2 === 1) // paper beats rock
    ) {
      return choice1; // pick1 wins
    } else {
      return choice2; // pick2 wins
    }
  }

  return (
    <main className="p-6">
      <nav className="flex justify-between items-center">
        <p>RoomId: {id}</p>
        <button
          className="bg-amber-600 px-4 py-2 text-white rounded"
          onClick={leaveRoom}
        >
          Leave
        </button>
      </nav>

      <h2 className="text-xl my-4">GAME PAGE</h2>

      {/* <RpsPick onPick={setGameState} pickState={gameState} /> */}
      <RpsPick onPick={setSelection} pickState={selection} />

      <button
        className="bg-blue-600 px-4 py-2 text-white rounded"
        onClick={() => sendData(id, gameState, selection)}
        disabled={selection[selection.length - 1] ? false : true}
      >
        Send Data
      </button>

      {gameState[0] && gameState[1] && (
        <div>
          <p>Your Pick:</p>
        </div>
      )}

      <div className="mt-6 border p-4 h-48 overflow-y-auto">
        {/* {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender}</b>: {msg.message}
          </p>
        ))} */}
      </div>
    </main>
  );
}
