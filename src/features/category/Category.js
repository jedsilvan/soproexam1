import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "react-bootstrap/Stack";

import Table from "../../app/table";
import Form from "./categoryForm";

import {
  fetchCategoryAsync,
  categoryList,
  createCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync,
} from "./categorySlice";
import { role } from "../login/loginInfoSlice";

const headers = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "creationTime",
    name: "Created at",
  },
  {
    key: "lastModificationTime",
    name: "Updated at",
  },
];

const editInitialValues = {
  name: "",
};

export const Category = () => {
  const dispatch = useDispatch();

  const categories = useSelector(categoryList);
  const _role = useSelector(role);

  const [mode, setMode] = useState("Create");
  const [editValues, setEditValues] = useState(editInitialValues);

  useEffect(() => {
    dispatch(fetchCategoryAsync());
  }, []);

  const handleCreate = (props) => {
    dispatch(createCategoryAsync(props));
  };

  const handleUpdate = (props) => {
    dispatch(updateCategoryAsync({ ...editValues, ...props }));
    setMode("Create");
  };

  const handleEditMode = (props) => {
    setMode("Update");
    setEditValues(props);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategoryAsync(id));
  };

  const isAdmin = useMemo(() => _role === "admin", [_role]);

  return (
    <Stack className="mx-auto" gap={3} style={{ marginTop: 80, width: "90%" }}>
      <div>
        <h1>Categories</h1>
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
          items={categories || []}
          onDelete={handleDelete}
          onEdit={handleEditMode}
          isAdmin={isAdmin}
        />
      </div>
    </Stack>
  );
};
