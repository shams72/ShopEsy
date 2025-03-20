import React from "react";
import { ShoppingList } from "../../../../../types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface listProps {
  list?: ShoppingList | null;
}

//componen to view the list-name,desc and all items in a table
const ResultsTable: React.FC<listProps> = ({ list }) => {
  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, marginTop: 2 }}
      >
        <Typography
          align="center"
          variant="h6"
          sx={{ marginBottom: 2, fontWeight: 700, color: "#333" }}
        >
          Items List
        </Typography>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Description
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.items && list.items.length > 0 ? (
              list.items.map((item, itemIndex) => (
                <TableRow
                  key={itemIndex}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <TableCell align="center" sx={{ padding: "12px" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "12px" }}>
                    {item.description}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "12px" }}>
                    {item.amount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ padding: "20px", color: "#777" }}
                >
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ResultsTable;
