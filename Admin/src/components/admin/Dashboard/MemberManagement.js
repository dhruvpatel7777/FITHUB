import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  MenuItem,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import config from "../../../config";
import { deepOrange } from "@mui/material/colors";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, [tabValue]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${config.host}/api/members`);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${config.host}/api/plans/getPlans`);
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (member = null) => {
    setIsEditing(!!member);
    setCurrentMember(member || {});
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubscriptionChange = (event) => {
    const selectedPlan = plans.find(plan => plan._id === event.target.value);
    setCurrentMember((prev) => ({ ...prev, subscription: selectedPlan }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentMember.name) newErrors.name = "Name is required";
    if (!currentMember.email) newErrors.email = "Email is required";
    if (!currentMember.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(currentMember.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!currentMember.age) newErrors.age = "Age is required";
    if (!currentMember.address) newErrors.address = "Address is required";
    if (!currentMember.subscription) newErrors.subscription = "Subscription is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `${config.host}/api/members/${currentMember._id}`,
          currentMember
        );
        if (response.data.success) {
          toast.success("Member updated successfully!");
        } else {
          toast.error("Error updating member: " + response.data.message);
        }
      } else {
        let data = {
          ...currentMember,
          status: "Offline",
        };
        response = await axios.post(`${config.host}/api/members/add`, data);
        if (response.data.success) {
          toast.success("Member added successfully!");
        } else {
          toast.error("Error adding member: " + response.data.message);
        }
      }
      fetchMembers();
      handleCloseDialog();
    } catch (error) {
      toast.error("Error saving member: " + error.message);
      console.error("Error saving member:", error);
    }
  };

  const handleDelete = async (memberId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this member",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#635bff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${config.host}/api/members/${memberId}`);
          if (response?.data?.success) {
            toast.success(response?.data?.message);
            fetchMembers();
          } else {
            toast.error(response?.data?.message);
          }
        } catch (error) {
          console.error("Error deleting member:", error);
        }
      }
    });
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }} gutterBottom>
        Member Management
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Members" />
          <Tab label="Search Members" />
        </Tabs>
      </Box>

      {tabValue === 1 && (
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2, bgcolor: deepOrange[500] }}
      >
        Add Member
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "S.No",
                "Name",
                "Email",
                "Phone",
                "Age",
                "Address",
                "Subscription",
                "Status",
                "Actions",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  align="center"
                  sx={{
                    bgcolor: deepOrange[500],
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member,index) => (
                  <TableRow key={member._id}>
                    <TableCell align="center">{index+1}</TableCell>
                    <TableCell align="center">{member.name || "N/A"}</TableCell>
                    <TableCell align="center">{member.email || "N/A"}</TableCell>
                    <TableCell align="center">{member.phone || "N/A"}</TableCell>
                    <TableCell align="center">{member.age || "N/A"}</TableCell>
                    <TableCell align="center">{member.address || "N/A"}</TableCell>
                    <TableCell align="center">
                      {member.subscription?.name || "N/A"}
                    </TableCell>
                    <TableCell align="center">{member.status || "N/A"}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleOpenDialog(member)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(member._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredMembers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Member" : "Add Member"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentMember.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={currentMember.email || ""}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={currentMember.phone || ""}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={currentMember.age || ""}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={currentMember.address || ""}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            select
            margin="dense"
            name="subscription"
            label="Subscription Plan"
            fullWidth
            variant="outlined"
            value={currentMember.subscription?._id || ""}
            onChange={handleSubscriptionChange}
            error={!!errors.subscription}
            helperText={errors.subscription}
          >
            {plans.map((plan) => (
              <MenuItem key={plan._id} value={plan._id}>
                {plan.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MemberManagement;
