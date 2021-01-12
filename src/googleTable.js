import {GoogleSpreadsheet} from 'google-spreadsheet';
import moment from 'moment-timezone';

const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

export const init = async () => {
  await doc.useServiceAccountAuth({
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  });
};

const getCurrentDateTime = () => moment().tz('Europe/Moscow').format('yyyy.MM.DD HH:mm:ss');

const addFeedback = async ({routeNumber, category, phoneNumber, geoLatitude, geoLongitude}) => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRows([
    [category, routeNumber, phoneNumber, geoLatitude, geoLongitude, getCurrentDateTime()]
  ]);
};

export default addFeedback;
