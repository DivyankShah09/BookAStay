import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Typography } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
    },
    "&:last-child td, &:last-child th": {
        border: 0
    }
}));

function ListingTable({listings}) {

  return (
    <>
     <TableContainer
            sx={{
                minWidth: "0.6vw",
                padding: 5,
                borderRadius: "12px"
            }}
        >
            <Table aria-label="customized table">
                <TableHead className="text-lg">
                    <TableRow>
                        <StyledTableCell align="center">
                            <Typography variant="h5">Hotel Booked</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography variant="h5">Name</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography variant="h5">Amount</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Typography variant="h5">Status</Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listings.map((listing) => (
                        <StyledTableRow key={listing.user_id._id}>
                            <StyledTableCell align="center">
                                <Typography variant="h5">{listing.listing_id.name}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Typography variant="h5">{listing.user_id.firstName}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Typography variant="h5">{listing.user_id.email}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Chip
                                    label={listing.payment_status}
                                    color={listing.payment_status === "success" ? "primary" : "secondary"}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

export default ListingTable