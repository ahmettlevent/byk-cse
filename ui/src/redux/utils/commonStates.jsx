export const initialState = {
    loading: false,
    error: null,
    success: false,
  };
  
  export const pendingState = {
    loading: true,
    error: null,
    success: false,
  };
  
  export const fulfilledState = {
    loading: false,
    error: null,
    success: true,
  };
  
  export const rejectedState = {
    loading: false,
    error: true,
    success: false,
  };
  