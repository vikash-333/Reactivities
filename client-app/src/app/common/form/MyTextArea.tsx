import { useField } from "formik";
import { Form, Label, TextArea } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <TextArea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {" "}
          {meta.error}{" "}
        </Label>
      ) : null}
    </Form.Field>
  );
}
