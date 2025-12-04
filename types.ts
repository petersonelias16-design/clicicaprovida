import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResponse {
  text: string;
  sources: { uri: string; title: string }[];
}

export interface NavItem {
  label: string;
  href: string;
}