(function(){
    // 定义App
    if(typeof App == "undefined"){
        App = {}
    }
    // 定义App
    App.validate ={
        run:function(value,type,length){
            var _this = this;
            var flag = false;
            switch(type){
                case "num":
                flag = _this.validate_numberic(value);
                    break;
                case "tel":
                flag =  _this.validate_tel(value);
                    break;
                case "email":
                flag =  _this.validate_email(value);
                    break;
                case "decimal":
                flag =  _this.validate_decimal(value,length);
                    break;
                case "moblie":
                flag =  _this.validate_moblie(value);
                    break;
                case "length":
                flag =  _this.validate_length(value,length);
                    break;
                case "blend":
                flag =  _this.validate_blend(value);
                    break;
                case "maxlength":
                flag =  _this.validate_maxlength(value,length);
                    break;
                case "specialchar":
                flag =  _this.validate_specialchar(value);
                    break;
                default:
                flag =  _this.validate_string(value);
                    break;
            }
            return flag;
        },
        validate_specialchar:function(value){
            var reg = /[\`~!@#$%^&*\(\)_+<>?:"{},.\/;\[\]\-]/i;
            if(reg.test(value)){
                return false;
            }
            return true;
        },
        validate_string:function(value){
            //验证字符串
            if(value == "" || value.length <=0){
                return false;
            }
            return true;
        },
        validate_numberic:function(value){
            //验证纯数字
            var reg = /^[0-9]+$/i;
            if(!reg.test(value)){
                return false;
            }
            return true;
        },
        validate_decimal:function(value){
            //验证小数点2位
            var reg = /^[0-9]{1,4}(\.[0-9]{1,2})?$/i;
            if(!reg.test(value)){
                return false;
            }
            return true;
        },
        validate_tel:function(value){
            //验证电话/手机
            var reg = /^([0-9]{3,4}\-)?([0-9]{7,8})$|^[0-9]{11}$/i;
            if(!reg.test(value)){
                return false;
            }
            return true;
        },
        validate_moblie:function(value){
            //验证电话/手机
            var reg = /^[1]{1}[0-9]{10}$/i;
            if(!reg.test(value)){
                return false;
            }
            return true;
        },
        validate_email:function(value){
            //验证邮箱地址
            var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/i;
            if(!reg.test(value)){
                return false;
            }
            return true;
        },
        validate_length:function(value,length){
            //验证最少字符串长度
            if(value < length){
                return false;
            }
            return true;
        },
        validate_maxlength:function(value,length){
            //验证最大字符串长度
            if(value > length){
                return false;
            }
            return true;
        },
        validate_blend:function(value){
            //混合字符，不能纯字母或数字
            var reg = /^(?=.*[a-z_\-])[0-9a-z][a-z0-9_\-]+$/i;
            if(!reg.test(value)){
                return false;
            }
            return true;
        }
    }




})(jQuery)
