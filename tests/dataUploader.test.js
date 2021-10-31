import { readFile } from '../src/utils/dataUploader/dataReader';
import {
  getValueByColumn,
  checkInputData,
  inputData,
} from '../src/utils/dataUploader/dataWriter';
import {
  validFileName,
  invalidFileName,
  checkColumnName,
  data,
} from './data/dataUploader';

describe('dataReader - readFile', () => {
  test('case 1', async () => {
    await expect(await readFile(validFileName)).toMatchObject([
      { name: 'test01' },
      { name: 'test02' },
    ]);
  });

  test('case 0', async () => {
    await expect(readFile()).rejects.toEqual({
      error: 'No such file or directory',
    });
  });

  test('case -1', async () => {
    await expect(readFile(invalidFileName)).rejects.toEqual({
      error: 'No such file or directory',
    });
  });
});

describe('dataWriter - getValueByColumn', () => {
  test('case 1', () => {
    expect(getValueByColumn(checkColumnName, data)).toMatchObject([
      { name: 'test01' },
      { name: 'test02' },
    ]);
  });

  test('case 0', () => {
    expect(getValueByColumn()).toEqual(new Error('parameter is missed'));
  });

  test('case -1', () => {
    expect(getValueByColumn(checkColumnName, new Object())).toEqual(
      new Error('invalid parameter')
    );
  });
});
