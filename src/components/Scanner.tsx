import { useEffect, useState } from "react";
import QrScanner from "qr-scanner";

export const Scanner = () => {
  const [result, setResult] = useState<QrScanner.ScanResult>();

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    const qrScanner = new QrScanner(video!, (result) => setResult(result), {
      returnDetailedScanResult: true,
    });
    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, []);

  return (
    <>
      <video
        id="video"
        className="aspect-square object-cover"
        style={{ clipPath: "url(#squircle)" }}
      />
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </>
  );
};
