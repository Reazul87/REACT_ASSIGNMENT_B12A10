import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../../Components/ProductCard";

const AllProducts = () => {
  const loads = useLoaderData();
  const [products, setProducts] = useState(loads);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const handleProductSearch = (e) => {
    e.preventDefault();
    const searching = e.target.search.value;
    setLoadingProducts(true);

    fetch(`https://global-nexus-backend.vercel.app/search?name=${searching}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  };

  return (
    <div className="md:w-11/12 mx-auto my-8">
      <title>All Products</title>
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold">All Products Here</h2>
        <p className="text-gray-500 mt-2">Explore All Products.</p>
      </div>

      <form
        onSubmit={handleProductSearch}
        className="mt-8 mb-12 flex justify-center gap-3"
      >
        <label className="input rounded-full flex items-center gap-2 w-64 md:w-80">
          <svg
            className="h-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            name="search"
            placeholder="Search products"
            className="grow"
          />
        </label>

        <button
          type="submit"
          className="btn btn-outline btn-error rounded-full px-8"
          disabled={loadingProducts}
        >
          {loadingProducts ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Search"
          )}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {loadingProducts ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-3xl md:text-4xl font-bold text-blue-400">
              No Products Found
            </p>
            <p className="text-gray-500 mt-2">
              Try searching with different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
