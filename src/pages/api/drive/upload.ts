import formidable from "formidable";
import { GaxiosResponse } from "gaxios";
import { drive_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { createDirectory, getDriveService, saveFile, verifyFileType } from "../../../backend/dbcalls/drive";
/**
 * Uploads a file to Google Drive
 * @return{obj} file Id
 * */

export const config = {
  api: {
    bodyParser: false
  }
};

export type FileUploadResponse = { file: GaxiosResponse<drive_v3.Schema$File>, fileName: string }

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
          const filesUploaded: FileUploadResponse[] = []
          for (const f of file) {
            const isValidateFileType = verifyFileType(f);
            if (!isValidateFileType) {
              throw `Archivo '${f.originalFilename}' no cargado. Archivos '${f.mimetype}' no permitidos`;
            }
            const fileUploaded = await saveFile(f, folderId, service)
            filesUploaded.push({ file: fileUploaded, fileName: f.originalFilename })
          }
          res.status(200).json({ data: filesUploaded });
          return
        }

        const isValidateFileType = verifyFileType(file);
        if (!isValidateFileType) {
          throw `Archivo '${file.originalFilename}' no cargado. Archivos '${file.mimetype}' no permitidos`;
        }
        const resfile = await saveFile(file, folderId, service);
        res.status(201).json({ data: { file: resfile, fileName: file.originalFilename } })
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


export default update;