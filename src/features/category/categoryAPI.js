const baseURL = "https://readlater-test.azurewebsites.net/api";

export function fetchCategories(token) {
  let options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(`${baseURL}/services/app/Category/GetAll`, options).then(
    (response) => response.json()
  );
}

export function createCategory(props, token) {
  let options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };

  return fetch(`${baseURL}/services/app/Category/Create`, options).then(
    (response) => response.json()
  );
}

export function updateCategory(props, token) {
  let options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };

  return fetch(`${baseURL}/services/app/Category/Update`, options).then(
    (response) => response.json()
  );
}

export function deleteCategory(id, token) {
  let options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  return fetch(
    `${baseURL}/services/app/Category/Delete?id=${id}`,
    options
  ).then((response) => response.json());
}
