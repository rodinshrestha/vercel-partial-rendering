import { HeaderType } from "@/core/types/api-headers.types";
import { publicAxios } from "@/core/utils/axios";

export const getCountries = (headers: HeaderType) =>
  publicAxios.get("/sf/channels/countries", { headers });
