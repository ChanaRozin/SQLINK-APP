export type FormErrors<T> = Partial<Record<keyof T, string>>;

export const showError = (field: any) => {
    return field.meta.error? field.meta.error:'';
  };