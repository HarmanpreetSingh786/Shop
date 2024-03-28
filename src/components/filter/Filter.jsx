import React, { useContext } from "react";
import myContext from "../../context/myContext";

function Filter() {
  const context = useContext(myContext);
  const {
    mode,
    getAllProduct,
    searchkey,
    setSearchkey,
    filterType,
    setFilterPrice,
    setFilterType,
    filterPrice,
  } = context;

  const resetFilters = () => {
    setFilterType("");
    setFilterPrice("");
  };

  return (
    <div>
      <div className=" container mx-auto px-4 mt-5 ">
        <div
          className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200 shadow-lg hover:shadow-gray-500 shadow-[inset_0_0_2px_rgba(0,0,0,0.9)]cursor-pointer"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-50hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Reset Filter
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <option value="Price">Price</option>
                <option value="all">All</option>
                <option value="500-1000">500 - 1000</option>
                <option value="1000-5000">1000 - 5000</option>
                <option value="5000-10000">5000 - 10000</option>
                <option value="10000-15000">10000 - 15000</option>
                <option value="15000-20000">15000 - 20000</option>
                <option value="above-20000">Above 20000</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
