/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useReducer } from "react";

interface Props<State> {
    initialValues: State;
    threshold?: number;
    options?: IntersectionObserverInit;
}

type Action = {
    type: string;
    value: boolean;
};

export function useInView<State>({ options, threshold = 0.1, initialValues }: Props<State>) {
    const ref = useRef<HTMLDivElement | null>(null);

    const inViewsReducer = (state: State, action: Action) => {
        const { type, value } = action;
        const newState = structuredClone(state) as any;
        newState[type as string] = value;

        return newState as State;
    };

    const [inViewState, dispatchInView] = useReducer(inViewsReducer, initialValues);

    useEffect(() => {
        Object.keys(inViewState as any).forEach((key) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    dispatchInView({ type: key as string, value: entry.isIntersecting });
                    // setIsInView(entry.isIntersecting);
                },
                {
                    // Adjust this value based on when you want to trigger the animation
                    threshold,
                    ...options,
                },
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    observer.unobserve(ref.current);
                }
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return {
        ref,
        inViewState,
    };
}
