import fs from 'fs';
import unzip from 'unzipper';

export async function extractFiles(file: any) {
    const files: any = [];
    await fs
        .createReadStream(file.path)
        .pipe(unzip.Parse())
        .on('entry', async (entry: any) => {
            // Cleanup system hidden files (or drop this code if not needed)
            if (entry.type !== 'File' || /^__MACOSX/.test(entry.path) || /.DS_Store/.test(entry.path)) {
                entry.autodrain();

                return;
            }

            const pathArr = entry.path.split('/');
            const path = entry.path;
            const buffer = await entry.buffer();
            files.push({ buffer, path, originalFilename: pathArr[pathArr.length - 1] });
        })
        .promise();

    return files;
}
