const xlsx = require('xlsx');
const path = require('path');
const readline = require('readline');

function handleXls(path) {
  const content = xlsx.read(path);
  const xls_s1 = content.Sheets.Sheet1;
  const head_reg = /^[a-zA-Z]{1}1$/;
  const xls_header = [];
  const xls_content = [];
  const xls_length = xls_s1['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1];
  const xls_end_char = xls_s1['!ref'].replace(/[0-9]/g, '').split(':')[1];
  for (k in xls_s1) {
    if (head_reg.test(k)) {
      xls_header.push(xls_s1[k].v);
    }
  }

  for (let i = 2; i <= xls_length; i++) {
    xls_content.push([]);
    for (let j = 65; j <= xls_end_char.charCodeAt(); j++) {
      xls_content[i - 2].push(xls_s1[String.fromCharCode(j) + i].v);
    }
  }

  console.log(xls_content);
}

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入文件路径：', (answer) => {
  rl.close();
  handleXls(answer);
});

rl.on('close', () => {});
