export const getUrl = (url: string) => new URL(url);

export const isValidUrl = (urlString: string) => {
  try {
    const { protocol } = getUrl(urlString);
    return protocol === "http:" || protocol === "https:";
  } catch (e) {
    return false;
  }
};
