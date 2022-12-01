import { KEY } from "../../constants/localStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import type { ScanData } from "../../constants/types";
import { getUrl, isValidUrl } from "../../utils/url";

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
          <li
            key={item.timestamp}
            className="border-4 border-emerald-100 mb-8 p-4 relative rounded-3xl"
          >
            <code className="block break-all pb-4 text-sm">{item.data}</code>
            <p className="text-xs text-gray-400">
              {new Date(item.timestamp).toLocaleString(["en-GB"], {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            {isValidUrl(item.data) && (
              <a
                href={getUrl(item.data).href}
                className="absolute bg-sky-900 block py-2 px-3 right-4 rounded-full shadow-md text-center text-gray-50 text-xs transition-all hover:bg-sky-700 active:scale-95"
                target="_blank"
                rel="noreferrer"
              >
                Go to website
              </a>
            )}
          </li>
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
