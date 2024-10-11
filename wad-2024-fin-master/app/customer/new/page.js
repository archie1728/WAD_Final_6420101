"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${APIBASE}/customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/customer');
      } else {
        const errorData = await response.json();
        alert(`Error adding customer: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Error adding customer. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Customer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue=""
          rules={{ required: 'Date of Birth is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
            />
          )}
        />
        <Controller
          name="memberNumber"
          control={control}
          defaultValue=""
          rules={{ required: 'Member Number is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Member Number"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.memberNumber}
              helperText={errors.memberNumber?.message}
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
          Add Customer
        </Button>
      </form>
    </Box>
  );
}