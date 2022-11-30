import { useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import { useLocalStorage } from "usehooks-ts";

import { Cta } from "./Cta";
import { IconLoading } from "./IconLoading";
import { IconTick } from "./IconTick";
import { KEY } from "../../constants/localStorage";
import { isValidUrl } from "../../utils/url";

import type { ScanData } from "../../constants/types";

export const Scanner = () => {
  const [scanHistory, setScanHistory] = useLocalStorage<Array<ScanData>>(
    KEY,
    []
  );
  const [scanResult, setScanResult] = useState<QrScanner.ScanResult>();

  useEffect(() => {
    const handleScan = (result: QrScanner.ScanResult) => {
      if (result) {
        qrScanner.stop();
        setScanResult(result);
        setScanHistory([
          { data: result.data, timestamp: Date.now() },
          ...scanHistory,
        ]);

          if (!isValidUrl(result.data)) {
            window.location.href = '/history';
          }
      }
    };

    const video = document.getElementById("video") as HTMLVideoElement;

    const qrScanner = new QrScanner(video, (result) => handleScan(result), {
      returnDetailedScanResult: true,
      maxScansPerSecond: 4,
    });
    qrScanner.start();

    return () => {
      qrScanner && qrScanner.stop();
    };
  }, []);

  return (
    <>
      <div
        className="aspect-square bg-emerald-100 relative"
        style={{ clipPath: "url(#squircle)" }}
      >
        <video
          id="video"
          className="aspect-square object-cover relative scale-90 z-10"
        />
        {scanResult ? <IconTick /> : <IconLoading />}
      </div>
      {scanResult && <Cta dataString={scanResult.data} />}
    </>
  );
};
