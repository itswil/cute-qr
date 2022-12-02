import type { ScanData } from "../../constants/types";
import { getUrl, isValidUrl } from "../../utils/url";

type HistoryItemProps = {
  item: ScanData;
};

export const HistoryItem = ({ item }: HistoryItemProps) => {
  const isJustAdded = Date.now() - item.timestamp < 10000; // within 10 seconds
  return (
    <li
      key={item.timestamp}
      className={`border-4 mb-8 p-4 relative rounded-3xl ${
        isJustAdded ? "border-emerald-200" : "border-emerald-100"
      }`}
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
  );
};
