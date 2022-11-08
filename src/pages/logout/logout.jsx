import { useEffect } from "react";

const LogOut = () => {
  useEffect(() => {
    document.cookie =
      "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.location = "/";
  });

  return null;
};

export default LogOut;
