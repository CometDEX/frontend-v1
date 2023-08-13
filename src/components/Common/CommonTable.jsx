import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InlineLoader from "./InlineLoader";
import { useRouter } from "next/router";

const CommonTable = ({ isLoading = false, headers, items, noItemFoundMessage, headerStyles }) => {
  const router = useRouter();
  return (
    <TableContainer sx={{ borderRadius: ".5rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((item, i) => {
              return (
                <TableCell
                  align={item.align ? item.align : "left"}
                  sx={{
                    borderBottom: "1px solid #0F172A",
                    backgroundColor: "#162031",
                    ...headerStyles,
                  }}
                  key={`${item.columnTitle}-${i}`}
                >
                  {item.columnTitle}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && items.length < 1 ? (
            <TableCell colSpan={headers.length}>
              <InlineLoader />
            </TableCell>
          ) : items && items.length ? (
            items.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    backgroundColor: "#162031",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#1E293B !important",
                    },
                  }}
                >
                  {headers.map((header, j) => {
                    return (
                      <TableCell
                        sx={{ borderBottom: "none", padding: "20px 12px" }}
                        align={header.align ? header.align : "left"}
                        key={`${index}-${j}`}
                      >
                        {header.buildCell ? header.buildCell(item) : "N/A"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow
              hover
              sx={{
                backgroundColor: "#162031",
                "&:hover": {
                  backgroundColor: "#1E293B !important",
                },
              }}
            >
              <TableCell sx={{ borderBottom: "none", padding: "20px 12px" }} colSpan={headers.length}>
                {noItemFoundMessage ?? "No item found!"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableBody>
          <TableRow hover role="checkbox" tabIndex={-1}>
            {items.map((column, i) => {
              return <TableCell key={i}>Hi</TableCell>;
            })}
          </TableRow>
        </TableBody> */}
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
