export const reflect = (p: Function): Promise<any> => {
  return p().then(
    (v: any) => { return { v, status: 'fulfilled', isError: false }; },
    (e: any) => { return { e, status: 'rejected', isError: true }; },
  );
};

// export type
