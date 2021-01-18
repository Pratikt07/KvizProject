const xlsx = require('xlsx');
const path = require('path');

const exportExcel = async (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    
    await xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportResponseToExcel = (result, workSheetColumnNames, workSheetName, filePath) => {
    var id = 0;
    const data = result.map(question => {

        return [++id, question.Question_statement, question.option_state1,question.option_state2,question.option_state3,question.option_state4,question.response,question.correct_Answer,question.CorrectOrIncorrect];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

module.exports = exportResponseToExcel;
