import { SERVER_ADDRESS, getToken } from "./index.js";

export default async function disconnect() {
  const response = await fetch(SERVER_ADDRESS + "disconnect", {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  window.localStorage.setItem("token", undefined);

  if (!response.ok) {
    return true;
  } else {
    return false;
  }
}