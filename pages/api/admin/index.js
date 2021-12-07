import { connectDatabase, countDocument, deleteOneProduct, getAllData, getAllDataReverse, getAllDocuments, getLastData, insertDocument, updateBlogPost, updateOrderStatus, updateProductData } from "../../../helpers/db-util";
const fs = require('fs/promises')
const path = require('path')

async function handler(req, res) {

    let client

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'GET') {

        try {
            const documents = await getAllDataReverse(client, 'order');
            res.status(200).json({ items: documents });
        } catch (error) {
            res.status(500).json({ message: 'Getting items failed!' });
        }


    }

    if (req.method === 'PUT') {
        const type = req.body.type
        const data = req.body.items

        if (type === 'update-product') {
            try {
                const documents = await updateProductData(client, 'product', data);
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Updating item failed!' });
            }
        }

        if (type === 'update-post') {
            try {
                const documents = await updateBlogPost(client, 'blog', data);
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Updating item failed!' });
            }
        }

        if (type === 'update-status') {

            try {
                const documents = await updateOrderStatus(client, 'order', data);
                res.status(200).json({ message: 'Success' });
            } catch (error) {
                res.status(500).json({ message: 'Updating item failed!' });
            }
        }


    }

    if (req.method === 'POST') {
        const type = req.body.type

        if (type === 'insert-product') {
            const data = req.body.items
            try {
                const documents = await insertDocument(client, 'product', data);
                res.status(200).json({ message: 'Success' });
            } catch (error) {
                res.status(500).json({ message: 'Adding item failed!' });
            }
        }

        if (type === 'insert-post') {
            const data = req.body.items
            try {
                const documents = await insertDocument(client, 'blog', data);
                res.status(200).json({ message: 'Success' });
            } catch (error) {
                res.status(500).json({ message: 'Adding post failed!' });
            }
        }


        if (type === 'get-last-product') {
            try {
                const documents = await getLastData(client, 'product');
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }

        if (type === 'get-last-post') {
            try {
                const documents = await getLastData(client, 'blog');
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }

        if (type === 'get-all-orders') {
            try {
                const documents = await getAllDataReverse(client, 'order');
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }

        if (type === 'update-img-name') {
            const imgPath = req.body.imgName
            const id = req.body.id
            let uploadFolder
            if (id[0] === 'p') {
                uploadFolder = path.join('./public/images/produk');
            } else if (id[0] === 'i') {
                uploadFolder = path.join('./public/images/informasi');
            }

            fs.rename(imgPath, uploadFolder + "\\" + id + ".jpg", function (err) {
                if (err) throw err;
                console.log('File Renamed.');
            })
            res.status(200).json({ message: "Rename Success" });
        }

        if (type === 'get-total-user') {
            try {
                const documents = await countDocument(client, 'users');
                res.status(200).json({ items: documents });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }

    }

    if (req.method === 'DELETE') {
        const type = req.body.type

        if (type === 'delete-product') {
            const id = req.body.id

            try {
                const documents = await deleteOneProduct(client, 'product', id);
                fs.unlink('./public/images/produk/' + id + '.jpg', function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
                res.status(200).json({ message: 'Item deleted' });
            } catch (error) {
                res.status(500).json({ message: 'Getting items failed!' });
            }
        }

        if (type === 'delete-pict') {
            const id = req.body.id
            let location;

            if (id[0] === 'p') {
                location = './public/images/produk/' + id + '.jpg';
            } else if (id[0] === 'i') {
                location = './public/images/informasi/' + id + '.jpg';
            }


            try {
                fs.unlink(location, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
                res.status(200).json({ message: 'Image deleted' });
            } catch (error) {
                res.status(500).json({ message: 'failed to delete image!' });
            }
        }

    }


}

export default handler;