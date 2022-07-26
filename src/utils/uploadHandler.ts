import { v2 as cloudinary } from 'cloudinary';
import { FileUpload } from "graphql-upload";
import * as crypto from "crypto";
function generateFileName() {
    return crypto.randomBytes(15).toString('hex');
}


export function generateUrl(selector: string,) {

    return cloudinary.url(selector, {
        quality: 'auto',
        format: 'webp',
    });
}

export async function uploadToCloudinary(
    file: FileUpload,
) {
    cloudinary.config({
        cloud_name: 'dzi4g0acr',
        api_key: '154143382896523',
        api_secret: 'IqEJeIUDKJwd2ER2FipqhHom3C4',
    });
    const { createReadStream } = await file;

    return new Promise<{ url: string }>((resolve, reject) => {
        const fileName = generateFileName();
        const filePath = `cv/${fileName}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                public_id: fileName,
                folder: filePath,
            },
            (err, res) => {
                if (res) {
                    resolve({
                        url: `${filePath}/${fileName}`,
                    });
                } else {
                    reject(err);
                }
            }
        );
        createReadStream()
            .pipe(stream)
            .on('error', (err) => reject(err));
    });
}

