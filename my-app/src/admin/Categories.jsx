// src/admin/AdminCategories.jsx
import React, { useState, useEffect } from "react";
import notify from "../utils/notify";
import { validateRequired, hasErrors } from "../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import ReusableDataTable from "../components/common/ReusableDataTable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";

import {
  setCategories,
  selectFilteredCategories,
  selectPaginatedCategories,
  setPage,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../slices/CategorySlice";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectPaginatedCategories);
  const allCategories = useSelector(selectFilteredCategories);
  const { page, perPage } = useSelector((state) => state.categories);

  // Add & Edit form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [editData, setEditData] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const categoryList = useSelector((state) => state.categories.list);

  useEffect(() => {
    if (!categoryList || categoryList.length === 0) {
      dispatch(setCategories(allCategories));
    }
  }, [dispatch, categoryList.length, allCategories]);

  const handleChange = (e, field, isEdit = false) => {
    if (isEdit) {
      setEditData((prev) => ({ ...prev, [field]: e.target.value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleAddCategory = () => {
    const { name, description } = formData;

    const nextErrors = validateRequired(formData, ["name", "description"]);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      notify.error("Please fill all required fields.");
      return;
    }

    if (allCategories.some((c) => c.name === name)) {
      setErrors((prev) => ({ ...prev, name: true }));
      notify.error("Category name must be unique!");
      return;
    }

    const nextId =
      allCategories.length > 0
        ? Math.max(...allCategories.map((c) => c.id)) + 1
        : 1;

    dispatch(
      addCategory({
        id: nextId,
        ...formData,
      })
    );

    setFormData({ name: "", description: "" });
    setShowAddDialog(false);
    setErrors({});
    notify.success("Category added successfully");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
      notify.success("Category deleted");
    }
  };

  const handleEdit = (category) => {
    setEditData({ ...category });
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    dispatch(
      updateCategory({
        ...allCategories.find((c) => c.id === editData.id),
        ...editData,
      })
    );
    setShowEditDialog(false);
    setEditData(null);
  };

  // Shared form UI
  const renderForm = (data, isEdit = false) => (
    <div className="flex flex-col gap-4 p-2">
      <InputText
        placeholder="Category Name"
        value={data.name}
        onChange={(e) => handleChange(e, "name", isEdit)}
        className={`w-full border rounded-lg p-3 shadow-sm ${
          !isEdit && errors.name ? "border-red-500" : ""
        }`}
      />
      <InputText
        placeholder="Description"
        value={data.description}
        onChange={(e) => handleChange(e, "description", isEdit)}
        className={`w-full border rounded-lg p-3 shadow-sm ${
          !isEdit && errors.description ? "border-red-500" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#04369a]">Categories</h2>
        <Button
          label="Add Category"
          icon="pi pi-plus"
          className="bg-[#04369a] text-white px-5 py-2 rounded-lg shadow-md"
          onClick={() => setShowAddDialog(true)}
        />
      </div>

      <ReusableDataTable
        data={allCategories}
        paginator
        rows={perPage}
        first={(page - 1) * perPage}
        onPage={(e) => dispatch(setPage(e.page + 1))}
        className="shadow-lg rounded"
        columns={[
          { field: "id", header: "ID", sortable: true },
          { field: "name", header: "Name", sortable: true },
          { field: "description", header: "Description" },
          {
            header: "Actions",
            body: (rowData) => (
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
            ),
          },
        ]}
      />

      {/* Add Dialog */}
      <Dialog
        header="Add Category"
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
              onClick={handleAddCategory}
            />
          </div>
        }
      >
        {renderForm(formData)}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        header="Edit Category"
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

export default AdminCategories;
