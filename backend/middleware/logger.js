const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); 

const BASE_URL = 'http://20.244.56.144/evaluation-service/logs';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0ZWplc3dhcnJlZGR5QGxwdS5pbiIsImV4cCI6MTc1MjQ3MjI4NywiaWF0IjoxNzUyNDcxMzg3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2M5MWUxMmMtNjA3OC00ZmZhLWJjZTQtOTU0Yjc4NGUyMmMyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaXNpIHJlZGR5IHRlamVzd2FyIHJlZGR5Iiwic3ViIjoiZGQxODBmMGMtOWQwOC00ZWU5LWFhMDYtZjFlYjZlMTZkZjkxIn0sImVtYWlsIjoidGVqZXN3YXJyZWRkeUBscHUuaW4iLCJuYW1lIjoiaXNpIHJlZGR5IHRlamVzd2FyIHJlZGR5Iiwicm9sbE5vIjoiMTIyMTA3NzIiLCJhY2Nlc3NDb2RlIjoiQ1p5cFFLIiwiY2xpZW50SUQiOiJkZDE4MGYwYy05ZDA4LTRlZTktYWEwNi1mMWViNmUxNmRmOTEiLCJjbGllbnRTZWNyZXQiOiJyU1FCcVVQR1NyZHpEZ25GIn0.D5VyFtv9obkCAFPc5Rgu6PypbI7TUbffBoUln4XJqCA';

async function Log(stack, level, pkg, message) {
  try {
    await axios.post(BASE_URL, {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message
    }, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Log failed:', err.message);
  }
}

module.exports = Log;
