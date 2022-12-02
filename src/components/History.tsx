import { KEY } from "../../constants/localStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { HistoryItem } from "./HistoryItem";

import type { ScanData } from "../../constants/types";

export const History = () => {
  const [scanHistory, setScanHistory] = useLocalStorage<Array<ScanData>>(
    KEY,
    []
  );

  if (!scanHistory || scanHistory.length === 0) {
    return (
      <p className="border-4 border-emerald-100 mb-8 p-4 rounded-3xl text-center">
        Your scan history is empty
      </p>
    );
  }

  return (
    <>
      <ul className="pb-28">
        {scanHistory.map((item) => (
          <HistoryItem item={item} />
        ))}
      </ul>
      <button
        className="fixed bg-gray-50 bottom-8 block font-bold py-6 px-12 right-8 rounded-full shadow-md text-center transition-all hover:bg-white active:scale-95"
        onClick={() => setScanHistory([])}
      >
        Clear history
      </button>
    </>
  );
};
