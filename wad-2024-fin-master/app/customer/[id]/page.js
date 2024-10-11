"use client";
import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress } from '@mui/material';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APIBASE}/customer`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError(`Failed to load customers. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

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