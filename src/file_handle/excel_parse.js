const xlsx = require('xlsx');
const path = require('path');

const xls = xlsx.readFile(path.normalize('..', 'asset', 'test.xlsx'));
const xls_s1 = xls.Sheets.Sheet1;
const head_reg = /^[a-zA-Z]{1}1$/;
const xls_header = [];
const xls_content = [];
const xls_length = xls_s1['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1];
const xls_end_char = xls_s1['!ref'].replace(/[0-9]/g, '').split(':')[1];
for(k in xls_s1) {
    if(head_reg.test(k)) {
        xls_header.push(xls_s1[k].v);
    }
}

for(let i = 2; i <= xls_length; i++) {
    xls_content.push([]);
    for(let j = 65; j <= xls_end_char.charCodeAt(); j++) {
        xls_content[i - 2].push(xls_s1[String.fromCharCode(j) + i].v);
    }
}

console.log(xls_content);
