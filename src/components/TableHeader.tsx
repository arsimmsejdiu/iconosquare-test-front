import React from "react";

const TableHeader: React.FC = () => (
  <div className="flex border-b">
    <div className="w-1/3 text-center bg-gray-100 font-semibold p-2">Index</div>
    <div className="w-1/3 text-center bg-gray-50 font-semibold p-2">
      Value 1
    </div>
    <div className="w-1/3 text-center bg-gray-100 font-semibold p-2">
      Value 2
    </div>
  </div>
);

export default TableHeader;
