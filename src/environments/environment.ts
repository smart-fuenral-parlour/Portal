// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  adalConfig: {
    tenant: 'skhomo.onmicrosoft.com',
    clientId: '4d0e0762-e5f2-4471-b141-17ee7d33604d',
    postLogoutRedirectUri: 'http://localhost:4200/login/login',
    endpoints: {
      'http://localhost:4200': 'http://localhost:4200',
    },
  },
  apiUrl: 'https://graph.microsoft.com/v1.0/users'
};
