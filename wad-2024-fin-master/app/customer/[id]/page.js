"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

export default function CustomerEdit({ params }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;
  const { control, handleSubmit, reset } = useForm();

  const fetchCustomer = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APIBASE}/customer/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error("Error fetching customer:", error);
      setError("Failed to load customer details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [APIBASE, params.id, reset]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${APIBASE}/customer/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push('/customer');
    } catch (error) {
      console.error("Error updating customer:", error);
      setError("Failed to update customer. Please try again.");
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Customer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue=""
          rules={{ required: "Date of Birth is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="memberNumber"
          control={control}
          defaultValue=""
          rules={{ required: "Member Number is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Member Number"
              type="number"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="interests"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Interests"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Update Customer
        </Button>
      </form>
    </Box>
  );
}