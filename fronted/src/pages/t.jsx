import React from 'react';
import { useAllDataQuery } from '../services/slice';

export default function Admin() {
  const { data, error, isLoading } = useAllDataQuery();
  console.log(data);


  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading data</h2>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {data?.allItems?.map((user, index) => (
        <div key={index} className="mb-6 border p-4 rounded-lg shadow">

          {/* User Name */}
          <h2 className="text-xl font-bold mb-3">
            User: {user.name}
          </h2>

          {/* User Items */}
          {user.user_items?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {user.user_items.map((item) => (
                <div
                  key={item.id}
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
      ))}
    </div>
  );
}

