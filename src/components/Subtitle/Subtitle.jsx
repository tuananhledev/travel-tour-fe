import React from 'react'
import className from 'classnames/bind'
import styles from './style.module.css'

const cx = className.bind(styles)

const Subtitle = ({children, className, type='primary'}) => {
  return (
      <h3 className={cx('subtitle', className)}>{children}</h3>
  )
}

export default Subtitle