const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token retrieved:", token); // Debugging line to check the token value
  return token ? token : null;
};

const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};

export { getToken, isAuthenticated };
