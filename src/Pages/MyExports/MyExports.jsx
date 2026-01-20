import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import RightDate from "../../Components/RightDate";
import CurrencyChange from "../../Components/CurrencyChange";
import toast from "react-hot-toast";

const MyExports = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState("");
  const [productRating, setProductRating] = useState();
  const [refetch, setRefetch] = useState(false);
  const { user, setLoading, loading } = useContext(AuthContext);
  const modalProduct = useRef();

  useEffect(() => {
    fetch(
      `https://global-nexus-backend.vercel.app/my-exports?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, refetch]);

  const handleExportDelete = (id) => {
    fetch(`https://global-nexus-backend.vercel.app/export-product/${id}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully Deleted");
        setRefetch(!refetch);
        // console.log(data);
      });
  };

  const handleExportUpdate = (id, product) => {
    setProductId(id);
    setSelectedProduct(product);
    modalProduct.current.showModal();
  };

  const handleCloseModal = () => {
    modalProduct.current.close();
    setSelectedProduct(null);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const price = e.target.price.value;
    const country = e.target.country.value;
    const quantity = e.target.quantity.value;
    // const rating = e.target.rating.value;

    const ratingRegex = /^\d+(\.\d{0,1})?$/;

    if (!productRating.trim()) {
      return toast.error("Rating is required");
    }
    if (isNaN(Number(productRating))) {
      return toast.error("Rating must be a valid number");
    }
    if (productRating < 0 || productRating > 5) {
      return toast.error("Rating must be between 0 and 5");
    }
    if (!ratingRegex.test(productRating)) {
      return toast.error(
        "Rating must have at most one decimal place (e.g., 4.6)"
      );
    }

    const updatedProduct = {
      product_name: name,
      product_image: image,
      price: price,
      rating: productRating,
      origin_country: country,
      available_quantity: quantity,
      createdAt: new Date().toISOString(),
      exported_by: user.email,
    };

    try {
      const response = await fetch(
        `https://global-nexus-backend.vercel.app/update-export/${productId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Successfully Updated");
        setRefetch(!refetch);
        handleCloseModal();
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <title>My Exports</title>
      <h2 className="text-center text-xl md:text-3xl font-bold mt-10">
        My Exports
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 my-7">
        {loading ? (
          <span className="loading loading-spinner loading-md text-yellow-400"></span>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
                <div>
                  <img
                    className="h-70 w-full object-cover"
                    src={product.product_image}
                    alt={product.product_name}
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h1 className="block mt-1 text-lg md:text-2xl leading-tight font-extrabold text-gray-900 hover:text-[#FF974D] transition duration-1000">
                    {product.product_name}
                  </h1>
                  <p className="text-lg text-[#FF6F00] md:text-2xl font-bold mt-2">
                    {CurrencyChange(product.price)}
                  </p>

                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="mt-1 flex justify-between gap-4 text-sm">
                      <div className="flex items-center space-x-1 text-gray-700">
                        <HiOutlineMapPin size={17} />
                        <span className="font-medium">
                          {product.origin_country}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {product.rating > 4.7 ? (
                          <FaStar className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <FaStarHalf className="w-5 h-5 text-yellow-400" />
                        )}
                        <span className="ml-1 text-sm font-semibold text-gray-700">
                          ({product.rating})
                        </span>
                      </div>
                    </div>

                    <div className=" text-gray-600 mt-1">
                      Imported Quantity : {product.available_quantity}
                    </div>
                    <div className="text-xs text-gray-500 italic mt-1.5">
                      At: {RightDate(product.createdAt)}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <button
                      onClick={() => handleExportUpdate(product._id, product)}
                      className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExportDelete(product._id)}
                      className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
                    >
                      Delete
                    </button>
                    <dialog
                      ref={modalProduct}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <form onSubmit={handleUpdateProduct}>
                          <fieldset className="fieldset">
                            <label className="label font-bold text-black/70">
                              Product Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              defaultValue={selectedProduct?.product_name || ""}
                              className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                              placeholder="Product Name"
                            />
                            <label className="label font-bold text-black/70">
                              Product Image
                            </label>
                            <input
                              type="text"
                              name="image"
                              defaultValue={
                                selectedProduct?.product_image || ""
                              }
                              className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                              placeholder="Product Image Url"
                            />
                            <label className="label font-bold text-black/70">
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              defaultValue={selectedProduct?.price || ""}
                              className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                              placeholder="Product Price"
                            />
                            <label className="label font-bold text-black/70">
                              Origin Country
                            </label>
                            <input
                              type="text"
                              name="country"
                              defaultValue={
                                selectedProduct?.origin_country || ""
                              }
                              className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                              placeholder="Origin Country"
                            />
                            <label className="label font-bold text-black/70">
                              Rating
                            </label>
                            <input
                              type="number"
                              name="rating"
                              value={productRating}
                              onChange={(e) => setProductRating(e.target.value)}
                              defaultValue={selectedProduct?.rating || ""}
                              className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                              placeholder="Rating (e.g., 4.6)"
                            />
                            <label className="label font-bold text-black/70">
                              Available Quantity
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              defaultValue={
                                selectedProduct?.available_quantity || ""
                              }
                              className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                              placeholder="Available Quantity"
                            />
                            <div className="flex justify-between items-center mt-4">
                              <button
                                type="button"
                                onClick={handleCloseModal}
                                className="btn"
                              >
                                Close
                              </button>
                              <button
                                type="submit"
                                className="btn mt-4 text-white rounded-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] hover:from-[#FF6F00] hover:to-[#FF974D]"
                              >
                                Submit
                              </button>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">
              You have not exported any products yet.
            </p>
            <p className="text-gray-500 mt-2">
              Add a product to get started with global exports!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExports;
