const express = require('express');
const app = express();
const generateExcel = require('./excelGenerator')

app.get('/', (req, resp) => {
    resp.status(200).send({ message: 'Please access /api/v1/getExcel for download' })
})

app.get('/api/v1/getExcel', (req, resp) => {
    generateExcel().then((fileBuffer) => {
        resp.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        resp.setHeader('Content-Disposition',"attachment; filename=" + `userData.xlsx`);
        resp.status(200);
        resp.end(Buffer.from(fileBuffer, 'base64'));
    }).catch((err) => {
        console.log('== Error', err);
        resp.status(500).send({ message: 'Not able to generate document' })
    })

})

app.listen(3000, () => {
    console.log('=== listening on port 3000');
})