import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
export interface UploadResult {
    key: string;
    url: string;
}

@Injectable()
export class AwsS3Service {
    private readonly s3Client: S3Client;
    private readonly bucket: string;
    private readonly region: string;

    constructor(private readonly configService: ConfigService) {
        this.bucket = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
        this.region = this.configService.getOrThrow<string>('AWS_REGION');

        // Uses default credential provider chain (AWS CLI credentials, env vars, IAM role, etc.)
        this.s3Client = new S3Client({
            region: this.region,
        });
    }

    async uploadFile(
        buffer: Buffer,
        key: string,
        contentType: string,
    ): Promise<UploadResult> {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        await this.s3Client.send(command);

        return {
            key,
            url: await this.getSignedImageUrl(key),
        };
    }

    async deleteFile(key: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        await this.s3Client.send(command);
    }

    getPublicUrl(key: string): string {
        return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    }

    async getSignedImageUrl(key: string, expiresIn = 3600): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });

        return signedUrl;
    }

    generateKey(folder: string, filename: string): string {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
        return `${folder}/${timestamp}-${randomString}-${sanitizedFilename}`;
    }
}

