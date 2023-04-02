import { InputBaseProps } from "@common/inputs/shared.types";

export interface BaseInputProps extends Omit<InputBaseProps, 'inputClassName'> {
  children: ReactElement | string
  className: string
  handleClickContainer: () => void
  hasFocus?: boolean
  id?: string
}