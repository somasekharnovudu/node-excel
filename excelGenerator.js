const ExcelJS = require('exceljs');
const axios = require('axios');

async function getExcel() {
    const workbook = new ExcelJS.Workbook();
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');

    const userData = response.data;
    const sheet = workbook.addWorksheet('User data', { views: [{ state: 'frozen', ySplit: 1 }] });
    const headerRow = ['Name', 'Email', 'Username', 'City', 'Company'];
    sheet.addRow(headerRow);
    userData.forEach(userInfo => {
        const rowdata = [userInfo.name, userInfo.email, userInfo.username, userInfo.address.city,userInfo.company.name];
        sheet.addRow(rowdata)
    })
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer
}

module.exports = getExcel;