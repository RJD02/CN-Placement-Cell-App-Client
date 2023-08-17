import { ChangeEvent } from "react";

export interface inputProps {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  isRequired: boolean;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}
