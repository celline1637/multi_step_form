import React, {
  Children,
  ReactNode,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface FunnelProps<T extends readonly string[]> {
  step: T[number];
  children: ReactNode;
}

const Funnel = <T extends readonly string[]>({
  step,
  children,
}: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find(
    (child) => (child.props as StepProps<T>)?.name === step
  );

  if (!targetElement) {
    return null;
  }

  return <>{targetElement}</>;
};

export interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: ReactNode;
}

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

export const useFunnel = <T extends readonly string[]>(
  steps: T,
  defaultStep?: T[number]
) => {
  const [step, setStep] = useState<T[number]>(defaultStep ?? steps[0]);

  const goNextStep = useCallback(() => {
    setStep((prev) => {
      const nextIndex = steps.indexOf(prev) + 1;
      if (steps.length - nextIndex === 0) return prev;
      return steps[nextIndex];
    });
  }, [steps]);

  const goPrevStep = useCallback(() => {
    setStep((prev) => {
      const prevIndex = steps.indexOf(prev) - 1;
      if (prevIndex < 0) return prev;
      return steps[prevIndex];
    });
  }, [steps]);

  const FunnelElement = useMemo(
    () =>
      Object.assign(
        (props: Omit<FunnelProps<T>, "step">) => {
          return <Funnel step={step} {...props} />;
        },
        { Step: (props: StepProps<T>) => <Step<T> {...props} /> }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step]
  );

  return { FunnelElement, setStep, goNextStep, goPrevStep, step };
};

export default Funnel;
