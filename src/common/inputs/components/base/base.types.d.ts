import { InputBaseProps } from "@common/inputs/shared.types";

export interface BaseInputProps extends Omit<InputBaseProps, 'inputClassName'> {
  children: ReactElement | string
  className?: string
  hasFocus?: boolean
  id?: string
  inputRef?: React.Ref
  onClickInputContainer?: (event?: React.MouseEvent) => void
}