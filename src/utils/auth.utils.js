import cookie from "js-cookie";
import jwt_decode from "jwt-decode";
import ROLENAMES from "../constant/RoleName";

export const setToken = (data) => {
  cookie.set("token_50f12d4b-4ebb-4774-8f34-9448e6b3db44", data.token, {
    expires: data.expiration,
  });
  cookie.set(
    "refresh_token_50f12d4b-4ebb-4774-8f34-9448e6b3db44",
    data.refresh_token
  );
  cookie.set(
    "expiration_50f12d4b-4ebb-4774-8f34-9448e6b3db44",
    data.expiration
  );
  cookie.set(
    "provider_id_50f12d4b-4ebb-4774-8f34-9448e6b3db44",
    data.provider_id
  );
};

export const getRoles = () => {
  var token = getToken();

  if (token) {
    try {
      var decoded = jwt_decode(token);
      var roles =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (roles) {
        return Array.isArray(roles)
          ? roles.map((r) => r.toUpperCase())
          : roles.toUpperCase();
      }
    } catch {
      return [];
    }
  } else {
    return [];
  }
};

export const getUserId = () => {
  var token = getToken();
  if (token) {
    try {
      var decoded = jwt_decode(token);
      if (decoded["sub"]) {
        return decoded["sub"];
      }
    } catch {
      return "";
    }
  }
};

export const getUserDisplayName = () => {
  var token = getToken();
  if (token) {
    try {
      var decoded = jwt_decode(token);
      if (decoded["given_name"]) {
        return decoded["given_name"];
      }
    } catch {
      return "";
    }
  }
};

export const isInRole = (role) => {
  let roles = getRoles();
  if (roles) {
    if (Array.isArray(roles)) {
      roles = roles.map((r) => r.toUpperCase());
      return roles.includes(role);
    } else {
      roles = roles.toUpperCase();
      return roles == role;
    }
  }
  return false;
};

export const isInRoles = (roles) => {
  let userRoles = getRoles();
  let hasRole = false;
  if (!roles || !userRoles) {
    return false;
  }

  if (!Array.isArray(userRoles)) {
    userRoles = [userRoles];
  }

  userRoles.map((r) => r.toUpperCase());
  roles.map((r) => r.toUpperCase());

  hasRole = roles.some(function (val) {
    return userRoles.includes(val) || userRoles.includes(ROLENAMES.SUPERADMIN);
  });

  return hasRole;
};

export const isInRoleforUI = (keys) => {
  let userRoles = getRoles();
  userRoles = userRoles.map((r) => r.toUpperCase());
  let roles = [];

  keys.map((r) => (userRoles.indexOf(r) >= 0 ? roles.push(r) : null));

  return roles;
};

export const getToken = () => {
  const token = cookie.get("token_50f12d4b-4ebb-4774-8f34-9448e6b3db44") || "";
  return token;
};

export const getRefreshToken = () => {
  const refresh_token = cookie.get(
    "refresh_token_50f12d4b-4ebb-4774-8f34-9448e6b3db44"
  );
  return refresh_token;
};

export const getProviderId = () => {
  const provider_id = cookie.get(
    "provider_id_50f12d4b-4ebb-4774-8f34-9448e6b3db44"
  );
  return provider_id;
};

export const signOut = () => {
  cookie.remove("token_50f12d4b-4ebb-4774-8f34-9448e6b3db44");
  cookie.remove("refresh_token_50f12d4b-4ebb-4774-8f34-9448e6b3db44");
  cookie.remove("expiration_50f12d4b-4ebb-4774-8f34-9448e6b3db44");
  cookie.remove("provider_id_50f12d4b-4ebb-4774-8f34-9448e6b3db44");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now().toString());
};
