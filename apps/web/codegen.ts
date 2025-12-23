import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Point to your GraphQL schema (server's generated schema)
  schema: '../../schema.gql',
  // Where your GraphQL operations are defined
  documents: ['src/graphql/operations/**/*.graphql'],
  // Generate output
  generates: {
    // Single file with all types and hooks
    'src/graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        // Use proper TypeScript types
        strictScalars: true,
        scalars: {
          DateTime: 'string',
        },
        // Generate React hooks for Apollo Client
        withHooks: true,
        withHOC: false,
        withComponent: false,
        // Better DX options
        skipTypename: false,
        dedupeFragments: true,
        // Naming conventions
        enumsAsTypes: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
      },
    },
  },

  // Watch mode options
  watch: false,
  overwrite: true,

  // Hooks for better DX
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;

