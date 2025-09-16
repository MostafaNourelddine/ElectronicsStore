// src/admin/AdminProducts.jsx
import React, { useState, useEffect } from "react";
import notify from "../utils/notify";
import { validateRequired, hasErrors } from "../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import ReusableDataTable from "../components/common/ReusableDataTable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";

import {
  setProducts,
  selectFilteredProducts,
  selectPaginatedProducts,
  setPage,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../slices/ProductsSlice";

// Import category selector
import { selectFilteredCategories } from "../slices/CategorySlice";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectPaginatedProducts);
  const allProducts = useSelector(selectFilteredProducts);
  const { page, perPage } = useSelector((state) => state.products);

  // Get categories from Redux store instead of hardcoded array
  const categoriesFromStore = useSelector(selectFilteredCategories);
  const categories = categoriesFromStore.map((cat) => cat.name); // Extract just the names for dropdown

  // Add & Edit form states
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [editData, setEditData] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const productList = useSelector((state) => state.products.list);

  useEffect(() => {
    if (!productList || productList.length === 0) {
      dispatch(setProducts(productList));
    }
  }, [dispatch, productList.length]);

  // Debug logging
  console.log("Available categories:", categories);
  console.log("Categories from store:", categoriesFromStore);

  const handleChange = (e, field, isEdit = false) => {
    if (isEdit) {
      setEditData((prev) => ({ ...prev, [field]: e.target.value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleAddProduct = () => {
    const { category, name, description, price, image } = formData;

    const nextErrors = validateRequired(formData, [
      "category",
      "name",
      "description",
      "price",
      "image",
    ]);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      notify.error("Please fill all required fields.");
      return;
    }

    if (allProducts.some((p) => p.name === name)) {
      setErrors((prev) => ({ ...prev, name: true }));
      notify.error("Product name must be unique!");
      return;
    }

    const nextId =
      allProducts.length > 0
        ? Math.max(...allProducts.map((p) => p.id)) + 1
        : 1;

    dispatch(
      addProduct({
        id: nextId,
        ...formData,
        price: Number(price),
      })
    );

    setFormData({
      category: "",
      name: "",
      description: "",
      price: "",
      image: "",
    });
    setShowAddDialog(false);
    setErrors({});
    notify.success("Product added successfully");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      notify.success("Product deleted");
    }
  };

  const handleEdit = (product) => {
    setEditData({ ...product });
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    dispatch(
      updateProduct({
        ...allProducts.find((p) => p.id === editData.id), // keep all original fields
        ...editData, // overwrite only the edited fields
        price: Number(editData.price),
      })
    );
    setShowEditDialog(false);
    setEditData(null);
    notify.success("Product updated successfully");
  };

  // Shared form UI
  const renderForm = (data, isEdit = false) => (
    <div className="flex flex-col gap-4 p-2">
      <div>
        <Dropdown
          value={data.category}
          options={categories}
          placeholder={
            categories.length > 0
              ? "Select Category"
              : "No categories available"
          }
          onChange={(e) => handleChange(e, "category", isEdit)}
          className={`w-full border rounded-lg p-2 shadow-sm ${
            !isEdit && errors.category ? "border-red-500" : ""
          }`}
          disabled={categories.length === 0}
        />
        {categories.length === 0 && (
          <small className="text-red-500 mt-1 block">
            No categories available. Please add categories first.
          </small>
        )}
      </div>
      <InputText
        placeholder="Product Name"
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
      <InputText
        placeholder="Price"
        type="number"
        value={data.price}
        onChange={(e) => handleChange(e, "price", isEdit)}
        className={`w-full border rounded-lg p-3 shadow-sm ${
          !isEdit && errors.price ? "border-red-500" : ""
        }`}
      />
      <InputText
        placeholder="Image URL"
        value={data.image}
        onChange={(e) => handleChange(e, "image", isEdit)}
        className={`w-full border rounded-lg p-3 shadow-sm ${
          !isEdit && errors.image ? "border-red-500" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#04369a]">Products</h2>
        <div className="flex gap-2">
          {categories.length === 0 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 rounded mr-2">
              <small>Add categories first to create products</small>
            </div>
          )}
          <Button
            label="Add Product"
            icon="pi pi-plus"
            className="bg-[#04369a] text-white px-5 py-2 rounded-lg shadow-md"
            onClick={() => setShowAddDialog(true)}
            disabled={categories.length === 0}
          />
        </div>
      </div>

      {/* Reusable DataTable */}
      <ReusableDataTable
        data={allProducts}
        paginator
        rows={perPage}
        first={(page - 1) * perPage}
        onPage={(e) => dispatch(setPage(e.page + 1))}
        className="shadow-lg rounded"
        columns={[
          { field: "id", header: "ID", sortable: true },
          { field: "name", header: "Name", sortable: true },
          { field: "description", header: "Description" },
          { field: "category", header: "Category", sortable: true },
          {
            field: "price",
            header: "Price ($)",
            sortable: true,
            body: (rowData) => `$${rowData.price?.toFixed(2) || "0.00"}`,
          },
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
        header="Add Product"
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
              onClick={handleAddProduct}
              disabled={categories.length === 0}
            />
          </div>
        }
      >
        {renderForm(formData)}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        header="Edit Product"
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

export default AdminProducts;
