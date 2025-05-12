// src/app/relax/profile/page.tsx
'use client'; // CommunityShoutouts is a client component

import CommunityShoutouts from '@/components/relax-zone/community-shoutouts';
import type { FC } from 'react';

/**
 * Page for User Profile and Posts (currently Community Shoutouts).
 * This is one of the main tabs in the Relax Zone.
 */
const ProfilePage: FC = () => {
  // In the future, this page could include more user-specific profile information
  // in addition to or instead of general community shoutouts.
  return <CommunityShoutouts />;
};

export default ProfilePage;
