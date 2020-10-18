import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

export enum FileExtension {
  CSV = 'csv',
  EXCEL = 'xlsx',
}

export function exportToExcel(
  csvData: Array<any>,
  fileName: string,
  fileExtension: FileExtension,
) {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = {Sheets: {data: ws}, SheetNames: ['data']};
  const excelBuffer = XLSX.write(wb, {bookType: fileExtension, type: 'array'});
  // eslint-disable-next-line no-undef
  const data = new Blob([excelBuffer], {type: FILE_TYPE});
  FileSaver.saveAs(data, `${fileName}.${fileExtension}`);
}
