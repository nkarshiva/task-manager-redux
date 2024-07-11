import React from 'react';

const FilterAndSearch = ({ setFilter, setSearch, setSorting, setHighlight }) => {
  return (
    <div className="filter-and-search flex flex-col sm:flex-row gap-x-4 gap-y-4 mb-4">
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by:
        </label>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
          <option value="in a week">In a Week</option>
          <option value="in a month">In a Month</option>
          <option value="in a year">In a Year</option>
        </select>
      </div>
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search:
        </label>
        <input
          type="text"
          onChange={(e) => {
            setHighlight(e.target.value)
            setSearch(e.target.value)
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sort by:
        </label>
        <select
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSorting({ field, order });
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">None</option>
          <option value="dueDate-asc">Due Date Ascending</option>
          <option value="dueDate-desc">Due Date Descending</option>
          <option value="priority-asc">Priority Ascending</option>
          <option value="priority-desc">Priority Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSearch;
