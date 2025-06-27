// Environment detection for static deployments
export const isStaticDeployment = () => {
  return window.location.hostname.includes('github.io');
};

export const getBackendMessage = () => {
  if (isStaticDeployment()) {
    return {
      title: "Backend Required",
      message: "This is a frontend demonstration. To access device data, documentation, and monitoring features, deploy with a backend server.",
      action: "View Developer API documentation to learn how to connect your data sources."
    };
  }
  return null;
};