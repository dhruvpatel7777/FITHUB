// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// const Orders = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [open, setOpen] = useState(false);
//   const [editTransaction, setEditTransaction] = useState(null);

//   useEffect(() => {
//     // Adding dummy transactions for demonstration
//     const dummyTransactions = [
//       {
//         id: 1,
//         memberName: "John Doe",
//         type: "Membership",
//         amount: 3000,
//         date: "2024-06-30",
//       },
//       {
//         id: 2,
//         memberName: "Jane Smith",
//         type: "Class Fee",
//         amount: 1000,
//         date: "2024-07-01",
//       },
//     ];
//     setTransactions(dummyTransactions);
//   }, []);

//   const handleOpen = (transaction) => {
//     setEditTransaction(transaction);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditTransaction(null);
//   };

//   const handleDelete = (id) => {
//     setTransactions(
//       transactions.filter((transaction) => transaction.id !== id)
//     );
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleSave = () => {
//     // Update transaction logic
//     setTransactions(
//       transactions.map((transaction) =>
//         transaction.id === editTransaction.id ? editTransaction : transaction
//       )
//     );
//     handleClose();
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography
//         variant="h4"
//         sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
//       >
//         {/* Manage Transaction Details */}
//         Order Details
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Transaction ID</TableCell>
//               <TableCell>Member Name</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {transactions
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell>{transaction.id}</TableCell>
//                   <TableCell>{transaction.memberName}</TableCell>
//                   <TableCell>{transaction.type}</TableCell>
//                   <TableCell>{transaction.amount}</TableCell>
//                   <TableCell>{transaction.date}</TableCell>
//                   <TableCell align="right">
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleOpen(transaction)}
//                     >
//                       <Edit />
//                     </IconButton>
//                     <IconButton
//                       color="secondary"
//                       onClick={() => handleDelete(transaction.id)}
//                     >
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={transactions.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Edit Transaction</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Transaction ID"
//             type="text"
//             fullWidth
//             value={editTransaction?.id || ""}
//             disabled
//           />
//           <TextField
//             margin="dense"
//             label="Member Name"
//             type="text"
//             fullWidth
//             value={editTransaction?.memberName || ""}
//             onChange={(e) =>
//               setEditTransaction({
//                 ...editTransaction,
//                 memberName: e.target.value,
//               })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Type"
//             type="text"
//             fullWidth
//             value={editTransaction?.type || ""}
//             onChange={(e) =>
//               setEditTransaction({ ...editTransaction, type: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Amount"
//             type="number"
//             fullWidth
//             value={editTransaction?.amount || ""}
//             onChange={(e) =>
//               setEditTransaction({ ...editTransaction, amount: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={editTransaction?.date || ""}
//             onChange={(e) =>
//               setEditTransaction({ ...editTransaction, date: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Orders;



import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Box,
  TableRow,
  TableCell as MuiTableCell,
  Divider,
} from '@mui/material';
import { Person, Home, Phone, Image } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../GlobalContext';
import moment from 'moment';
import { useLocation } from 'react-router-dom';


// Styled components for TableCell and TableRow
const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
  [`&.${MuiTableCell.head}`]: {
    backgroundColor: 'rgb(134, 124, 103)', // Custom background color for the header
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontSize: '0.875rem',
    textAlign: 'center',
  },
  [`&.${MuiTableCell.body}`]: {
    fontSize: '0.875rem',
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SingleUserOrderDetail = () => {
  const { orders, imagePath } = useContext(AuthContext);
  console.log(orders,'orders');
  const location = useLocation();
  const user = location.state?.user; // Retrieve userId from state safely
  const [singleUserOrders, setSingleUserOrders] = useState([]);

  // useEffect(() => {
  //   if (user && orders) {
  //     const filteredOrders = orders.filter(order => order.user._id === user?._id);
  //     setSingleUserOrders(filteredOrders);
  //   }
  // }, [user, orders]); // Add userId and orders as dependencies

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="left" sx={{ fontWeight: 'bold', mb: 4 }}>
        {user?.name}'s Orders
        <Divider />
      </Typography>

      {singleUserOrders.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ fontStyle: 'italic' }}>
          {user?.name} Did not Order Anything
        </Typography>
      ) : (
        singleUserOrders.map((order) => (
          <Box
            key={order._id}
            sx={{ mb: 3, border: '1px solid #ddd', borderRadius: 2, p: 3, boxShadow: 2, backgroundColor: '#f9f9f9' }}
          >
            <Box sx={{ mb: 4 }}>
              <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{order.name ?? 'N/A'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Home sx={{ mr: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{order.address ?? 'N/A'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{order.phone ?? 'N/A'}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Date:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Order-Id:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{order._id}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total Amount:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>₹{order.totalamount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Payment Method:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{order.method}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Transaction Id:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{order?.transactionId}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Products
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell sx={{ backgroundColor: 'rgb(134 124 103)' }}><Image /> Image</StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: 'rgb(134 124 103)' }}>Name</StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: 'rgb(134 124 103)' }}>Price</StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: 'rgb(134 124 103)' }}>Quantity</StyledTableCell>
                    <StyledTableCell sx={{ backgroundColor: 'rgb(134 124 103)' }}>Total</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {order.products.length === 0 ? (
                    <StyledTableRow>
                      <StyledTableCell colSpan={5} align="center">
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>No products in this order</Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    order.products.map((product) => (
                      <StyledTableRow key={product._id}>
                        <StyledTableCell>
                          <img
                            src={`${imagePath}/${product?.image[0]}`} // Displaying the first image
                            alt={product?.name}
                            style={{ width: 50, height: 50 }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="body1">{product?.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="body1">₹{product?.price}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="body1">{product?.quantity}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography variant="body1">₹{product?.total}</Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            {order?.feedback && (
              <Box sx={{ my: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Feedback:</Typography>
                <Typography variant="body1" sx={{ ml: 1 }}>{order?.feedback ?? 'N/A'}</Typography>
              </Box>
            )}
          </Box>
        ))
      )}
    </Container>
  );
};

export default SingleUserOrderDetail;
