import "dotenv/config";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";


const ROOT = dirname(fileURLToPath(import.meta.url));


const {
    MYSQL_HOST,
MYSQL_USER,
MYSQL_PASSWORD,
MYSQL_DATABASE,
SECRET,
UPLOADS_DIR,
VIDEO_DIR,
NODE_ENV,
PORT,
CLIENT,
PROJECTS_DIR,
TEMP_DIR

 
} = process.env;

export {PORT,
    ROOT,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    SECRET,
    UPLOADS_DIR,
    VIDEO_DIR,
    NODE_ENV,
    CLIENT,
    PROJECTS_DIR,
    TEMP_DIR

};
