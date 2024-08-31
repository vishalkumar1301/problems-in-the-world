// File: app/api/locations/route.ts

import { NextResponse } from "next/server";
import {
  getLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
} from "@/lib/db/locations";
import { Location } from "@/lib/interfaces/Location";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const location = await getLocationById(Number(id));
      return location
        ? NextResponse.json(location)
        : NextResponse.json({ error: "Location not found" }, { status: 404 });
    } else {
      const locations = await getLocations();
      return NextResponse.json(locations);
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const location: Omit<Location, "location_id"> = await request.json();
    const newLocationId = await addLocation(location);
    return NextResponse.json(
      { message: "Location added successfully", locationId: newLocationId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding location:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing location id" }, { status: 400 });
  }

  try {
    const location: Partial<Location> = await request.json();
    const success = await updateLocation(Number(id), location);
    return success
      ? NextResponse.json({ message: "Location updated successfully" })
      : NextResponse.json({ error: "Location not found" }, { status: 404 });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing location id" }, { status: 400 });
  }

  try {
    const success = await deleteLocation(Number(id));
    return success
      ? NextResponse.json({ message: "Location deleted successfully" })
      : NextResponse.json({ error: "Location not found" }, { status: 404 });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
