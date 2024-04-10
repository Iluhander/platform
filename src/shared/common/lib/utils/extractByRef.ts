import { RefObject } from "react";

/**
 * Function for extracting form values by id of the form.
 * @param {MutableRefObject<HTMLFormElement>} formRef - react ref to the form.
 * @returns Object of it's fields.
 */
export default function extractByRef(formRef: RefObject<HTMLFormElement>) {
  if (!formRef?.current) {
    return {};
  }

  const formData = new FormData(formRef.current);

  const result: Record<string, any> = {};
  formData.forEach((val, key) => (result[key] = val));

  return result;
}
