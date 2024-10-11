"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function UpdateCustomer({ params }) {
  const { control, handleSubmit, setValue } = useForm();
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`${APIBASE}/customer/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch customer');
      const data = await response.json();
      setCustomer(data);
      // Set form values
      setValue('name', data.name);
      setValue('dateOfBirth', new Date(data.dateOfBirth).toISOString().split('T')[0]);
      setValue('memberNumber', data.memberNumber);
      setValue('interests', data.interests);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${APIBASE}/customer/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update customer');
      router.push('/customer');
    } catch (error) {
      console.error("Error updating customer:", error);
      alert('Error updating customer');
    }
  };

  if (!customer) return <Typography>Loading...</Typography>;

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