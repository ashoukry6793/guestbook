import axios, { AxiosError } from "axios";
import {
  BadRequestNetworkError,
  ConflictNetworkError,
  ConnectionNetworkError,
  NotFoundNetworkError,
  ServerNetworkError,
  UnAuthorizedNetworkError,
} from "../../core/models/Erros";
import AuthTokenRepoImpl from "../repositories/AuthTokenRepoImpl";

const BASE_URL = "http://localhost:9000";

function handleAxiosError({ request, response, message }: AxiosError): Error {
  if (response) {
    switch (response.status) {
      case 400:
        return new BadRequestNetworkError(response.data.devDetails);
      case 401:
        return new UnAuthorizedNetworkError(response.data.devDetails);
      case 404:
        return new NotFoundNetworkError(response.data.devDetails);
      case 409:
        return new ConflictNetworkError(response.data.devDetails);
      default:
        return new ServerNetworkError(response.data.devDetails);
    }
  }
  if (request) {
    return new ConnectionNetworkError();
  }

  return new Error(message);
}

async function get<Response>(urlPath: string): Promise<Response> {
  try {
    const token = await extractAuthToken();
    const url = `${BASE_URL}${urlPath}`;
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      timeout: 30000,
    });

    return response.data;
  } catch (err) {
    throw handleAxiosError(err as AxiosError);
  }
}

async function post<Request, Response>(
  urlPath: string,
  body: Request
): Promise<Response> {
  try {
    const token = await extractAuthToken();
    const url = `${BASE_URL}${urlPath}`;
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      timeout: 30000,
    });

    return response.data;
  } catch (err) {
    throw handleAxiosError(err as AxiosError);
  }
}

async function extractAuthToken() {
  const token = new AuthTokenRepoImpl().getToken();

  if (!token) return "";
  return token;
}

export default {
  get,
  post,
};
