export interface FormOptions {
  label?: string;
  name: string;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'date'
    | 'time'
    | 'select'
    | 'textarea'
    | 'file'
    | 'group'
    | 'radio'
    | 'title'
    | 'search'
    | 'checkbox';
  hint?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: string;
  options?: { label: string; value: any; description?: string }[];
  multiple?: boolean;
  childrens?: FormOptions[];
  leadingIcon?: string;
  trailingIcon?: string;
  rows?: number;
  defaultValue?: any;
  enableRoleInSearchResult?: boolean;
  api?: {
    url?: string;
    method?: string;
    searchKey?: string;
    labelField?: string;
    descriptionField?: string;
    valueField?: string;
    additionalValueField?: string;
    leadingIcon?: string;
    iconField?: string;
  };
}
