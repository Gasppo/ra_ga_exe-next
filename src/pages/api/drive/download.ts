import { NextApiRequest, NextApiResponse } from "next";
import { getDriveService, getFile } from "../../../backend/dbcalls/drive";

const download = (req: NextApiRequest, res: NextApiResponse) => req.method === 'GET' ? post(req, res) : res.status(404).json({ error: "Metodo no permitido" });


const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const { file } = req.query;
    const fileId = Array.isArray(file) ? file[0] : file;
    try {
        const service = getDriveService();
        const file = await getFile(service, fileId);
        Object.keys(file.headers).forEach(key => res.setHeader(key, file.headers[key]));
        file.data.pipe(res);
    }
    catch (error) {
        res.status(400).json({ error: error })
        throw error;
    }
}



export default download