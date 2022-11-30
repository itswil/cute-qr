import { isValidUrl } from "../../utils/url";

type CtaProps = {
  dataString: string;
};

export const Cta = ({ dataString }: CtaProps) => {
  if (!isValidUrl(dataString)) {
    return null;
  }

  const url = new URL(dataString);

  return (
    <a
      href={url.href}
      className="absolute bg-sky-900 bottom-8 block font-bold py-6 px-12 right-8 rounded-full text-center text-slate-50"
      target="_blank"
      rel="noreferrer"
    >
      Go to {url.hostname}
    </a>
  );
};
