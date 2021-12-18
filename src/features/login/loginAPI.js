const baseURL = "https://readlater-test.azurewebsites.net/api";

export function authenticate(props) {
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  };

  return fetch(`${baseURL}/TokenAuth/Authenticate`, options).then((response) =>
    response.json()
  );
}

export function getLoginInformation(token) {
  let options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(
    `${baseURL}/services/app/Session/GetCurrentLoginInformations`,
    options
  ).then((response) => response.json());
}
