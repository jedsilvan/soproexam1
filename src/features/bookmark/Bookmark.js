import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";

import Table from "../../app/table";
import Form from "./bookmarkForm";
import {
  fetchBookmarkAsync,
  bookmarkList,
  createBookmarkAsync,
  updateBookmarkAsync,
  deleteBookmarkAsync,
} from "./bookmarkSlice";
import { fetchCategoryAsync } from "../category/categorySlice";
import { role } from "../login/loginInfoSlice";

const headers = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "url",
    name: "URL",
  },
  {
    key: "shortDescription",
    name: "Short description",
  },
  {
    key: "categoryId",
    name: "Category ID",
  },
];

const editInitialValues = {
  url: "",
  shortDescription: "",
  categoryId: null,
  id: null,
};

export const Bookmark = () => {
  const dispatch = useDispatch();

  const bookmarks = useSelector(bookmarkList);
  const _role = useSelector(role);

  const [mode, setMode] = useState("Create");
  const [editValues, setEditValues] = useState(editInitialValues);

  useEffect(() => {
    dispatch(fetchBookmarkAsync());
    dispatch(fetchCategoryAsync());
  }, []);

  const handleCreate = (props) => {
    dispatch(createBookmarkAsync(props));
  };

  const handleUpdate = (props) => {
    dispatch(updateBookmarkAsync({ ...props, id: editValues.id }));
    setMode("Create");
  };

  const handleEditMode = ({ url, shortDescription, categoryId, id }) => {
    setMode("Update");
    setEditValues({
      url,
      shortDescription,
      categoryId,
      id,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteBookmarkAsync(id));
  };

  const isAdmin = useMemo(() => _role === "admin", [_role]);

  return (
    <Stack className="mx-auto" gap={3} style={{ marginTop: 80, width: "90%" }}>
      <div>
        <h1>Bookmarks</h1>
      </div>
      {isAdmin && (
        <div>
          <Form
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            mode={mode}
            editValues={editValues}
          />
        </div>
      )}
      <div>
        <Table
          headers={headers}
          items={bookmarks || []}
          onDelete={handleDelete}
          onEdit={handleEditMode}
          isAdmin={isAdmin}
        />
      </div>
    </Stack>
  );
};
