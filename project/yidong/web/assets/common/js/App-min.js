(function(b){if(typeof App=="undefined")App={};App.citys={init:function(a,d,e,c,f,i){var j=this;if(typeof a=="undefined"||typeof d=="undefined")return false;if(typeof f=="undefined"){var g=b("<option value=''>城市</option>");g.appendTo(b(a));g=b("<option value=''>地区</option>");g.appendTo(b(d))}else b(a).attr("disabled","disabled");for(var h in e){g=b("<option ></option>");g.val(e[h].id);typeof f=="undefined"?g.html(e[h].cname):g.html(e[h].oldname);typeof f!="undefined"&&f==e[h].id&&g.attr("selected",
"selected");g.appendTo(b(a))}b(a).change(function(){j.changed(b(d),c[b(this).val()],i)});typeof f!="undefined"&&b(a).trigger("change")},changed:function(a,d,e){a.find("option:not(:first)").remove();for(var c in d){var f=b("<option ></option>");f.val(d[c].qz_areaid);f.html(d[c].oldName);typeof e!="undefined"&&e==d[c].qz_areaid&&f.attr("selected","selected");f.appendTo(a)}}};App.validate={run:function(a,d,e){var c=false;switch(d){case "num":c=this.validate_numberic(a);break;case "tel":c=this.validate_tel(a);
break;case "email":c=this.validate_email(a);break;case "decimal":c=this.validate_decimal(a);break;case "moblie":c=this.validate_moblie(a);break;case "length":c=this.validate_length(a,e);break;case "blend":c=this.validate_blend(a);break;case "specialchar":c=this.validate_specialchar(a);break;default:c=this.validate_string(a);break}return c},validate_specialchar:function(a){if(/[\`~!@#$%^&*\(\)_+<>?:"{},.\/;\[\]\-]/i.test(a))return false;return true},validate_string:function(a){if(a==""||a.length<=
0)return false;return true},validate_numberic:function(a){if(!/^[0-9]+$/i.test(a))return false;return true},validate_decimal:function(a){if(!/^[0-9]+(\.[0-9]{1,2})?$/i.test(a))return false;return true},validate_tel:function(a){if(!/^([0-9]{3,4}\-)?([0-9]{7,8})$|^[0-9]{11}$/i.test(a))return false;return true},validate_moblie:function(a){if(!/^[1]{1}[0-9]{10}$/i.test(a))return false;return true},validate_email:function(a){if(!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/i.test(a))return false;
return true},validate_length:function(a,d){if(a<d)return false;return true},validate_blend:function(a){if(!/^(?=.*[a-z_\-])[0-9a-z][a-z0-9_\-]+$/i.test(a))return false;return true}};App.SMS={run:function(a,d){b.ajax({url:"http://api.qizuang.com/zbfb/dispatcher",type:"POST",dataType:"JSON",timeOut:3E3,xhrFields:{withCredentials:true},crossDomain:true,data:{type:"sms",action:"load",savedata:a}}).done(function(e){if(e.status==1){b("body").append(e.data);b(".win_sms").fadeIn(400);b(".win_smsmain .botton").click(function(){b(".win_smsmain .tip").html("");
b(".win_smsmain .focus").removeClass("focus");b(this);if(!App.validate.run(b(".win_smsmain input[name=tel]").val(),"string")){b(".win_smsmain input[name=tel]").focus();b(".win_smsmain input[name=tel]").addClass("focus");b(".win_smsmain .tip").html("请填写手机号");return false}if(!App.validate.run(b(".win_smsmain input[name=tel]").val(),"moblie")){b(".win_smsmain input[name=tel]").focus();b(".win_smsmain input[name=tel]").addClass("focus");b(".win_smsmain .tip").html("无效的手机号");return false}if(!App.validate.run(b(".win_smsmain input[name=code]").val(),
"string")){b(".win_smsmain input[name=code]").focus();b(".win_smsmain input[name=code]").addClass("focus");b(".win_smsmain .tip").html("请填写验证码");return false}b.ajax({url:"http://api.qizuang.com/sms/verifysmscode",type:"POST",dataType:"JSON",xhrFields:{withCredentials:true},crossDomain:true,data:{code:b(".win_smsmain input[name=code]").val(),tel:b(".win_smsmain input[name=tel]").val()},success:function(c){if(c.status==1){b(".win_sms").remove();b(".popOut").remove();typeof d=="function"&&d()}else b(".win_smsmain .tip").html(c.info)},
error:function(){b(".win_smsmain .tip").html("提交失败,请稍后再试！")}})})}})}}})(jQuery);
