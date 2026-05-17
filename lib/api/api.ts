import axios from "axios";

// Додаємо /api наприкінці, як і вимагає бот для проксі
const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
