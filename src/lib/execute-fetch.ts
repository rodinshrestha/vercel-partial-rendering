// export const apiURL = process.env.NEXT_PUBLIC_API_URL;
const apiURL = "https://api.jacson.com";

export const executeFetch = async (
  url: `/${string}`,
  init?: RequestInit
): Promise<Response> => {
  const response = await fetch(`${apiURL}${url}`, init);
  return response;
};
