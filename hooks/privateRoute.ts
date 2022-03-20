import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authHook";

export function usePrivateRoute() {
  const { isAuntheticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuntheticated) {
      router.push("/login");
    }
  }, [user]);
}
