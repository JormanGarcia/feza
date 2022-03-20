import { useRouter } from "next/router";
import { useAuthStore } from "~/stores/authStore";
import { User } from "~/types/user.type";

export function useAuth() {
  const AuthStore = useAuthStore((store) => store);
  const router = useRouter();

  function login({ id, firstName, lastName, email }: User) {
    AuthStore.setUser({ firstName, id, lastName, email });
  }

  function logout() {
    router.push("/login");
    AuthStore.setUser(undefined);
  }

  const isAuntheticated = AuthStore.user !== undefined;

  return {
    login,
    logout,
    isAuntheticated,
    user: AuthStore.user,
  };
}
