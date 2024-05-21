'use client';
import React from 'react';

import { ProfileContext } from '../providers/ProfileProvider';

export const useAuth = () => React.useContext(ProfileContext);
