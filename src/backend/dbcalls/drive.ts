import formidable from "formidable";
import { createReadStream } from "fs";
import { OAuth2Client } from "google-auth-library";
import { drive_v3, google } from "googleapis";



export const verifyFileType = (file: formidable.File) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", 'application/pdf', 'application/octet-stream'];
    return allowedFileTypes.includes(file.mimetype);
}


//generate drive service
export const getDriveService = () => {
    try {
        const oauth = new OAuth2Client({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: process.env.GOOGLE_REDIRECT_URI,
        });

        oauth.setCredentials({ refresh_token: process.env.GOOOGLE_DRIVE_REFRESH_TOKEN });
        const service = google.drive({ version: 'v3', auth: oauth });
        return service;
    }
    catch (error) {
        throw error;
    }
}



//save file to drive
export const saveFile = async (file: formidable.File, folderId: string, service: drive_v3.Drive) => {
    try {
        return await upload(service, file, folderId);
    } catch (error) {
        throw error;
    }
};



export const createDirectory = async (service: drive_v3.Drive, clientName: string, orderId: string) => {
    try {
        //find client folder
        const clientNameFolderId = await findFolderId(service, clientName);

        //create client folder if not exists
        if (!clientNameFolderId) {
            const newClientNameFolderId = await createFolder(service, clientName);
            const newFolderId = await createFolder(service, orderId, newClientNameFolderId);
            return await newFolderId
        }

        //find order folder
        const newFolderId = await findFolderId(service, orderId, clientNameFolderId);

        //create order folder if not exists
        if (!newFolderId) {
            const newFolderId = await createFolder(service, orderId, clientNameFolderId);
            return newFolderId;
        }

        return newFolderId;
    }
    catch (error) {
        throw error;
    }
}

//upload file to folder
export async function upload(service: drive_v3.Drive, file: formidable.File, folderId: string) {
    try {
        const document = await service.files.create({
            requestBody: { name: file.originalFilename, parents: [folderId] },
            media: {
                mimeType: file.mimetype,
                body: createReadStream(file.filepath),
            },
            fields: 'id'
        });
        return document;
    }
    catch (error) {
        throw error;
    }
}

//find folder id by name
export async function findFolderId(service: drive_v3.Drive, folderName: string, parentFolderId?: string) {
    try {
        const folderId = await service.files.list({
            q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' ${parentFolderId ? `and '${parentFolderId}' in parents` : ''}`,
            fields: 'files(id)',
        });
        return folderId?.data?.files?.[0]?.id || null;
    }
    catch (error) {
        throw error;
    }
}


//create folder by name
export async function createFolder(service: drive_v3.Drive, folderName: string, parentFolderId?: string) {
    try {
        const fileMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentFolderId || 'root']
        };
        const folder = await service.files.create({
            requestBody: fileMetadata,
            fields: 'id',
        });
        return folder.data.id;
    }
    catch (error) {
        throw error;
    }
}


export async function getFile(service: drive_v3.Drive, fileId: string) {
    try {
        const file = await service.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
        return file;
    }
    catch (error) {
        throw error;
    }
}
