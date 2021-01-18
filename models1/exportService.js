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
    const data = result.map(question => {
        return [question.id, question.name, question.option_state-1,question.option_state-2,question.option_state-3,question.option_state-4,question.response,question.correct_answer,question.isCorrect];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

module.exports = exportResponseToExcel;
