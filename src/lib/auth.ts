export const isAuthenticated = () => {
  // Mock authentication check
  // In a real app, this would check a token in localStorage or context
  return localStorage.getItem("fashionOS_auth") === "true";
};

export const login = () => {
  localStorage.setItem("fashionOS_auth", "true");
};

export const logout = () => {
  localStorage.removeItem("fashionOS_auth");
};