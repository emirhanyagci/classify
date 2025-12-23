import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
};

export type Class = {
  __typename?: 'Class';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['Float']['output'];
};

export type CreateClassInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass: Class;
  deleteClass: Scalars['Boolean']['output'];
  updateClass: Class;
};

export type MutationCreateClassArgs = {
  input: CreateClassInput;
};

export type MutationDeleteClassArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};

export type Query = {
  __typename?: 'Query';
  class: Class;
  classes: Array<Class>;
  myClasses: Array<Class>;
};

export type QueryClassArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateClassInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ClassFieldsFragment = {
  __typename?: 'Class';
  id: string;
  name: string;
  description: string;
  createdAt: string;
  ownerId: number;
};

export type CreateClassMutationVariables = Exact<{
  input: CreateClassInput;
}>;

export type CreateClassMutation = {
  __typename?: 'Mutation';
  createClass: {
    __typename?: 'Class';
    id: string;
    name: string;
    description: string;
    createdAt: string;
    ownerId: number;
  };
};

export type UpdateClassMutationVariables = Exact<{
  input: UpdateClassInput;
}>;

export type UpdateClassMutation = {
  __typename?: 'Mutation';
  updateClass: {
    __typename?: 'Class';
    id: string;
    name: string;
    description: string;
    createdAt: string;
    ownerId: number;
  };
};

export type DeleteClassMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteClassMutation = {
  __typename?: 'Mutation';
  deleteClass: boolean;
};

export type GetClassesQueryVariables = Exact<{ [key: string]: never }>;

export type GetClassesQuery = {
  __typename?: 'Query';
  classes: Array<{
    __typename?: 'Class';
    id: string;
    name: string;
    description: string;
    createdAt: string;
    ownerId: number;
  }>;
};

export type GetMyClassesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyClassesQuery = {
  __typename?: 'Query';
  myClasses: Array<{
    __typename?: 'Class';
    id: string;
    name: string;
    description: string;
    createdAt: string;
    ownerId: number;
  }>;
};

export type GetClassQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetClassQuery = {
  __typename?: 'Query';
  class: {
    __typename?: 'Class';
    id: string;
    name: string;
    description: string;
    createdAt: string;
    ownerId: number;
  };
};

export const ClassFieldsFragmentDoc = gql`
  fragment ClassFields on Class {
    id
    name
    description
    createdAt
    ownerId
  }
`;
export const CreateClassDocument = gql`
  mutation CreateClass($input: CreateClassInput!) {
    createClass(input: $input) {
      id
      name
      description
      createdAt
      ownerId
    }
  }
`;
export type CreateClassMutationFn = Apollo.MutationFunction<
  CreateClassMutation,
  CreateClassMutationVariables
>;

/**
 * __useCreateClassMutation__
 *
 * To run a mutation, you first call `useCreateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClassMutation, { data, loading, error }] = useCreateClassMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClassMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateClassMutation,
    CreateClassMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateClassMutation, CreateClassMutationVariables>(
    CreateClassDocument,
    options
  );
}
export type CreateClassMutationHookResult = ReturnType<
  typeof useCreateClassMutation
>;
export type CreateClassMutationResult =
  Apollo.MutationResult<CreateClassMutation>;
export type CreateClassMutationOptions = Apollo.BaseMutationOptions<
  CreateClassMutation,
  CreateClassMutationVariables
>;
export const UpdateClassDocument = gql`
  mutation UpdateClass($input: UpdateClassInput!) {
    updateClass(input: $input) {
      id
      name
      description
      createdAt
      ownerId
    }
  }
`;
export type UpdateClassMutationFn = Apollo.MutationFunction<
  UpdateClassMutation,
  UpdateClassMutationVariables
>;

/**
 * __useUpdateClassMutation__
 *
 * To run a mutation, you first call `useUpdateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClassMutation, { data, loading, error }] = useUpdateClassMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClassMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClassMutation,
    UpdateClassMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateClassMutation, UpdateClassMutationVariables>(
    UpdateClassDocument,
    options
  );
}
export type UpdateClassMutationHookResult = ReturnType<
  typeof useUpdateClassMutation
>;
export type UpdateClassMutationResult =
  Apollo.MutationResult<UpdateClassMutation>;
export type UpdateClassMutationOptions = Apollo.BaseMutationOptions<
  UpdateClassMutation,
  UpdateClassMutationVariables
>;
export const DeleteClassDocument = gql`
  mutation DeleteClass($id: Int!) {
    deleteClass(id: $id)
  }
`;
export type DeleteClassMutationFn = Apollo.MutationFunction<
  DeleteClassMutation,
  DeleteClassMutationVariables
>;

/**
 * __useDeleteClassMutation__
 *
 * To run a mutation, you first call `useDeleteClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClassMutation, { data, loading, error }] = useDeleteClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClassMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteClassMutation,
    DeleteClassMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteClassMutation, DeleteClassMutationVariables>(
    DeleteClassDocument,
    options
  );
}
export type DeleteClassMutationHookResult = ReturnType<
  typeof useDeleteClassMutation
>;
export type DeleteClassMutationResult =
  Apollo.MutationResult<DeleteClassMutation>;
export type DeleteClassMutationOptions = Apollo.BaseMutationOptions<
  DeleteClassMutation,
  DeleteClassMutationVariables
>;
export const GetClassesDocument = gql`
  query GetClasses {
    classes {
      id
      name
      description
      createdAt
      ownerId
    }
  }
`;

/**
 * __useGetClassesQuery__
 *
 * To run a query within a React component, call `useGetClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClassesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetClassesQuery,
    GetClassesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClassesQuery, GetClassesQueryVariables>(
    GetClassesDocument,
    options
  );
}
export function useGetClassesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClassesQuery,
    GetClassesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClassesQuery, GetClassesQueryVariables>(
    GetClassesDocument,
    options
  );
}
// @ts-ignore
export function useGetClassesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetClassesQuery,
    GetClassesQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetClassesQuery, GetClassesQueryVariables>;
export function useGetClassesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetClassesQuery, GetClassesQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetClassesQuery | undefined,
  GetClassesQueryVariables
>;
export function useGetClassesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetClassesQuery, GetClassesQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetClassesQuery, GetClassesQueryVariables>(
    GetClassesDocument,
    options
  );
}
export type GetClassesQueryHookResult = ReturnType<typeof useGetClassesQuery>;
export type GetClassesLazyQueryHookResult = ReturnType<
  typeof useGetClassesLazyQuery
>;
export type GetClassesSuspenseQueryHookResult = ReturnType<
  typeof useGetClassesSuspenseQuery
>;
export type GetClassesQueryResult = Apollo.QueryResult<
  GetClassesQuery,
  GetClassesQueryVariables
>;
export const GetMyClassesDocument = gql`
  query GetMyClasses {
    myClasses {
      id
      name
      description
      createdAt
      ownerId
    }
  }
`;

/**
 * __useGetMyClassesQuery__
 *
 * To run a query within a React component, call `useGetMyClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyClassesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyClassesQuery,
    GetMyClassesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyClassesQuery, GetMyClassesQueryVariables>(
    GetMyClassesDocument,
    options
  );
}
export function useGetMyClassesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyClassesQuery,
    GetMyClassesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyClassesQuery, GetMyClassesQueryVariables>(
    GetMyClassesDocument,
    options
  );
}
// @ts-ignore
export function useGetMyClassesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyClassesQuery,
    GetMyClassesQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetMyClassesQuery, GetMyClassesQueryVariables>;
export function useGetMyClassesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyClassesQuery,
        GetMyClassesQueryVariables
      >
): Apollo.UseSuspenseQueryResult<
  GetMyClassesQuery | undefined,
  GetMyClassesQueryVariables
>;
export function useGetMyClassesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyClassesQuery,
        GetMyClassesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyClassesQuery, GetMyClassesQueryVariables>(
    GetMyClassesDocument,
    options
  );
}
export type GetMyClassesQueryHookResult = ReturnType<
  typeof useGetMyClassesQuery
>;
export type GetMyClassesLazyQueryHookResult = ReturnType<
  typeof useGetMyClassesLazyQuery
>;
export type GetMyClassesSuspenseQueryHookResult = ReturnType<
  typeof useGetMyClassesSuspenseQuery
>;
export type GetMyClassesQueryResult = Apollo.QueryResult<
  GetMyClassesQuery,
  GetMyClassesQueryVariables
>;
export const GetClassDocument = gql`
  query GetClass($id: Int!) {
    class(id: $id) {
      id
      name
      description
      createdAt
      ownerId
    }
  }
`;

/**
 * __useGetClassQuery__
 *
 * To run a query within a React component, call `useGetClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClassQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClassQuery(
  baseOptions: Apollo.QueryHookOptions<GetClassQuery, GetClassQueryVariables> &
    ({ variables: GetClassQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClassQuery, GetClassQueryVariables>(
    GetClassDocument,
    options
  );
}
export function useGetClassLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClassQuery,
    GetClassQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClassQuery, GetClassQueryVariables>(
    GetClassDocument,
    options
  );
}
// @ts-ignore
export function useGetClassSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetClassQuery,
    GetClassQueryVariables
  >
): Apollo.UseSuspenseQueryResult<GetClassQuery, GetClassQueryVariables>;
export function useGetClassSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetClassQuery, GetClassQueryVariables>
): Apollo.UseSuspenseQueryResult<
  GetClassQuery | undefined,
  GetClassQueryVariables
>;
export function useGetClassSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetClassQuery, GetClassQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetClassQuery, GetClassQueryVariables>(
    GetClassDocument,
    options
  );
}
export type GetClassQueryHookResult = ReturnType<typeof useGetClassQuery>;
export type GetClassLazyQueryHookResult = ReturnType<
  typeof useGetClassLazyQuery
>;
export type GetClassSuspenseQueryHookResult = ReturnType<
  typeof useGetClassSuspenseQuery
>;
export type GetClassQueryResult = Apollo.QueryResult<
  GetClassQuery,
  GetClassQueryVariables
>;
