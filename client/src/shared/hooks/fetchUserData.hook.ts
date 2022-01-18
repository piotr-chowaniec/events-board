import { useEffect, useCallback } from 'react';

import { useFetchProfileData } from '../api/hooks';
import {
  extractToken,
  resetToken,
} from '../../services/fetchService/tokenUtils';
import { setUserData } from '../../store/user/userSlice';
import { useAppDispatch } from '../../store/hooks';

const FetchUserData = async () => {
  const dispatch = useAppDispatch();

  const { call: fetchProfileData } = useFetchProfileData();

  const fetchUserData = useCallback(async () => {
    try {
      const token = extractToken();
      if (token) {
        const userData = await fetchProfileData({});
        dispatch(setUserData(userData));
      }
    } catch (error) {
      resetToken();
      // eslint-disable-next-line no-console
      console.warn('Failed to login or expired token');
    }
  }, [dispatch, fetchProfileData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
};

export default FetchUserData;
