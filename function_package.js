module.exports = {
  res_type: (status, message, payload) => {
    return {
      status: status,
      message: message,
      payload: payload,
    };
  },
  /* 範例格式
          {
              "status":200,

              //obj、null
              "payload":{
                  "功能名稱_type":"single、multiple、All",
                  "功能名稱_自訂":"accessToken"
              },

              "message":"msgString"
          } 
      */
};
