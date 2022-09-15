import formidable from "formidable";
import { createReadStream } from "fs";
import { OAuth2Client } from "google-auth-library";
import { GaxiosResponse } from "gaxios";
import { drive_v3, google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
/**
 * Uploads a file to Google Drive
 * @return{obj} file Id
 * */

export const config = {
  api: {
    bodyParser: false
  }
};

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", 'application/pdf'];

const update = (req: NextApiRequest, res: NextApiResponse) => {
  req.method === 'POST' ? post(req, res) : res.status(404).json({ error: "Metodo no permitido" });
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { client, order } = req.query;


  const clientName = Array.isArray(client) ? client[0] : client;
  const orderId = Array.isArray(order) ? order[0] : order;

  const form = new formidable.IncomingForm({ multiples: true });
  try {
    form.parse(req, async function (err, fields, files) {
      const file = files.uploadedFile || files.file;
      //Verify if there is a file
      if (!file) {
        res.status(400).json({ error: "No se cargaron archivos" })
        return;
      }

      try {
        const service = getDriveService();

        const folderId = await createDirectory(service, clientName, orderId);
        if (Array.isArray(file)) {
          const filesUploaded: GaxiosResponse<drive_v3.Schema$File>[] = []
          for (const f of file) {
            const isValidateFileType = verifyFileType(f);
            if (!isValidateFileType) {
              throw `Archivo '${f.originalFilename}' no cargado. Archivos '${f.mimetype}' no permitidos`;
            }
            filesUploaded.push(await saveFile(f, folderId, service));
          }
          res.status(200).json({ data: filesUploaded });
          return
        }

        const isValidateFileType = verifyFileType(file);
        if (!isValidateFileType) {
          throw `Archivo '${file.originalFilename}' no cargado. Archivos '${file.mimetype}' no permitidos`;
        }
        const resfile = await saveFile(file, folderId, service);
        res.status(201).json({ data: resfile })
        return;
      }
      catch (error) {
        res.status(400).json({ error: error })
        return;
      }
    });
    return
  }
  catch (error) {
    res.status(400).json({ error: error })
    throw error;
  }
};


const verifyFileType = (file: formidable.File) => {
  return allowedFileTypes.includes(file.mimetype);
}


//generate drive service
const getDriveService = () => {
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
const saveFile = async (file: formidable.File, folderId: string, service: drive_v3.Drive) => {
  try {
    return await upload(service, file, folderId);
  } catch (error) {
    throw error;
  }
};



const createDirectory = async (service: drive_v3.Drive, clientName: string, orderId: string) => {
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
async function upload(service: drive_v3.Drive, file: formidable.File, folderId: string) {
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
async function findFolderId(service: drive_v3.Drive, folderName: string, parentFolderId?: string) {
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
async function createFolder(service: drive_v3.Drive, folderName: string, parentFolderId?: string) {
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

export default update;