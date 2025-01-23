let accessToken_var = null;
let refreshToken_var = null;

// Export the variables and a way to update them
module.exports = {
  getTokens: () => ({
    accessToken: accessToken_var,
    refreshToken: refreshToken_var,
  }),
  setTokens: (accessToken, refreshToken) => {
    accessToken_var = accessToken;
    refreshToken_var = refreshToken;
  },
};
