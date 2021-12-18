const baseURL = "https://readlater-test.azurewebsites.net/api";

export function fetchBookmarks(token) {
  let options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(`${baseURL}/services/app/Bookmark/GetAll`, options).then(
    (response) => response.json()
  );
}

export function createBookmark(props, token) {
  let options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };

  return fetch(`${baseURL}/services/app/Bookmark/Create`, options).then(
    (response) => response.json()
  );
}

export function updateBookmark(props, token) {
  let options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };

  return fetch(`${baseURL}/services/app/Bookmark/Update`, options).then(
    (response) => response.json()
  );
}

export function deleteBookmark(id, token) {
  let options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(
    `${baseURL}/services/app/Bookmark/Delete?id=${id}`,
    options
  ).then((response) => response.json());
}
