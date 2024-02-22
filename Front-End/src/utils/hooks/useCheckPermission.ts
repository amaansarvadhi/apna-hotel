import { useMemo } from 'react'

function useCheckPermission(
  pageKey: string,
  pagePermission: string[],
  page: string
) {

  const roleMatched = useMemo(() => {

    if (page === 'comm') {
      return pagePermission.some((item: any) => {
        if (item.key == pageKey) {
          return item.Permissions?.[0].canRead
        }
      })
    }
    if (page === 'main') {
      return pagePermission.some((item: any) => {
        if (item.key == pageKey) {
          return item.Permissions?.[0].canRead
        }
      })
    }
    if (page === 'sec') {
      return pagePermission.some((item: any) => {
        if (item.key == pageKey) {
          return item.Permissions?.[0].canRead
        }
      })
    }
    if (page === 'thr') {
      return pagePermission.some((item: any) => {
        if (item.key == pageKey) {
          return item.Permissions?.[0].canRead
        }
      })

    }
    // return pagePermission.some((item: any) => item.key == pageKey)
  }, [page, pageKey, pagePermission])

  return roleMatched
}

export default useCheckPermission
