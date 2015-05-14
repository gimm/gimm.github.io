


var crypto = require('crypto');
this.fileid = '';
this.get_fileid_from_url = function($url){
	if ($url.substr(0, 7) != 'http://') {
        return -1;
    }
	
    var $urlPartArr = $url.substr(7).split('/');
	
    if ($urlPartArr.length >= 4) {
        this.fileid = $urlPartArr[3];
        return 0;
    }
    if ($urlPartArr.length >= 2) {
        var tmpStr = $urlPartArr[1].split('.');
        this.fileid = tmpStr[0];
        return 0;
    }
    return -2;
}

this.app_sign_base = function($appid, $secret_id, $secret_key, $expired, $userid, $url){
	var $now			= parseInt(Date.now() / 1000);
	var $rdm			= parseInt(Math.random() * Math.pow(2, 32));
	var $puserid		= '';
	var $fileid			= null;

    if (!$secret_id.length || !$secret_key.length){
        return -1;
    }

	if(typeof $userid === 'string'){
		if($userid.length > 64){
			return -2;
		}
		
		$puserid = $userid;
	}
	
	if(typeof $url === 'string'){
		
		if($url.length > 256){
			return -3;
		}

        if ($url) {
            var ret = this.get_fileid_from_url($url);
            if (ret != 0) {
                return -3;
            }
        }
	}
	
	var $plain_text = 'a=' + $appid+'&k=' + $secret_id+'&e='+$expired+'&t='+$now+'&r='+$rdm+'&u='+$puserid+'&f='+this.fileid;
	
	var data = new Buffer($plain_text,'utf-8');
	
	var res = crypto.createHmac('sha1',$secret_key).update(data).digest();
	
	var bin	= Buffer.concat([res,data]);
	
	this.sign = bin.toString('base64');
    return 0;
}



/**
 @func   app_sign    时效性签名
 @param  appid       Qcloud上申请的业务IDhttp://app.qcloud.com
 @param  secret_id   Qcloud上申请的密钥id
 @param  secret_key  Qcloud上申请的密钥key
 @param  expired     签名过期时间
 @param  userid      业务账号系统,没有可以不填
 @param  sign        生成的签名
 */
this.app_sign = function($appid, $secret_id, $secret_key, $expired, $userid){
	return this.app_sign_base($appid, $secret_id, $secret_key, $expired, $userid, '');
}

/**
 @func   app_sign_once   绑定资源的签名,只有这个资源可以使用
 @param  appid       Qcloud上申请的业务IDhttp://app.qcloud.com
 @param  secret_id   Qcloud上申请的密钥id
 @param  secret_key  Qcloud上申请的密钥key
 @param  userid      业务账号系统,没有可以不填
 @param  url         签名绑定的资源
 @param  sign        生成的签名
 */
this.app_sign_once = function($appid, $secret_id, $secret_key, $userid, $url){
	return this.app_sign_base($appid, $secret_id, $secret_key, 0, $userid, $url);
}



