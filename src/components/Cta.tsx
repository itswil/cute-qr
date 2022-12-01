import { isValidUrl } from "../../utils/url";

type CtaProps = {
  dataString: string;
};

export const Cta = ({ dataString }: CtaProps) => {
  if (!isValidUrl(dataString)) {
    return null;
  }

  const { href, hostname } = new URL(dataString);

  return (
    <a
      href={href}
      className="absolute bg-sky-900 bottom-8 block font-bold py-6 px-12 right-8 rounded-full shadow-md text-center text-gray-50 transition-all hover:bg-sky-700 active:scale-95"
      target="_blank"
      rel="noreferrer"
    >
      Go to {hostname}
    </a>
  );
};
