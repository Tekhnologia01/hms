import React from "react";

const CommonTable = ({
    title,
    headers,      // Array of header labels
    bodyData,     // Array of row data
    currentPage,  // Current Page Number
    totalPages,   // Total Page Count
    onPageChange, // Function to Handle Page Change
    renderRow,    // Function to render each row
    minimumWidth
}) => {
    return (
        <div className="border rounded-2">
            <div className="px-4 py-2 fs-5 fw-semibold border-bottom">{title}</div>
            <div style={{ overflowX: "auto" }}>
                <table
                    className="bordered w-100"
                    style={{
                        tableLayout: "fixed", // Ensures fixed column width
                        minWidth: minimumWidth, // Set your desired minimum width
                    }}>
                    <thead>
                        <tr className="border-bottom" style={{ backgroundColor: "#eef1f5", color: "#5c5f61"}}>
                            {headers?.map((header) => (
                                <th key={header.accessor} className={header.class} style={{width: header.width}} >
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyData?.map((item, index) => renderRow(item, index))}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Common Component) */}
            {/* {totalPages > 1 && <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />} */}
        </div>
    );
};

export default CommonTable;