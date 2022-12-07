import { InputHTMLAttributes } from "react";
import { CheckableInputAttr, ErrorMessageAttr, LabelContentAttr } from "./shared.types";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, CheckableInputAttr, ErrorMessageAttr, LabelContentAttr {

}