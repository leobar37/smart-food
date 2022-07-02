export const matcher = <Val, T extends string | undefined>(
  val?: T,
  fallback?: any,
) => {
  return (obj: Partial<Record<Exclude<T, undefined>, Val>>) => {
    if (!val) {
      return fallback || null;
    }
    const result = (obj as any)[val];
    if (!result) {
      return fallback || null;
    }
    return result;
  };
};
