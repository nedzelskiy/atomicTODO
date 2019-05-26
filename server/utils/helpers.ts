export const reflect = (asyncFunc: Function): Promise<ErrorCheckedPromiseResult> => {
  return asyncFunc().then(
    (result: any) => { return { result, status: 'fulfilled', isError: false }; },
    (error: any) => { return { error, status: 'rejected', isError: true }; },
  );
};

export type ErrorCheckedPromiseResult = {
  status: 'fulfilled';
  isError: false
  result: any;
  error?: any
} | {
  status: 'rejected';
  isError: true
  error: any
  result?: any;
};
