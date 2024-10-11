"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Paper, Button, Box, CircularProgress } from '@mui/material';

export default function CustomerDetail({ params }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;

  const fetchCustomer = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APIBASE}/customer/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching customer:", error);
      setError("Failed to load customer details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [APIBASE, params.id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);


  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/customer')} sx={{ mt: 2 }}>
          Back to Customer List
        </Button>
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <Typography sx={{ mt: 4, textAlign: 'center' }}>Customer not found.</Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/customer')} sx={{ mt: 2 }}>
          Back to Customer List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Details
        </Typography>
        <Typography variant="body1"><strong>Name:</strong> {customer.name}</Typography>
        <Typography variant="body1"><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</Typography>
        <Typography variant="body1"><strong>Member Number:</strong> {customer.memberNumber}</Typography>
        <Typography variant="body1"><strong>Interests:</strong> {customer.interests}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => router.push(`/customer/${customer._id}`)} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => router.push('/customer')}>
            Back to List
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}