import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

interface IUpload {
  files: FileUpload[];
}

@Injectable()
export class LectureService {
  async createMulti({ files }: IUpload) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const waitedFiles = await Promise.all(files);
    const urls = await Promise.all(
      waitedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            file
              .createReadStream()
              .pipe(storage.file(file.filename).createWriteStream())
              .on('finish', () =>
                resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
              )
              .on('error', (error) => reject(error));
          }),
      ),
    );
    return urls;
  }
}
