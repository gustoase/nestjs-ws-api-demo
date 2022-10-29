import { Api } from "../../api/Api";

const httpApi = new Api({
  baseUrl: "https://localhost:3000",
});

export const useApi = () => {
  return httpApi.api;
};
