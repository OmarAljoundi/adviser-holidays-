import { create } from "zustand";
import { useRouter } from "next/navigation";
import { useTransition, useEffect } from "react";

interface TransitionStore {
  isPending: boolean;
  isInitialized: boolean;
  refresh: () => void;
}

export const useTransitionStore = create<TransitionStore>(() => ({
  isPending: false,
  isInitialized: false,
  refresh: () =>
    console.warn(
      "Page transition not initialized. Make sure to call useInitTransition in a parent component."
    ),
}));

export function useInitTransition() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    useTransitionStore.setState({ isPending });
  }, [isPending]);

  useEffect(() => {
    const refresh = () => {
      startTransition(() => {
        router.refresh();
      });
    };

    useTransitionStore.setState({
      refresh,
      isInitialized: true,
    });

    return () => {
      // Cleanup when component unmounts
      useTransitionStore.setState({
        isInitialized: false,
      });
    };
  }, [router, startTransition]);
}
