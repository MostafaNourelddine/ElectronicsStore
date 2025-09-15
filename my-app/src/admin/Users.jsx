// src/admin/Users.jsx
import React, { useState, useEffect } from "react";
import notify from "../utils/notify";
import { validateRequired, hasErrors, isValidEmail } from "../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";

import { addUser, removeUser, updateUserRole } from "../slices/AuthSlice";
import usersList from "../users";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editData, setEditData] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const roles = ["admin", "user", "guest"];

  // Load initial mock users
  useEffect(() => {
    if (users.length === 0) {
      usersList.forEach((user) => dispatch(addUser(user)));
    }
  }, [dispatch, users.length]);

  const handleChange = (e, field, isEdit = false) => {
    if (isEdit) {
      setEditData((prev) => ({ ...prev, [field]: e.target.value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleAddUser = () => {
    const { name, username, email, password, role } = formData;
    const nextErrors = validateRequired(formData, [
      "name",
      "username",
      "email",
      "password",
      "role",
    ]);
    if (!nextErrors.email && !isValidEmail(email)) {
      nextErrors.email = true;
    }
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      if (nextErrors.email) {
        notify.error("Please enter a valid email");
      } else {
        notify.error("Please fill all required fields.");
      }
      return;
    }

    if (users.some((u) => u.username === username)) {
      setErrors((prev) => ({ ...prev, username: true }));
      notify.error("Username must be unique!");
      return;
    }

    dispatch(addUser(formData));

    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "user",
    });
    setShowAddDialog(false);
    setErrors({});
    notify.success("User added successfully");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(removeUser(id));
      notify.success("User deleted");
    }
  };

  const handleEdit = (user) => {
    setEditData({ ...user });
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    dispatch(updateUserRole({ id: editData.id, role: editData.role }));
    setShowEditDialog(false);
    setEditData(null);
    notify.success("User updated");
  };

  const renderForm = (data, isEdit = false) => (
    <div className="flex flex-col gap-4 p-2">
      {!isEdit && (
        <>
          <InputText
            placeholder="Name"
            value={data.name}
            onChange={(e) => handleChange(e, "name", isEdit)}
            className={`w-full border rounded-lg p-3 shadow-sm ${
              !isEdit && errors.name ? "border-red-500" : ""
            }`}
          />
          <InputText
            placeholder="Username"
            value={data.username}
            onChange={(e) => handleChange(e, "username", isEdit)}
            className={`w-full border rounded-lg p-3 shadow-sm ${
              !isEdit && errors.username ? "border-red-500" : ""
            }`}
          />
          <InputText
            placeholder="Email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange(e, "email", isEdit)}
            className={`w-full border rounded-lg p-3 shadow-sm ${
              !isEdit && errors.email ? "border-red-500" : ""
            }`}
          />
          <InputText
            placeholder="Password"
            type="password"
            value={data.password}
            onChange={(e) => handleChange(e, "password", isEdit)}
            className={`w-full border rounded-lg p-3 shadow-sm ${
              !isEdit && errors.password ? "border-red-500" : ""
            }`}
          />
        </>
      )}
      <Dropdown
        value={data.role}
        options={roles}
        placeholder="Select Role"
        onChange={(e) => handleChange(e, "role", isEdit)}
        className={`w-full border rounded-lg p-3 shadow-sm ${
          !isEdit && errors.role ? "border-red-500" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#04369a]">Users</h2>
        <Button
          label="Add User"
          icon="pi pi-plus"
          className="bg-[#04369a] text-white px-5 py-2 rounded-lg shadow-md"
          onClick={() => setShowAddDialog(true)}
        />
      </div>

      <DataTable value={users} paginator rows={6} className="shadow-lg rounded">
        <Column field="id" header="ID" sortable />
        <Column field="name" header="Name" sortable />
        <Column field="username" header="Username" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="role" header="Role" sortable />
        <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                icon="pi pi-pencil"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md"
                onClick={() => handleEdit(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                onClick={() => handleDelete(rowData.id)}
              />
            </div>
          )}
        />
      </DataTable>

      {/* Add Dialog */}
      <Dialog
        header="Add User"
        visible={showAddDialog}
        style={{ width: "450px" }}
        modal
        onHide={() => setShowAddDialog(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowAddDialog(false)}
            />
            <Button
              label="Add"
              className="bg-[#04369a] hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
              onClick={handleAddUser}
            />
          </div>
        }
      >
        {renderForm(formData)}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        header="Edit User Role"
        visible={showEditDialog}
        style={{ width: "450px" }}
        modal
        onHide={() => setShowEditDialog(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowEditDialog(false)}
            />
            <Button
              label="Update"
              className="bg-[#04369a] hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
              onClick={handleUpdate}
            />
          </div>
        }
      >
        {editData && renderForm(editData, true)}
      </Dialog>
    </div>
  );
};

export default Users;
