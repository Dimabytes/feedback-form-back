import {GoogleSpreadsheet} from 'google-spreadsheet';
import moment from 'moment-timezone';

const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

export const init = async () => {
  await doc.useServiceAccountAuth({
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  });
};

const defaultTimezone = 'Europe/Moscow';

const getCurrentDate = () => moment().tz(defaultTimezone).format('DD/MM/yyyy');
const getCurrentTime = () => moment().tz(defaultTimezone).format('HH:mm:ss');

const addFeedback = async ({routeNumber, category, phoneNumber, geoLatitude, geoLongitude}) => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRows([
    [
      category,
      routeNumber,
      phoneNumber,
      geoLatitude,
      geoLongitude,
      getCurrentDate(),
      getCurrentTime()
    ]
  ]);
};

export default addFeedback;
