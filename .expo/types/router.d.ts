/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/ColdPage`; params?: Router.UnknownInputParams; } | { pathname: `/comptoir`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/kitchen`; params?: Router.UnknownInputParams; } | { pathname: `/orderBlurred`; params?: Router.UnknownInputParams; } | { pathname: `/orders`; params?: Router.UnknownInputParams; } | { pathname: `/telephone`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/ColdPage`; params?: Router.UnknownOutputParams; } | { pathname: `/comptoir`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/kitchen`; params?: Router.UnknownOutputParams; } | { pathname: `/orderBlurred`; params?: Router.UnknownOutputParams; } | { pathname: `/orders`; params?: Router.UnknownOutputParams; } | { pathname: `/telephone`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/ColdPage${`?${string}` | `#${string}` | ''}` | `/comptoir${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/kitchen${`?${string}` | `#${string}` | ''}` | `/orderBlurred${`?${string}` | `#${string}` | ''}` | `/orders${`?${string}` | `#${string}` | ''}` | `/telephone${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/ColdPage`; params?: Router.UnknownInputParams; } | { pathname: `/comptoir`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/kitchen`; params?: Router.UnknownInputParams; } | { pathname: `/orderBlurred`; params?: Router.UnknownInputParams; } | { pathname: `/orders`; params?: Router.UnknownInputParams; } | { pathname: `/telephone`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
