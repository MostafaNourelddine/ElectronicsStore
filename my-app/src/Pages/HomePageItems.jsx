import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPage,
  setProducts,
  selectPaginatedProducts,
  selectFilteredProducts,
  selectSelf as selectProductsSelf,
} from "../slices/ProductsSlice.js";
import { selectFilteredCategories } from "../slices/CategorySlice.js";
import mockProducts from "../Products.js";
import Item from "../components/Item.jsx";
import { Paginator } from "primereact/paginator";

const HomePageItems = () => {
  const dispatch = useDispatch();

  // --- Products ---
  const allFiltered = useSelector(selectFilteredProducts);
  const { page, perPage, list } = useSelector(selectProductsSelf);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(setProducts(mockProducts));
    }
  }, [dispatch, list.length]);

  // --- Categories from CategorySlice ---
  const categoriesFromSlice = useSelector(selectFilteredCategories);
  const categories = ["All", ...categoriesFromSlice.map((c) => c.name)];

  const [filteredCategory, setFilteredCategory] = useState("All");

  // --- Filter products by selected category ---
  const categoryFiltered = allFiltered.filter(
    (item) => filteredCategory === "All" || item.category === filteredCategory
  );

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const items = categoryFiltered.slice(start, end);

  return (
    <>
      <div>
        <div className="mt-10 text-4xl font-bold text-center">
          Featured Products
        </div>
        <div className="text-center text-gray-500 mt-4 text-lg font-semibold">
          Discover our handpicked selection of premium electronics with
          exclusive deals
        </div>
      </div>

      <div className="flex gap-8 text-xl mt-16 justify-center">
        {categories.map((category) => (
          <div
            key={category}
            className={`cursor-pointer font-semibold hover:text-[#04369a] hover:-translate-y-1 duration-200 ${
              filteredCategory === category
                ? "text-[#04369a] -translate-y-1 border-b-2 border-[#04369a]"
                : ""
            }`}
            onClick={() => setFilteredCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex flex-wrap justify-center gap-6">
          {items.length === 0 ? (
            <p className="text-gray-500 text-lg">No items found</p>
          ) : (
            items.map((product) => (
              <Item
                key={product.id}
                product={product}
                name={product.name}
                price={product.price}
                category={product.category}
                description={product.description}
                image={product.image}
              />
            ))
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Paginator
            first={(page - 1) * perPage}
            rows={perPage}
            totalRecords={categoryFiltered.length}
            onPageChange={(e) => dispatch(setPage(e.page + 1))}
          />
        </div>
      </div>
    </>
  );
};

export default HomePageItems;
