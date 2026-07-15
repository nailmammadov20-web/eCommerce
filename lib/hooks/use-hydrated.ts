import { useEffect, useState } from "react";

/** Guards client-only persisted state (e.g. the Zustand cart) from an SSR/CSR mismatch. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
