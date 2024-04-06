import { S3Client, CreateBucketCommand, PutObjectCommand, PutBucketAclCommand } from '@aws-sdk/client-s3';
export declare function findBucket(s3: S3Client, callbackFn: (bucket: {
    Name?: string;
}) => boolean | void): Promise<any>;
export declare function createBucket(s3: S3Client, bucketName: string, input?: Partial<CreateBucketCommand['input']>): any;
export declare function putBucketAcl(s3: S3Client, bucketName: string, input?: Partial<PutBucketAclCommand['input']>): Promise<any>;
export declare function putObject(s3: S3Client, input: PutObjectCommand['input']): any;
export declare function putBucketCors(s3: S3Client, bucketName: string): any;
