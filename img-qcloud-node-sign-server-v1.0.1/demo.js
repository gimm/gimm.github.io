
var fileCloudSign	= require('./fileCloudSign.js');
var $now			= parseInt(Date.now() / 1000);
var $appid			= "201001";
var $secret_id		= "AKID67TUdWd5DwAGnmMxIYEYFiGM2yoknGp2";
var $secret_key		= "xMR4M37Gj8pTRbXKLrpN4m7ghXUc9Tmz";
var $expired		= $now + 2592000;
var $userid			= "123456";

var $mysign = fileCloudSign.app_sign($appid, $secret_id, $secret_key, $expired, $userid);

console.log('$mysign=' + $mysign + ';sign = ' + fileCloudSign.sign);


$url = "http://119.147.7.217/299201/343070703/b0113945-58b522-4ff3-8f83-03705ae26252/orignal";

//绑定资源的签名
var $mysign = fileCloudSign.app_sign_once($appid, $secret_id, $secret_key, $userid, $url);
console.log('$mysign=' + $mysign + ';sign = ' + fileCloudSign.sign + '; fileid =' + fileCloudSign.fileid);
