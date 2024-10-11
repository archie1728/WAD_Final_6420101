"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const APIBASE = process.env.NEXT_PUBLIC_API_BASE;

    const fetchCustomers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${APIBASE}/customer`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.message === 'No customers found') {
                setCustomers([]);
            } else {
                setCustomers(data.customers || data); // Fallback to data if customers property doesn't exist
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            setError("Failed to load customers. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [APIBASE]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    const deleteCustomer = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                const response = await fetch(`${APIBASE}/customer/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                await fetchCustomers(); // Refresh the list after deletion
            } catch (error) {
                console.error("Error deleting customer:", error);
                alert("Failed to delete customer. Please try again.");
            }
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Customer List
            </Typography>
            <Link href="/customer/new" passHref>
                <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                    Add New Customer
                </Button>
            </Link>
            {customers.length === 0 ? (
                <Typography sx={{ mt: 2 }}>No customers found. Add a new customer to get started.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Member Number</TableCell>
                                <TableCell>Interests</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow 
                                    key={customer._id} 
                                    hover 
                                    onClick={() => router.push(`/customer/${customer._id}/detail`)}
                                    style={{cursor: 'pointer'}}
                                >
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{new Date(customer.dateOfBirth).toLocaleDateString()}</TableCell>
                                    <TableCell>{customer.memberNumber}</TableCell>
                                    <TableCell>{customer.interests}</TableCell>
                                    <TableCell>
                                        <Button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/customer/${customer._id}`);
                                            }} 
                                            variant="outlined" 
                                            color="primary" 
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteCustomer(customer._id);
                                            }} 
                                            variant="outlined" 
                                            color="secondary"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}