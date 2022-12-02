import { AllHTMLAttributes } from "react"
import { SIZES } from '@common/other/types'

type TYPOGRAPHY_LEVEL = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TypographyProps extends Omit<AllHTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>, 'size'> {
  level?: TYPOGRAPHY_LEVEL
  size?: SIZES
}