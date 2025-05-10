import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from "../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";

const Transactions = () => {
  const { orders, planorders, host,imagePath } = useContext(AuthContext);
  
  const [tabValue, setTabValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  useEffect(() => {
    if (tabValue === 0) {
      setTransactions(orders);
    } else if (tabValue === 1) {
      setTransactions(planorders);
    }
  }, [orders, planorders, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleDelete = (id, type) => {
    const apiEndpoint = type === "Order" ? "deleteorder" : "deleteplanorder";
    axios.delete(`${host}/api/order/${apiEndpoint}/${id}`)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          const filteredTransactions = transactions.filter((transaction) => transaction._id !== id);
          setTransactions(filteredTransactions);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  const handleSingleView = (transaction) => {
    setCurrentTransaction(transaction);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTransaction(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Manage Transaction Details
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Order Transactions" />
        <Tab label="Plan Order Transactions" />
      </Tabs>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ff5722', color: 'white', textAlign: 'center' }}>
              <TableCell align="center" sx={{ color: 'white' }}>S.No</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Transaction ID</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Member Name</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Type</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Amount</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Date</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction, index) => (
                  <TableRow key={transaction._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{transaction.transactionId}</TableCell>
                    <TableCell align="center">{transaction.user?.name || transaction.user?.email}</TableCell>
                    <TableCell align="center">{tabValue === 0 ? "Order" : "Plan Order"}</TableCell>
                    <TableCell align="center">₹{tabValue === 0 ? transaction.totalamount : transaction.plan?.price}</TableCell>
                    <TableCell align="center">{transaction.createdAt.split("T")[0]}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleSingleView(transaction)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(transaction._id, tabValue === 0 ? "Order" : "Plan Order")}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {currentTransaction && (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {tabValue === 0 ? "Order Details" : "Plan Order Details"}
          </DialogTitle>
          <DialogContent>
            {tabValue === 0 ? (
              <>
                <Typography variant="body1"><strong>Transaction ID:</strong> {currentTransaction.transactionId}</Typography>
                <Typography variant="body1"><strong>Member Name:</strong> {currentTransaction.user.name}</Typography>
                <Typography variant="body1"><strong>Customer Name:</strong> {currentTransaction.user.name}</Typography>
                <Typography variant="body1"><strong>Total Amount:</strong> ₹{currentTransaction.totalamount}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {currentTransaction.createdAt.split("T")[0]}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {currentTransaction.address}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {currentTransaction.phone}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {currentTransaction.email}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {currentTransaction.country}</Typography>
                <Typography variant="body1"><strong>Zipcode:</strong> {currentTransaction.zipcode}</Typography>
                
                <Typography variant="h6" sx={{ mt: 2 }}>Products:</Typography>
                {currentTransaction.products.map((product) => (
                  <Card key={product._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, objectFit: 'cover' }}
                      image={`${imagePath}/${product?.image}`}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2"><strong>Price:</strong> {product.price}</Typography>
                      <Typography variant="body2"><strong>Quantity:</strong> {product.quantity}</Typography>
                      <Typography variant="body2"><strong>Total:</strong> {product.total}</Typography>
                    </CardContent>
                  </Card>
                ))}
                <Typography variant="h6" sx={{ mt: 2 }}>Total:  ₹{currentTransaction.totalamount} </Typography>


              </>
            ) : (
              <>
                <Typography variant="body1"><strong>Transaction ID:</strong> {currentTransaction.transactionId}</Typography>
                <Typography variant="body1"><strong>Member Name:</strong> {currentTransaction.name}</Typography>
                <Typography variant="body1"><strong>Customer Name:</strong> {currentTransaction.user.name}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {currentTransaction.createdAt.split("T")[0]}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {currentTransaction.address}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {currentTransaction.phone}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {currentTransaction.email}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {currentTransaction.country}</Typography>
                
                <Typography variant="h6" sx={{ mt: 2 }}>Plan Details:</Typography>
                <Typography variant="body1"><strong>Plan Name:</strong> {currentTransaction.plan.name}</Typography>
                <Typography variant="body1"><strong>Plan Price:</strong> ₹{currentTransaction.plan.price}</Typography>
                <Typography variant="body1"><strong>Plan Validity:</strong> {currentTransaction.plan.validity}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Transactions;
