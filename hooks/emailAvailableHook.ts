import { useEffect, useState } from "react";
import { getUserByEmail } from "~/api/user.api";

export function useEmailAvailable(email: string, noErrors?: boolean) {
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  async function fetchEmail() {
    setLoading(true);
    console.log(loading, "loadingA");

    getUserByEmail(email).then((response) => {
      setIsEmailAvailable(response.data === null);
      setLoading(false);
    });
    console.log(loading, "loadingB");
  }

  useEffect(() => {
    if (email === "" || noErrors) {
      setIsEmailAvailable(null);
      return;
    }

    fetchEmail();
  }, [email]);

  return {
    isEmailAvailable,
    isLoading: loading,
  };
}
