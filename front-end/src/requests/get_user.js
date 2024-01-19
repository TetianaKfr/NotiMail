import { SERVER_ADDRESS } from "./index.js";

export default async function getUser(firm_name) {
  const response = await fetch(SERVER_ADDRESS + "get_user/" + firm_name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    return await response.json();
  } else {
    return null
  }
}
