const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9nMlRzdkpYM3BrbkFxQjdNTnBSOU9kUG5PZ1o5dWxXMnBrZi9VN1ZFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTVnZGZ2SHdNQVpjdXBHclJDM2xVWWEzY2RWSFRObTZ2WmJweXN3ZWt4dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTG5IUnNGT20vdjZaT1E4NC96cEozMXNtdlhuSjhsa0NCNCtPVi8vaWtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmVVNRRDNNdlk4RzV0MGFDTVhCSXVWNnNXeXgzNTNGR2ZMQ2JXUTRqUWdVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNDdm5mQmljSDdFTW9tanNHVEoyQlFQUHZ4U2x2UHZWSXN4U3h0ZnBkRWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJwMldVaTFyMlM2bmxscHFydVFDRDVSR3E5MXMycHRDV2tBMmxFUmZhQ2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk1IamQ5dDlvSEptczFBZ1dmRGNOREJ5R1VwOG9MZnR0elltalFPTk9Hcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWJ6K01aamxKeWVoRk5NcHNQYmdlY1NwQk1rdlJWY0xkekpqc2RYNmwzOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InF2NnpCb2xDUnY3ZGJvQ1JDQ0h0a1pscEs4ZE1TRXE5WWJ6ajBuTEYxQWNvVFowb3NITmlCbm44Nkw5SWVZNnkzc1J5ODE3Z2xMbUhTcTk2aVlOSkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6IlMxam5TYzBxVkp5cXp6cTBpSXpNeHZuYmVQOW1yUlZsbHJPRFlJVHBCL009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MTQ4MzEzODdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRjUyNTE4RjdDODg1MUY4OUVEOUExRTg3RjA1RENEODkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDg4MjE5NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoibVRfSTNPMi1RQi1SVjFSZ2otZzVPZyIsInBob25lSWQiOiIxODMzZjBhZi0zODZlLTQ5ZGQtODQyNi03MzdiODE1OTZhMDYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTNXZ2hmaUNiOEtzeE0vYnFXd3cvK0lTMllFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR2QmxUMVB2OHhJRXlYUmRFbXFUdGNmVWpOWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJRMzdENlRMTSIsIm1lIjp7ImlkIjoiOTQ3MTQ4MzEzODc6NjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoieXVyZXNoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJeW84YXdDRUlEbm9Mc0dHRTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvcnFrbTlXbkxlazdrek90QmdzUy90YjF1b0RLM2x0TGc0Zi9MZmlFNGtBPSIsImFjY291bnRTaWduYXR1cmUiOiJxSzZoMlZkTXY0di9tZThodnZtSHZ5bnB2TnpGZFNEcU5ZZjVDNGZTcFBOS2ZhYTBrb080bncrRHFmL2MxWFUwWklCSWQxZ0t4cDlNL3BwSzZrSUpEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOVl1SVVOMzdpaDVtVm5rekhTV2lDbE40QWFyVlBPVGJ4elg4dVAzRFJ3S2pabk1QUlpyd21vMHcxV1VlYjNjMFdTM3NwUnRwaUdwQk1BYjc3bVNURHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcxNDgzMTM4Nzo2MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmNjZwSnZWcHkzcE81TXpyUVlMRXY3VzlicUF5dDViUzRPSC95MzRoT0pBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0ODgyMTg5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo4WCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "YURESH KAVINDU",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 255752593977",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'YURESH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://backiee.com/static/wallpapers/560x315/317897.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
