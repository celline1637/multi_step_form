import type { FormEventHandler } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
