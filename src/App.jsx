import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    // Simulating asynchronous data fetching
    setTimeout(() => {
      // Fetch your data here
      const fakeData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
        category: Math.random() < 0.5 ? "A" : "B",
        email: `user${index + 1}@example.com`, // Generating random email addresses
      }));
      setData(fakeData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
