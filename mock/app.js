const path = require('path');
const fs = require('fs');
const app = require('express')();
const mock = require('mockjs');
const glob = require('glob');

// 存储所有的api路径
let apiPathArr = [];
// 存储所有的json内容
let apiContArr = [];

init();

app.use(async(req, res) => {
  let data;
  let delay = 0;
  // 检测是否有新文件变更
  let isCheck = await isAddJsonFile();
  if (isCheck) {
    init(true);
  }

  apiContArr.forEach(val => {
    val.forEach(reqData => {
      if (reqData.regexp) {
        if (!new RegExp(reqData.url).test(req.originalUrl)) {
          return false;
        }
      } else if (req.originalUrl !== reqData.url) {
        return false;
      }

      let apiRes = reqData.res;
      data = reqData.mock ? mock.mock(apiRes) : apiRes;
      delay = reqData.delay || 0;
      return true;
    });
  });

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  data !== undefined ? setTimeout(() => res.json(data), delay) : res.sendStatus(404);
});

app.listen('3618', () => {
  console.info('Mock server is listening at 3618');
});

/* 初始化监听 */
async function init(isCancelWatch) {
  // 取消之前文件监听
  if (isCancelWatch) {
    await apiPathArr.forEach(async val => {
      await fs.unwatchFile(val, curr => {
        console.log('API is cancel watch.', curr.mtime);
      });
    });
  }
  let apiPath = path.join(__dirname, './*.json');
  apiPathArr = await getPath(apiPath);
  await getApiContent();
  // 监听JSON文件的变化
  await apiPathArr.forEach(async val => {
    await fs.watchFile(val, curr => {
      console.log('API is updated.', curr.mtime);
      getApiContent();
    });
  });
};

/* 新增一个功能，每次新增文件的时候，需要检测变更文件，可以通过接口访问，重新获取所有json'文件 */
async function isAddJsonFile() {
  let newApiPathArr = await getPath(path.join(__dirname, './*.json'));
  let flag = false;
  for (let i = 0; i < newApiPathArr.length; i++) {
    if (newApiPathArr[i] !== apiPathArr[i]) {
      flag = true;
    }
  }
  return flag;
}

/* 获取所有的json内容 */
function getApiContent() {
  apiPathArr.forEach(async val => {
    await fs.readFile(val, 'utf-8', (err, cont) => {
      if (err) throw err;
      if (!cont) {
        console.log('content must exsit.');
      }
      apiContArr.push(JSON.parse(cont));
    });
  });
};

/* 获取某一目录下所有文件名 */
function getPath(path, options = {}) {
  return new Promise((resolve, reject) => {
    // options is optional
    glob(path, options, (er, files) => {
      if (er) {
        reject(er);
      } else {
        resolve(files);
      }
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.
    });
  });
};
