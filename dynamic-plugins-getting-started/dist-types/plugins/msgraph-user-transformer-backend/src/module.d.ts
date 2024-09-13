import { UserEntity } from '@backstage/catalog-model';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export declare function myUserTransformer(user: MicrosoftGraph.User, userPhoto?: string): Promise<UserEntity | undefined>;
export declare function normalizeUserPrincipalName(name: string): string;
export declare const catalogModuleMsGraphTransformer: import("@backstage/backend-plugin-api").BackendFeatureCompat;
