import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [sortKey, setSortKey] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulating asynchronous data fetching
    setTimeout(() => {
      // fake data for 4 columns
      const fakeData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
        category: Math.random() < 0.5 ? "A" : "B",
        email: `user${index + 1}@example.com`,
      }));
      setData(fakeData);
      setLoading(false);
    }, 1000);
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Sorting
  const sortedItems = sortKey
    ? [...currentItems].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1))
    : currentItems;

  // Filtering
  const filteredItems = sortedItems.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortKey(null);
    } else {
      setSortKey(key);
    }
  };

  const handleSelectRow = (id) => {
    const index = selectedRows.indexOf(id);
    if (index === -1) {
      setSelectedRows([...selectedRows, id]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(index, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        style={{ marginBottom: "10px" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="sortable" onClick={() => handleSort("id")}>
                ID
              </th>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("category")}>Category</th>
              <th onClick={() => handleSort("email")}>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleSelectRow(item.id)}
                    checked={selectedRows.includes(item.id)}
                  />
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
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
        >
          Next
        </button>
        <div>
          Selected Row Data:{" "}
          {JSON.stringify(
            selectedRows.map((id) =>
              filteredItems.find((item) => item.id === id)
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
