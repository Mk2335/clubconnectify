import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";

export const useFormProgress = (form: UseFormReturn<any>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const values = form.getValues();
    const totalFields = Object.keys(values).length;
    let filledFields = 0;

    const countFilledFields = (obj: any) => {
      Object.entries(obj).forEach(([_, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === 'object') {
              countFilledFields(item);
            } else if (item) {
              filledFields++;
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          countFilledFields(value);
        } else if (value) {
          filledFields++;
        }
      });
    };

    countFilledFields(values);
    const calculatedProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(calculatedProgress);
  }, [form.watch()]);

  return progress;
};