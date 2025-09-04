// "use client";
// import { useState } from "react";

// const rps = [
//   { name: "rock", value: 1 },
//   { name: "scissors", value: 2 },
//   { name: "paper", value: 3 },
// ];

// interface RpsPickProps {
//   onPick: (pick: number[] | []) => void;
//   pickState: number[] | [];
// }
// export default function RpsPick({ onPick, pickState }: RpsPickProps) {
//   const [selected, setSelected] = useState("");

//   const updateFunc = (arr: number[], myPick: number) => {
//     if (!myPick) return;

//     if (arr.length < 1) {
//       onPick([myPick]);
//     } else {
//       onPick([arr[arr.length - 1], myPick]);
//     }
//   };

//   return (
//     <div className="flex justify-center gap-8 my-8">
//       {rps.map((pick) => {
//         return (
//           <div
//             key={pick.value}
//             className={`inline-block border-4 p-2 rounded-lg cursor-pointer ${
//               selected === pick.name ? "border-amber-400" : "border-transparent"
//             }`}
//             onClick={() => {
//               setSelected(pick.name);
//               updateFunc(pickState, pick.value);

//               //   onPick([...pickState, pick.value]);
//             }}
//           >
//             <img
//               src={`${pick.name}.png`}
//               alt={pick.name}
//               className="w-44 h-44"
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";
import { useState } from "react";

const rps = [
  { name: "rock", value: 1 },
  { name: "scissors", value: 2 },
  { name: "paper", value: 3 },
];

interface RpsPickProps {
  onPick: (pick: number[] | []) => void;
  pickState: number[] | [];
}
export default function RpsPick({ onPick, pickState }: RpsPickProps) {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex justify-center gap-8 my-8">
      {rps.map((pick) => {
        return (
          <div
            key={pick.value}
            className={`inline-block border-4 p-2 rounded-lg cursor-pointer ${
              selected === pick.name ? "border-amber-400" : "border-transparent"
            }`}
            onClick={() => {
              setSelected(pick.name);

              onPick([...pickState, pick.value]);
            }}
          >
            <img
              src={`${pick.name}.png`}
              alt={pick.name}
              className="w-44 h-44"
            />
          </div>
        );
      })}
    </div>
  );
}
