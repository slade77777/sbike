export enum FileExtension {
  CSV = 'csv',
  EXCEL = 'xlsx',
}

export function exportToExcel(
  _csvData: Array<any>,
  _fileName: string,
  _fileExtension: FileExtension,
) {
  console.log('Web-only function');
}
