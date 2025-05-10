import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import moment from "moment"; // Import moment
import config from "../../../config"; // Import config



const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get(`${config.host}/api/class/getAllBookings`)
      .then((response) => {
        setBookings(response?.data?.bookings); // Update the state with the data
      })
      .catch((error) => console.log("Error fetching bookings:", error));
  }, []);
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor:'#ff5722',color:'white',textAlign:'center'}}>
              <TableCell sx={{color:'white'}} align="center" >S.No</TableCell>
              <TableCell sx={{color:'white'}} align="center">Class Name</TableCell>
              <TableCell sx={{color:'white'}} align="center">Customer Name</TableCell>
              <TableCell sx={{color:'white'}} align="center">Date</TableCell>
              <TableCell sx={{color:'white'}} align="center">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking,index) => (
                <TableRow   key={booking._id}>
                  <TableCell align="center">{index+1}</TableCell>
                  <TableCell align="center">{booking?.classId?.name}</TableCell>
                  <TableCell align="center">{booking?.userId?.name}</TableCell>
                  <TableCell align="center">
                    {moment(booking.date).format("MMMM Do, YYYY")}
                  </TableCell>
                  <TableCell align="center">{moment(booking.time).format("h:mm A")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No bookings available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminBookings;
