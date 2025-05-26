import express from 'express';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/api/generate-variation', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        const form = new FormData();
        form.append('image', fs.createReadStream(imagePath));
        form.append('n', 1);
        form.append('size', '1024x1024');

        const response = await axios.post('https://api.openai.com/v1/images/variations', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        fs.unlinkSync(imagePath); // stergem imaginea temporara

        const imageUrl = response.data.data[0].url;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Eroare la generarea imaginii:', error.response?.data || error.message);
        res.status(500).json({ error: 'Eroare la generarea variației imaginii.' });
    }
});

export default router;
