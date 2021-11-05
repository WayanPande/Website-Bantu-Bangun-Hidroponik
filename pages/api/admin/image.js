
const fs = require('fs/promises')
const formidable = require('formidable')
const path = require('path')

async function handler(req, res) {

    if (req.method === 'POST') {


        const uploadFolder = path.join('./public/images');
        const form = new formidable.IncomingForm({
            uploadDir: uploadFolder,
            maxFileSize: 50 * 1024 * 1024,
            keepExtensions: true,
            keepFilenames: true
        });

        form.maxFileSize = 50 * 1024 * 1024; // 5MB
        form.uploadDir = uploadFolder;
        form.keepFilenames = true;

        let imgFileName;

        form.parse(req, (err, fields, files) => {

            // fs.rename(files.file.filepath, uploadFolder + "\\" + "p0031.jpg", function (err) {
            //     if (err) throw err;
            //     console.log('File Renamed.');
            // })

            imgFileName = files.file.filepath

            if (err) {
                console.log("Error parsing the files");
                return res.status(400).json({
                    status: "Fail",
                    message: "There was an error parsing the files",
                    error: err,
                });
            }
            res.status(200).json({ message: "Upload Success", imgName: imgFileName });
        });

    }

}

export default handler


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};