import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// 简化的请求处理器，直接返回结果
export const UseRequestProcessor = () => {
  const query = <TQueryFnData, TError = AxiosError, TData = TQueryFnData>(
    queryKey: unknown[],
    queryFn: () => Promise<TQueryFnData>,
    options?: UseQueryOptions<TQueryFnData, TError, TData>,
  ): UseQueryResult<TData, TError> => {
    return useQuery<TQueryFnData, TError, TData>({
      queryKey,
      queryFn,
      ...options,
    });
  };

  const mutate = <TData, TVariables, TError = AxiosError, TContext = unknown>(
    mutationKey: unknown[],
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationResult<TData, TError, TVariables, TContext> => {
    return useMutation<TData, TError, TVariables, TContext>({
      mutationKey,
      mutationFn,
      ...options,
    });
  };

  return {
    query,
    mutate,
  };
};
