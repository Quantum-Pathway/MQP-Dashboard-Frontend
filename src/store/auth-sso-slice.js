import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

// InitialState
const initialAuthState = {
  initialized: false,
  loading: false,
  authenticated: false,

  user: null,
  realmRoles: [],
  clientRoles: [],

  tokenExpiresAt: null,  
  expirationWarningVisible: false,
  secondsRemaining: null,
  error: null,
};

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected authentication error occurred";
}

function applyAuthenticationState(state, authentication) {
  state.authenticated = authentication.authenticated;
  state.user = authentication.user;
  state.realmRoles = authentication.realmRoles || [];
  state.clientRoles = authentication.clientRoles || [];
  state.tokenExpiresAt = authentication.tokenExpiresAt || null;
}

/* Export Actions */
export const initializeAuthentication = createAsyncThunk(
  "authentication/initialize",
  async (_, thunkApi) => {
    try {
      return await authService.initialize();
    } catch (error) {
      return thunkApi.rejectWithValue(
        getErrorMessage(error),
      );
    }
  },
);

export const login = createAsyncThunk(
  "authentication/login",
  async (
    { redirectPath = "/" } = {},
    thunkApi
  ) => {
    try {
      authService.login(redirectPath);
    } catch (error) {
      return thunkApi.rejectWithValue(
        getErrorMessage(error),
      );
    }
  },
);

export const logout = createAsyncThunk(
  "authentication/logout",
  async ({reason = "manual"} = {}, thunkApi) => {
    try {
      await authService.logout(reason);
    } catch (error) {
      return thunkApi.rejectWithValue(
        getErrorMessage(error),
      );
    }
  },
);


// Redux slice with reducers to handle login, logout
const authSSOSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    showExpirationWarning(state, action) {
      state.expirationWarningVisible = true;
      state.secondsRemaining = action.payload;
    },
    updateExpirationCountdown(state, action) {
      state.secondsRemaining = action.payload;
    },
    hideExpirationWarning(state) {
      state.expirationWarningVisible = false;
      state.secondsRemaining = null;
    },
    authenticationCleared(state) {
      state.authenticated = false;
      state.user = null;
      state.realmRoles = [];
      state.clientRoles = [];
      state.tokenExpiresAt = null;
      state.expirationWarningVisible = false;
      state.secondsRemaining = null;
    },
    clearAuthenticationError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuthentication.pending, (state) => {
        state.loading = true;
        state.initialized = false;
        state.error = null;
      })
      .addCase(initializeAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        applyAuthenticationState(state, action.payload);
      })
      .addCase(initializeAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.authenticated = false;
        state.user = null;
        state.tokenExpiresAt = null;
        state.error = action.payload || "Authentication initialization failed";
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});
export const {
  showExpirationWarning,
  updateExpirationCountdown,
  hideExpirationWarning,
  authenticationCleared,
  clearAuthenticationError,
} = authSSOSlice.actions;

/* Export Reducer */
export const selectAuthentication = (state) => state.authentication;
export const selectAuthenticationInitialized = (state) => state.authentication.initialized;
export const selectAuthenticationLoading = (state) => state.authentication.loading;
export const selectIsAuthenticated = (state) => state.authentication.authenticated;
export const selectCurrentUser = (state) => state.authentication.user;
export const selectExpirationWarningVisible = (state) => state.authentication.expirationWarningVisible;
export const selectSecondsRemaining = (state) => state.authentication.secondsRemaining;
export const selectTokenExpiresAt = (state) => state.authentication.tokenExpiresAt;
export const selectHasClientRole = (role) => (state) => (state.authentication.clientRoles.includes(role));
export default authSSOSlice.reducer;

