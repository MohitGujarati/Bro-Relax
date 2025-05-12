// src/app/relax/profile/page.tsx
'use client'; // CommunityShoutouts is a client component

import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import type { FC } from 'react';

/**
 * Page for Community Shoutouts. Renamed from ProfilePage for clarity.
 * This is one of the main tabs in the Relax Zone.
 */
const CommunityPage: FC = () => {
  // Currently this page only shows the community shoutouts component.
  // Future enhancements could include user-specific content if authentication is added.
  return <CommunityShoutouts />;
};

export default CommunityPage; // Exporting the renamed component
