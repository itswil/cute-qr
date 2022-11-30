import { KEY } from "../../constants/localStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import type { ScanData } from "../../constants/types";

export const History = () => {
  const [scanHistory, setScanHistory] = useLocalStorage<Array<ScanData>>(
    KEY,
    []
  );

  if (!scanHistory || scanHistory.length === 0) {
    return <p className="text-center">Your scan history is empty</p>;
  }

  return (
    <>
      <ul className="pb-28">
        {scanHistory.map((item) => (
          <li
            key={item.timestamp}
            className="border-4 border-emerald-100 mb-8 p-4 rounded-3xl"
          >
            <code className="block break-all pb-4 text-sm">{item.data}</code>
            <p className="text-xs text-slate-400">
              {new Date(item.timestamp).toLocaleString(["en-GB"], {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </li>
        ))}
      </ul>
      <button
        className="fixed bg-slate-50 bottom-8 block font-bold py-6 px-12 right-8 rounded-full text-center"
        onClick={() => setScanHistory([])}
      >
        Clear history
      </button>
    </>
  );
};
