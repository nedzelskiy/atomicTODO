export const reflect = (asyncFunc: Function): ErrorCheckedPromiseResult[] => {
  return asyncFunc().then(
    (result: any) => { return { result, status: 'fulfilled', isError: false }; },
    (error: any) => { return { error, status: 'rejected', isError: true }; },
  );
};

export type ErrorCheckedPromiseResult = {
  result?: any;
  error?: any;
  status: string;
  isError: boolean;
};
