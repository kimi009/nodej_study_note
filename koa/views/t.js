;(function(){
  //数字0-9，大写字母，小写字母，ASCII或UNICODE编码（十进制），共62个
  var charCodeIndex = [[48,57],[65,90],[97,122]];
  var charCodeArr = [];

  function getBetweenRound(min,max){
      return Math.floor(min+Math.random()*(max-min));
  };

  function getCharCode(){
      for(var i=0,len=3;i<len;i++){
          var thisArr = charCodeIndex[i];
          for(var j=thisArr[0],thisLen=thisArr[1];j<=thisLen;j++){
              charCodeArr.push(j);
          }
      }
  }

  function ranStr(slen){
      slen = slen || 40;
      charCodeArr.length<62 && getCharCode();

      var res = [];
      for(var i=0;i<slen;i++){
          var index = getBetweenRound(0,61);
          res.push(String.fromCharCode(charCodeArr[index]));
      }
      return res.join('');
  };

  this.ranStr = ranStr();
  console.log(this.ranStr)
})();