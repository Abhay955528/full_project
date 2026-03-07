import React, { useState } from 'react';
import { useAllDataQuery } from '../services/slice';

export default function Admin() {
  const { data, error, isLoading } = useAllDataQuery();

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notFound, setNotFound] = useState(false);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading data</h2>;

  const handleSearch = () => {
    const foundUser = data?.allItems?.find(
      (user) =>
        user.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundUser) {
      setSelectedUser(foundUser);
      setNotFound(false);
    } else {
      setSelectedUser(null);
      setNotFound(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Search Section */}
      {!selectedUser && (
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Search
          </button>
        </div>
      )}

      {notFound && (
        <p className="text-red-500 mb-4">User not found</p>
      )}

      {/* Show User List */}
      {!selectedUser &&
        data?.allItems?.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className="cursor-pointer mb-4 p-4 border rounded-lg shadow hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">
              {user.name}
            </h2>
          </div>
        ))}

      {/* Show Selected User Items */}
      {selectedUser && (
        <div>
          <button
            onClick={() => {
              setSelectedUser(null);
              setSearchTerm('');
            }}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold mb-4">
            {selectedUser.name}'s Items
          </h2>

          {selectedUser.items?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {selectedUser.items?.map((item) => (
                <div
                  key={item._id}
                  className="border p-3 rounded shadow"
                >
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items found</p>
          )}
        </div>
      )}
    </div>
  );
}