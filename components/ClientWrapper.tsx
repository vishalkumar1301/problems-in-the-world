"use client";

import React from 'react';
import { MapProvider } from "@/contexts/MapContext";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return <MapProvider>{children}</MapProvider>;
};

export default ClientWrapper;