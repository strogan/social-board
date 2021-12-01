import router from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    console.log(router);
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, fetching]);
};
