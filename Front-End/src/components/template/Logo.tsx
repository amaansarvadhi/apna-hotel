import classNames from 'classnames'

import type { CommonProps } from '@/@types/common'
import { APP_NAME } from '@/constants/app.constant'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                src={`/logo.png`}
                // src={`./logo.png`}
                width={"40px"}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default Logo
