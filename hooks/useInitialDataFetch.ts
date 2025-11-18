"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchAllInitialData } from "@/store/slices/masterDataSlice";

/**
 * Hook to fetch all initial data when the app first loads
 * This should be called once at the root level of the app
 */
export function useInitialDataFetch() {
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialLoadComplete, initialLoadError } = useSelector(
    (state: RootState) => state.masterData
  );

  useEffect(() => {
    // Only fetch if not already loaded
    if (!isInitialLoadComplete) {
      dispatch(fetchAllInitialData());
    }
  }, [dispatch, isInitialLoadComplete]);

  return {
    isInitialLoadComplete,
    initialLoadError,
  };
}

