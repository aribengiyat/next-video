import type { Asset, AssetSource } from '../../assets.js';
export declare function transform(asset: Asset): Asset | {
    sources: AssetSource[];
    status: "sourced" | "pending" | "uploading" | "processing" | "ready" | "error";
    originalFilePath: string;
    provider: string;
    providerMetadata?: {
        [provider: string]: {
            [key: string]: any;
        };
    } | undefined;
    poster?: string | undefined;
    blurDataURL?: string | undefined;
    size?: number | undefined;
    error?: any;
    createdAt: number;
    updatedAt: number;
    externalIds?: {
        [key: string]: string;
    } | undefined;
};
