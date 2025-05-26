/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "./useInView";
import { InfiniteData } from "@tanstack/react-query";
import { ListPaginated } from "backend";

interface Props<DataType> {
    fetchNextPage: any;
    hasNextPage: boolean;
    data: InfiniteData<ListPaginated<DataType>, unknown> | undefined;
}

export function useInfiniteScrollFetch<DataType>({
    fetchNextPage,
    hasNextPage,
    data,
}: Props<DataType>) {
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

    const { ref: listRef, inViewState } = useInView<{
        list: boolean;
    }>({
        initialValues: {
            list: false,
        },
    });

    const transformedData = useMemo(() => data?.pages.flatMap((page) => page.data), [data]);

    useEffect(() => {
        if (inViewState?.list && hasNextPage && !isFetchingNextPage) {
            setIsFetchingNextPage(true);

            fetchNextPage().then(() => {
                setIsFetchingNextPage(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inViewState?.list, hasNextPage, isFetchingNextPage]);

    return { listRef, isFetchingNextPage, inViewState, transformedData };
}
