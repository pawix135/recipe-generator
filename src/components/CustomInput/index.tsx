"use client";
import { useField, type FieldHookConfig } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CustomInput: React.FC<FieldHookConfig<string> & { label?: string }> = ({
  label,
  ...props
}) => {
  let [input, _, helpers] = useField(props);

  return (
    <div className="flex flex-row gap-2">
      {label && <Label htmlFor="">Test</Label>}
      <Input
        {...(props as any)}
        value={input.value}
        name={input.name}
        onChange={input.onChange}
        onBlur={input.onBlur}
      />
    </div>
  );
};

export default CustomInput;
