/** @format */

import { useMemo } from "react";

function useCheckRoutePermission(
  pagePermission: string[] = [],
  routeKey: string,
) {
  const roleMatched = useMemo(() => {
    return pagePermission.some((item: any) => {
      if (item.key == routeKey) {
        return item.Permissions?.[0].canRead;
      }
    });

    // return pagePermission.some((item: any) => item.key == pageKey)
  }, [pagePermission, routeKey]);

  return roleMatched;
}

export default useCheckRoutePermission;
