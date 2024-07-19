import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1E88E5',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));
  
  export default function CustomerTable(props) {
    return (
      <TableContainer style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
        {props.savedCustomer.length> 0 ? (
        <Table sx={{ minWidth: 500, maxWidth: '90%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">City/Country</StyledTableCell>
              <StyledTableCell align="right">Edit Row</StyledTableCell>
              <StyledTableCell align="right">Delete Row</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.savedCustomer.map((customer, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="right">{customer.FirstName}</StyledTableCell>
                <StyledTableCell align="right">{customer.LastName}</StyledTableCell>
                <StyledTableCell align="right">{customer.Age}</StyledTableCell>
                <StyledTableCell align="right">{customer.Country}</StyledTableCell>
                <td> 
                    <Button variant="contained" onClick={() => props.handleUpdateCustomer(customer)}>Edit</Button>
                </td>
                <td> 
                    <Button variant="contained" onClick={() => props.handleDelete(customer.id)}>Delete</Button>
                </td>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>) : (
            <p>No data</p>
          )}
      </TableContainer>
    );
  }