import multer from "multer";
import { Request } from "express";
import { v4 as uuid4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "public/audios");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const extName = path.extname(file.originalname);
    const fileName = `${uuid4()}.${extName}`;
    cb(null, fileName);
  }
});

const audioMiddleware = multer({ storage: storage });
export default audioMiddleware;
