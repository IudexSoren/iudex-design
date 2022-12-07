import { InputHTMLAttributes } from "react";
import { CheckableInputAttr, ErrorMessageAttr, LabelContentAttr } from "./shared.types";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement>, CheckableInputAttr, ErrorMessageAttr, LabelContentAttr {

}