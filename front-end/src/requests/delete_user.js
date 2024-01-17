import { get_token, SERVER_ADDRESS } from "./index.js";

export default async function delete_user(firm_name) {
  const response = await fetch(SERVER_ADDRESS + "delete_user", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${get_token()}` },
    body: {
      firm_name: firm_name,
    }
  });

  if (!response.ok()) {
    return true;
  } else {
    return false;
  }
}
