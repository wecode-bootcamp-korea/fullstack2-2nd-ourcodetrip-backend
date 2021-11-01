export const inputData = async (model, checkColumnName, readData, fileName) => {
  try {
    const filteredData = await checkInputData(model, checkColumnName, readData);
    if (filteredData) {
      console.log('\x1b[31m', `"${filteredData}" value already exist`);
    } else {
      await model.createMany({
        data: readData,
      });
      console.log('\x1b[32m', `${fileName} data upload succeed`);
    }
  } catch (err) {
    console.log('\x1b[31m', `${fileName} data input failed'`);
    console.error(err);
  }
};

export const checkInputData = async (model, checkColumnName, data) => {
  if (!checkColumnName) return '';
  if (!model || !data) {
    return new Error('some parameters are missed');
  }
  const checkData = getValueByColumn(checkColumnName, data);
  for (let value of checkData) {
    if (await model.count({ where: value })) {
      return value[checkColumnName];
    }
  }
  return '';
};

export const getValueByColumn = (checkColumnName, data) => {
  if (!checkColumnName) return '';
  if (!data) return new Error('parameter is missed');
  if (checkColumnName.constructor !== String || data.constructor !== Array) {
    return new Error('invalid parameter');
  }
  const values = [];
  for (let dataRow of data) {
    if (dataRow[checkColumnName]) {
      const dataObj = {};
      dataObj[checkColumnName] = dataRow[checkColumnName];
      values.push(dataObj);
    }
  }
  return values;
};
