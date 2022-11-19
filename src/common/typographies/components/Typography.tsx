import React from 'react'
import classNames from 'classnames';
import { TypographyProps } from '../types'

export const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  level = 'p',
  size,
  ...props
}) => {

  const LevelComponent = level;

  let typographySizeClass = 'text-md';

  switch (size) {
    case 'xs':
      typographySizeClass = 'text-xs';
      break;
    case 'sm':
      typographySizeClass = 'text-sm';
      break;
    case 'md':
      typographySizeClass = 'text-md';
      break;
    case 'lg':
      typographySizeClass = 'text-lg';
      break;
    case 'xl':
      typographySizeClass = 'text-xl';
      break;
    case '2xl':
      typographySizeClass = 'text-2xl';
      break;
    default:
      typographySizeClass = 'text-md';
  }

  const typographyClassName = classNames(
    className,
    typographySizeClass
  )

  return (
    <LevelComponent
      className={typographyClassName}
      {...props}
    >
      {children}
    </LevelComponent>
  )
}