import { SERVER_ADDRESS, get_token } from "./index.js";

export default async function disconnect() {
  const response = await fetch(SERVER_ADDRESS + "disconnect", {
    method: "POST",
    headers: { Authorization: `Bearer ${get_token()}` },
  });

  window.localStorage.setItem("token", undefined);

  if (!response.ok()) {
    return true;
  } else {
    return false;
  }
}
