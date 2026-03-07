import React from "react";
import { useState } from "react";
import { useAddItemMutation, useGetItemQuery } from "../services/slice";
import { NavLink, } from "react-router-dom";
import LogoutButton from "../pages/Logout";

function Dashboard() {
  const [addItem, { isLoading }] = useAddItemMutation();
  const { data } = useGetItemQuery();


  const [searchText, setSearchText] = useState("");
  const [product, setProduct] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")


  const filteredItems = data?.items?.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()));

  const handleRegister = async () => {
    try {
      const response = await addItem({
        product,
        price,
        quantity,
      }).unwrap();
      alert(response.message);
      // 🔥 RESET INPUT FIELDS AFTER SUCCESS // 
      setProduct("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error("Register Error:", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-green-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">My Dashboard</h2>
        <ul className="space-y-4">
          <NavLink to='/home'><li className="hover:bg-green-700 p-2 rounded cursor-pointer">Home</li></NavLink>
          <li className="hover:bg-green-700 p-2 rounded cursor-pointer">Users</li>
          <NavLink to='/settings'><li className="hover:bg-green-700 p-2 rounded cursor-pointer">Settings</li></NavLink>
          <LogoutButton className="hover:bg-green-700 p-2 rounded cursor-pointer">
            Logout
          </LogoutButton>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          {data?.userName && <h1 className="text-3xl font-bold">Welcome, {data.userName} 👋</h1>}
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        {/* {isFetching && <p>Loading...</p>}
           {error && <p>Error loading items</p>}

      {/* Display Filtered Items */}
        <div className="flex flex-row gap-4 mb-10">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg">
                <h2 className="font-semibold">{item.name}</h2>
                <p>₹ {item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">1,250</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">₹45,000</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">320</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex justify-around gap-6">
          <div className="bg-white p-8 rounded-xl shadow max-w-xl h-fit">
            <h2 className="text-xl font-bold mb-6">Add Item</h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Product Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Product Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Product Quantity</label>
              <input
                type="email"
                placeholder="Enter number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-110">
            {data?.items?.length > 0 ? (
              data.items.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow mb-4 h-min">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))
            ) : (
              <p>No items available.</p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;