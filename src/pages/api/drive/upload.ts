import formidable from "formidable";
import { createReadStream } from "fs";
import { OAuth2Client } from "google-auth-library";
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

const update = (req: NextApiRequest, res: NextApiResponse) => {
  req.method === 'POST' ? post(req, res) : res.status(404).send("");
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;


  const folderName = Array.isArray(id) ? id[0] : id;

  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const file = files.uploadedFile || files.file;
    if (Array.isArray(file)) return res.status(400).json({ error: 'File is an array' });
    try {
      await saveFile(file, folderName || 'No name');
      return res.status(201).json({ data: form });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });
};

const saveFile = async (file: formidable.File, folderName: string) => {
  try {
    const oauth = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    });

    oauth.setCredentials({ refresh_token: process.env.GOOOGLE_DRIVE_REFRESH_TOKEN });
    const service = google.drive({ version: 'v3', auth: oauth });

    const folderId = await findFolderId(service, folderName);

    if (!folderId) {
      const newFolderId = await createFolder(service, folderName);
      return await upload(service, file, newFolderId);
    }
    return await upload(service, file, folderId);

  } catch (error) {
    console.log(error);
    throw error;
  }
};


//upload file to folder
async function upload(service: drive_v3.Drive, file: formidable.File, folderId: string) {
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

//find folder id by name
async function findFolderId(service: drive_v3.Drive, folderName: string) {
  const folderId = await service.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
    fields: 'files(id)',
  });
  return folderId?.data?.files?.[0]?.id || null;
}


//create folder by name
async function createFolder(service: drive_v3.Drive, folderName: string) {
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };
  const folder = await service.files.create({
    requestBody: fileMetadata,
    fields: 'id',
  });
  return folder.data.id;
}

export default update;