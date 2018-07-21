var globalWindowAttr = 'width=752,height=530,top=100,left=100,status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=yes,location=no,titlebar=no';
var href_str="http://www17.53kf.com/webCompany.php?arg=10032978&style=1&keyword=&kf=";
function open_pic_chat()
{
	try{
	var chat_win= window.open(href_str,'_blank',globalWindowAttr);
	chat_win.focus();
	}catch(e){
		
	}
}