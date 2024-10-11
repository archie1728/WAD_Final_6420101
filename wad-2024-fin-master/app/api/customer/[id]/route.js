import { NextResponse } from 'next/server';
import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const customer = await Customer.findById(params.id);
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const customer = await Customer.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(customer);
  } catch (error) {
    console.error("Failed to update customer:", error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const customer = await Customer.findByIdAndDelete(params.id);
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}