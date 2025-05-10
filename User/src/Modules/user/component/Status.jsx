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
    TablePagination,
    Tabs,
    Button,
    Tab,
    ThemeProvider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import moment from "moment";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./GlobalContext";
import theme from "./theme";
import Header from "./Header";
import Footer from "./Footer";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabPanel = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        )}
    </div>
);

const Status = () => {
    const { host, imagePath } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [membershipPlans, setMembershipPlans] = useState([]);
    const [orders, setOrders] = useState([]);
    const [planorder, setPlanOrder] = useState([]);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // States for dialogs and selected items
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openPlanDialog, setOpenPlanDialog] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [openClassDialog, setOpenClassDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedplanOrder, setSelectedplanOrder] = useState(null);
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [openplanOrderDialog, setOpenplanOrderDialog] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        axios.get(`${host}/api/class/singleuserbookclass`, {
            headers: { "auth-token": token },
        })
            .then((response) => {
                const responseData = response.data;
                if (responseData.success) {
                    setClasses(responseData.bookedClasses);
                    toast.success(responseData.message);
                } else {
                    toast.error(responseData.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching booked classes:", error);
                toast.error("An error occurred while fetching booked classes");
            });
    }, [host]);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        axios.get(`${host}/api/members/membersPlan`, {
            headers: { "auth-token": token },
        })
            .then((response) => {
                const responseData = response.data;
                if (responseData.success) {
                    setMembershipPlans(responseData?.members);
                    toast.success(responseData.message);
                } else {
                    toast.error(responseData.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching joined plans:", error);
                toast.error("An error occurred while fetching joined plans");
            });
    }, [host]);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        axios.get(`${host}/api/order/getordersById`, {
            headers: { "auth-token": token },
        })
            .then((response) => {
                const responseData = response.data;
                if (responseData.status) {
                    setOrders(responseData.orders);
                    toast.success(responseData.message);
                } else {
                    toast.error(responseData.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                toast.error("An error occurred while fetching orders");
            });


            axios.get(`${host}/api/order/getplanordersById`, {
                headers: { "auth-token": token },
            })
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.status) {
                        setPlanOrder(responseData.planorder);
                        toast.success(responseData.message);
                    } else {
                        toast.error(responseData.message);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                    toast.error("An error occurred while fetching orders");
                });
    }, [host]);

    const ValidityCell = (plan) => {
        const durationMonths = plan?.subscription?.validity ? parseInt(plan?.subscription?.validity.split('_')[0], 10) : 0;
        if (!plan?.createdAt || !durationMonths) {
            return <TableCell>Invalid plan data</TableCell>;
        }
        const creationDate = moment(plan?.createdAt);
        const expirationDate = creationDate.add(durationMonths, 'months');
        const now = moment();
        const remainingMonths = expirationDate.diff(now, 'months');
        const remainingDays = expirationDate.diff(now, 'days') % 30;

        let status;
        if (remainingMonths > 0) {
            status = `${remainingMonths} months ${remainingDays} days remaining`;
        } else if (remainingDays > 0) {
            status = `${remainingDays} days remaining`;
        } else {
            status = 'Expired';
        }

        return <TableCell>{status}</TableCell>;
    };

    const handleOpenPlanDialog = (plan) => {
        setSelectedPlan(plan);
        setOpenPlanDialog(true);
    };

    const handleClosePlanDialog = () => {
        setOpenPlanDialog(false);
        setSelectedPlan(null);
    };

    const handleOpenClassDialog = (classItem) => {
        setSelectedClass(classItem);
        setOpenClassDialog(true);
    };

    const handleCloseClassDialog = () => {
        setOpenClassDialog(false);
        setSelectedClass(null);
    };

    const handleOpenOrderDialog = (order) => {
        setSelectedOrder(order);
        setOpenOrderDialog(true);
    };

    const handleCloseOrderDialog = () => {
        setOpenOrderDialog(false);
        setSelectedOrder(null);
    };




    const handleOpenPlanOrderDialog = (order) => {
        setSelectedplanOrder(order);
        setOpenplanOrderDialog(true);
    };

    const handleClosePlanOrderDialog = () => {
        setOpenplanOrderDialog(false);
        setSelectedplanOrder(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Box
                sx={{
                    position: "relative",
                    minHeight: "300px",
                    backgroundImage: "url(/assets/images/hero-background.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    py: 8,
                    mb: 4,
                    "::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    },
                    zIndex: 2,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                        color: "white",
                        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
                        mb: 2,
                        fontWeight: 700,
                        fontSize: { xs: "2rem", md: "3rem" },
                        zIndex: 3,
                    }}
                >
                    Status
                </Typography>
                <Typography variant="h5" 
                sx={{ mt: 1, color: "white", 
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
                mb: 2
                }}
                >
                    View and manage your memberships, classes, and orders.
                </Typography>
            </Box>

            <Box sx={{ padding: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Membership Plans" {...a11yProps(0)} />
                        <Tab label="Booked Classes" {...a11yProps(1)} />
                        <Tab label="Order Details" {...a11yProps(2)} />
                        <Tab label="Plan Order" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <Typography
                        variant="h4"
                        sx={{ mb: 3, fontWeight: "bold", padding: 1 }}
                    >
                        Membership Plans
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Plan Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Joined</TableCell>
                                    <TableCell>Validity</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {membershipPlans.map((plan, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{plan?.subscription?.name || 'N/A'}</TableCell>
                                        <TableCell> ₹{plan?.subscription?.price || 'N/A'}</TableCell>
                                        <TableCell>{moment(plan?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                        <ValidityCell {...plan} />
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenPlanDialog(plan)}
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={membershipPlans.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                    {/* Dialog for viewing plan details */}
                    <Dialog open={openPlanDialog} onClose={handleClosePlanDialog} maxWidth="md" fullWidth>
                        <DialogTitle>Plan Details</DialogTitle>
                        <DialogContent>
                            <Typography variant="h6" gutterBottom>
                                Plan Name: {selectedPlan?.subscription?.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Price:  ₹{selectedPlan?.subscription?.price}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Validity: {selectedPlan?.subscription?.validity}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Joined On: {moment(selectedPlan?.createdAt).format('YYYY-MM-DD')}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosePlanDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Typography
                        variant="h4"
                        sx={{ mb: 3, fontWeight: "bold", padding: 1 }}
                    >
                        Booked Classes
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Class Name</TableCell>
                                    <TableCell>Booked On</TableCell>
                                    <TableCell>Instructor</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {classes?.map((classItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{classItem?.classId?.name || 'N/A'}</TableCell>
                                        <TableCell>{moment(classItem?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell>{classItem?.classId?.instructor || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenClassDialog(classItem)}
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={classes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                    {/* Dialog for viewing class details */}
                    <Dialog open={openClassDialog} onClose={handleCloseClassDialog} maxWidth="md" fullWidth>
                        <DialogTitle>Class Details</DialogTitle>
                        <DialogContent>
                            <Typography variant="h6" gutterBottom>
                                Class Name: {selectedClass?.classId?.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Instructor: {selectedClass?.classId?.instructor}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Booked On: {moment(selectedClass?.createdAt).format('YYYY-MM-DD')}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseClassDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <Typography
                        variant="h4"
                        sx={{ mb: 3, fontWeight: "bold", padding: 1 }}
                    >
                        Order Details
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{order?._id || 'N/A'}</TableCell>
                                        <TableCell>{order?.transactionId || 'N/A'}</TableCell>
                                        <TableCell>{moment(order?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell> ₹{order?.totalamount || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenOrderDialog(order)}
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={orders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>

                    {/* Dialog for viewing order details */}
                    <Dialog open={openOrderDialog} onClose={handleCloseOrderDialog} maxWidth="md" fullWidth>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogContent>
                            <>
                                <Typography variant="body1"><strong>Transaction ID:</strong> {selectedOrder?.transactionId}</Typography>
                                <Typography variant="body1"><strong>Member Name:</strong> {selectedOrder?.user?.name}</Typography>
                                <Typography variant="body1"><strong>Customer Name:</strong> {selectedOrder?.user?.name}</Typography>
                                <Typography variant="body1"><strong>Total Amount:</strong> ₹{selectedOrder?.totalamount}</Typography>
                                <Typography variant="body1"><strong>Date:</strong> {selectedOrder?.createdAt.split("T")[0]}</Typography>
                                <Typography variant="body1"><strong>Address:</strong> {selectedOrder?.address}</Typography>
                                <Typography variant="body1"><strong>Phone:</strong> {selectedOrder?.phone}</Typography>
                                <Typography variant="body1"><strong>Email:</strong> {selectedOrder?.email}</Typography>
                                <Typography variant="body1"><strong>Country:</strong> {selectedOrder?.country}</Typography>
                                <Typography variant="body1"><strong>Zipcode:</strong> {selectedOrder?.zipcode}</Typography>

                                <Typography variant="h6" sx={{ mt: 2 }}>Products:</Typography>
                                {selectedOrder?.products.map((product) => (
                                    <Card key={product._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100, objectFit: 'cover' }}
                                            image={`${imagePath}/${product?.image}`}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography variant="body2"><strong>Price:</strong>  ₹{product.price}</Typography>
                                            <Typography variant="body2"><strong>Quantity:</strong> {product.quantity}</Typography>
                                            <Typography variant="body2"><strong>Total:</strong> {product.total}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                                <Typography variant="h6" sx={{ mt: 2 }}>Total:  ₹{selectedOrder?.totalamount} </Typography>


                            </>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseOrderDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TabPanel>


                <TabPanel value={value} index={3}>
                    <Typography
                        variant="h4"
                        sx={{ mb: 3, fontWeight: "bold", padding: 1 }}
                    >
                        Plan Order
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Plan Order Id</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Plan Price</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {planorder?.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{order?._id || 'N/A'}</TableCell>
                                        <TableCell>{moment(order?.createdAt).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell> ₹{order?.plan?.price || 'N/A'}</TableCell>
                                        <TableCell>{"Online"}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleOpenPlanOrderDialog(order)}
                                            >
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={orders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                    
                    {/* Dialog for viewing order details */}
                    <Dialog open={openplanOrderDialog} onClose={handleClosePlanOrderDialog} maxWidth="md" fullWidth>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogContent>
                           <>
                           <Typography variant="body1"><strong>Transaction ID:</strong> {selectedplanOrder?.transactionId}</Typography>
                <Typography variant="body1"><strong>Member Name:</strong> {selectedplanOrder?.name}</Typography>
                <Typography variant="body1"><strong>Customer Name:</strong> {selectedplanOrder?.user?.name}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {selectedplanOrder?.createdAt.split("T")[0]}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {selectedplanOrder?.address}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {selectedplanOrder?.phone}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {selectedplanOrder?.email}</Typography>
                <Typography variant="body1"><strong>Country:</strong> {selectedplanOrder?.country}</Typography>
                
                <Typography variant="h6" sx={{ mt: 2 }}>Plan Details:</Typography>
                <Typography variant="body1"><strong>Plan Name:</strong> {selectedplanOrder?.plan?.name}</Typography>
                <Typography variant="body1"><strong>Plan Price:</strong> ₹{selectedplanOrder?.plan?.price}</Typography>
                <Typography variant="body1"><strong>Plan Validity:</strong> {selectedplanOrder?.plan?.validity}</Typography>
                           </>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosePlanOrderDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TabPanel>

            </Box>
            <Footer />
        </ThemeProvider>
    );
};

export default Status;
