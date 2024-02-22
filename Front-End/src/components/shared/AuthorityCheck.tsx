import type { CommonProps } from '@/@types/common'
import useAuthority from '@/utils/hooks/useAuthority'
import useCheckPermission from '@/utils/hooks/useCheckPermission'

interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
    pageKey: string
    pagePermission: string[]
    page: string
}

const AuthorityCheck = (props: AuthorityCheckProps) => {

    const { userAuthority = [], authority = [], children, pageKey, pagePermission, page } = props

    const roleMatched = useAuthority(userAuthority, authority)

    const checkPermission = useCheckPermission(pageKey, pagePermission, page)
    return <>{roleMatched ? checkPermission ? children : null : null}</>
}

export default AuthorityCheck
