const getBaseURL = () => {
    const {
      VITE_APP_API_PORT,
      VITE_APP_API_PROTOCOL,
      VITE_APP_API_PREFIX,
      NODE_ENV,
    } = import.meta.env;
  
    // Determine hostname based on environment
    let hostname;
    if (NODE_ENV === "DEV") {
      hostname = "localhost";
    } else {
      hostname = window.location.hostname;
    }
  
    // Use environment variables if available, otherwise fallback to window.location
    const protocol =
      VITE_APP_API_PROTOCOL || window.location.protocol.slice(0, -1);
    const port = VITE_APP_API_PORT || window.location.port;
    const prefix = VITE_APP_API_PREFIX || "";
  
    // Construct and return base URL
    return `${protocol}://${hostname}:${port}/${prefix}`;
  };
  
  export { getBaseURL };
  