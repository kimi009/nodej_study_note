({POP_PROPOSE : "true" == "true",  
  DEF_FTN_MAXFILESIZE : +"3221225472",
  CUSTOM_STATIONERY_COUNT : "0",
  DEF_STATIONERY_ID : '0',
  DEF_STATIONERY_HEADER : '',
  DEF_STATIONERY_BOTTOM : '',
  DEF_MAIL_FROM : '444812002@qq.com',
  DEF_FONT_FAMILY : "",
  DEF_FONT_SIZE : "",
  DEF_FONT_COLOR : "",
  ALL_SENDER_INFO : [{folderid : "", 
  email : "444812002@qq.com", nickname : "kimi", signid : "-1", smtp:"0", type:"0", phone:"0", smsleft:"0", smsnotify:"0" }],
  DEF_SPELLCHECK : "0",DEF_MAILZOOMTOOL : "0",DEF_TRANSLATE : "0",DEF_OPEN_AD : "",WEBAPNSENABLE : "1",IOSWEBAPPVER: "0",
  IOSWEBAPPVERNEW : "",ANDROIDWEBAPPVER: "1",ANDROIDWEBAPPVERNEW : "5.5.3.10132390",APP_PROMOTE_SHOW: "0",
  DEF_RECOGNIZENICKNAME : false,RealDefaulSender : '444812002@qq.com' || '444812002@qq.com',
  RealUserAlias : ["444812002@qq.com", ""],PopFldSendDef : "0" == "0" ? 0 : 1,
  RealDefaultSaveSendbox : "0" == "0" ? 0 : 1,RealDefaultEditor : "0" == "0" ? 0 : 1,
  RealUserDefaultStationeryHeader : '',RealUserDefaultStationeryBottom : '',
  HasDefaultStationery : "0" == "1",NetDisk :{bIsSpread : true,
    oTips : {"readmail" :{sId : 84,sMsg : '<span class="black">你可以将附件保存到网盘。</span>',
    sArrowType : "up",bIsShowed : true}},oBound : {"weiyun" : {sId : "1",sAlias : "weiyun",sLabel : "微云",
    sUserid : "444812002",sUsername : "444812002"} },nMax : 1,nNum : +"1" },
    GetCurrentSenderObj : (function(){var _index = {};var _datas = [{folderid : "",
     email : "444812002@qq.com", nickname : "kimi", signid : "-1", smtp:"0", type:"0", phone:"0", smsleft:"0", smsnotify:"0" }];
     for (var i = 0; i < _datas.length; i++){_index[_datas[ i ].email] = _datas[ i ];}
     var _sender = '444812002@qq.com' || '444812002@qq.com';return _index[_sender] || null;})(),
     HasSignature : (function(){try{var _index = {};
     var _datas = [{folderid : "", email : "444812002@qq.com", nickname : "kimi", signid : "-1", smtp:"0", type:"0", phone:"0", smsleft:"0", 
     smsnotify:"0" }];for (var i = 0; i < _datas.length; i++){_index[_datas[ i ].email] = _datas[ i ];}
     var _sender = '444812002@qq.com' || '444812002@qq.com';return (_index[_sender] || null).signid != "-1";}catch(e){}return false;})(),
     RealUserSignatureId : (function(){try{var _index = {};var _datas = [{folderid : "", email : "444812002@qq.com", 
     nickname : "kimi", signid : "-1", smtp:"0", type:"0", phone:"0", smsleft:"0", smsnotify:"0" }];
     for (var i = 0; i < _datas.length; i++){_index[_datas[ i ].email] = _datas[ i ];}var _sender = '444812002@qq.com' || '444812002@qq.com';
     return (_index[_sender] || null).signid;}catch(e){}return null;})(),
     RealAllSignature : {last : []},
     getRealUserSignature : function( _aFolderId, _aSaveFrom ){
       var _signid;if ( _aFolderId || _aSaveFrom ){var _datas = getTop().goUserInfo.get( "ALL_SENDER_INFO") || [];
       for ( var i = 0; i < _datas.length; i ++ ) {var _data = _datas[ i ];
        if ( ( _aFolderId && _aFolderId == _data.folderid ) || ( _aSaveFrom && _aSaveFrom == _data.email ) ){_signid= _data.signid == -1 ? null : _data.signid;
          break;}}}if ( !_signid ){_signid = getTop().goUserInfo.get('RealUserSignatureId');}
          var _sign = ( getTop().goUserInfo.get('RealAllSignature')[ _signid ] || [] )[ 0 ];
          return _sign ?
           getTop().T([ '<div><sign signid="#signid#">#sign#</sign></div>','<div>&nbsp;</div>'], "#" ).replace({signid: _signid,sign: _sign ?
             ( getTop().getSignatureHeader() + getTop().filteSignatureTag( _sign ) ) : ""}) : "";},
             RealDefaultAllMail : [{folderid : "", email : "444812002@qq.com", nickname : "kimi", signid : "-1", smtp:"0", type:"0", phone:"0", smsleft:"0",
              smsnotify:"0" }] || [],RealOpenSpellCheck : "0" == "1",RealIsQQClub : "" == "club",RealUserNick : "kimi",
              RealBindAccount : (function(){var othermail = [], mastermail = [], bizmail = [];
                return {self: {uin : "444812002",unread:"481"},othermail : othermail,mastermail : mastermail,bizmail : bizmail}})(),
                RealRecognizeNickName : false})