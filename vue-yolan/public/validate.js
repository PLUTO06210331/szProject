var validate = function(isRequire,type,word,length){
  var validateNumber = (rule, value, callback) => {
    if (value === "" || value === null) {
      if(!isRequire) callback()
      callback(new Error('请输入'+word));
    } else {
      if (!/^[0-9]*$/.test(value) && type == 'number') {
        callback(new Error(word+'为数字'));
      } else if (value.length > length) {
        callback(new Error('最多输入'+length+'位'));
      } else {
        callback();
      }
    }
  };
  return validateNumber
}
export default validate
