export const tryParse = (value: string, defaultTransformer = (a: any) => a) => {
  try {
    return JSON.parse(value);
  } catch (_) {
    return defaultTransformer(value);
  }
};
