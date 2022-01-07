import { useEffect, useCallback } from 'react';

import { useFetchProfileData } from '../api/hooks';
import { extractToken } from '../../services/fetchService/tokenUtils';
import { setUserData } from '../../store/user/userSlice';
import { useAppDispatch } from '../../store/hooks';

const FetchUserData = async () => {
  const dispatch = useAppDispatch();

  const { call: fetchProfileData } = useFetchProfileData();

  const fetchUserData = useCallback(async () => {
    const token = extractToken();
    if (token) {
      const userData = await fetchProfileData({});
      dispatch(setUserData(userData));
    }
  }, [dispatch, fetchProfileData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
};

export default FetchUserData;
