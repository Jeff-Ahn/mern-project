export const processMessage = (payload: string) => {
  try {
    return JSON.parse(payload);
  } catch (error) {
    return null;
  }
};
