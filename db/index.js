// import mongoose from 'mongoose';
// import mysql from 'mysql';

// const DB_URL =
//   process.env.MONGODB_URL ||
//   'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.js 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';

// mongoose.connect(DB_URL);
// const db = mongoose.connection;

// db.on('connected', () =>
//   console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL)
// );
// db.on('error', (error) =>
//   console.error('\nMongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error)
// );

// const SQL_URL =
//   process.env.DATABASE_URL ||
//   'sqlDB 서버 주소가 설정되지 않았습니다.\n./db/index.js 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n';

// const mysqlConnection = mysql.createConnection({
//   host: 'database-1.ct5cv6vmptr1.ap-northeast-2.rds.amazonaws.com',
//   user: 'admin',
//   password: 'testtest',
//   database: 'kakaoStagram',
// });
// mysqlConnection.connect();

// user-model.js 에서 export { ~~ } 한 모듈을 그대로 다시 export해 줌
// 이렇게 하면, 나중에 import 할 때 코드가 짧아짐
// 예시로, import userModel from '../db/models/user-model' 대신 from '../db' 가 됨
// '../db/index.js' 에서 index.js 는 생략 가능하므로, '../db' 면 됨 (index는 특별한 용어)

export * from './models/user-model.js';
export * from './models/post-model.js';
export * from './models/bookmark-model.js';
export * from './models/comment-model.js';
