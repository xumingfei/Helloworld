Object.extend = function(destination, source) {
    for ( var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

var NJsonObject = new Object();
NJsonObject.isEmpty = function(value){
    if(!value){
        return true;
    }
    if(value == ''){
        return true;
    }
    if(typeof value == 'object'){
        var count=0;
        for(var key in value){
            count++;
            if(count > 0){
                break;
            }
        }
        if(count <= 0){
            return true;
        }
    }

    return false;
}

var ElementExt = function(){
}
Object.extend(ElementExt.prototype, {
    append : function(obj, params) {
        if (typeof obj == 'string') {
            obj = $C(obj, params);
        }
        this.appendChild(obj);
    },
    wrap : function(obj, params, callback) {
        var wrap = this.attr('_dowrap');
        if(wrap){
            return this;
        }
        this.attr('_dowrap', true);

        var parentNode = this.parentNode;
        if (typeof obj == 'string') {
            obj = $C(obj, params);
        }
        obj.appendChild(this);
        parentNode.appendChild(obj);
        if (callback) {
            callback(this, obj);
        }
        return this;
    },
    show: function(){
        this.style.display = 'block';
    },
    hide: function(){
        this.style.display = 'none';
    },
    focs: function(){
        this.focus();
    }
});

var SelectExt = function(){
}
Object.extend(SelectExt.prototype, {
    add : function(value, text){
        if(this.exist(value)){
            return;
        }

        var optionObj  = document.createElement('option');
        optionObj.value = value;
        optionObj.text = text;
        this.appendChild(optionObj);
    },
    del : function(value){
        var lv = null, found = false;
        var optionSet = this.options;
        for(var i = optionSet.length-1; i >= 0; i--){
            lv = optionSet[i].value;
            if(lv == value){
                this.removeChild(optionSet[i]);
                break;
            }
        }
        return found;
    },
    getValue:function(){
        var idx = this.selectedIndex;
        if(idx != -1){
            var option = this.options[idx];
            return option.value;
        }else{
            return '';
        }
    },
    getText:function(){
        var idx = this.selectedIndex;
        if(idx != -1){
            var option = this.options[idx];
            return option.text;
        }else{
            return '';
        }
    },
    selected : function(){
        var dataSet = new Array();
        var data = null, value = null,text=null;
        var optionSet = this.options;
        for(var i = 0; i < optionSet.length; i++){
            optionSet[i].selected = 'selected';
            text = optionSet[i].text;
            value = optionSet[i].value;
            data = {
                'value' : value,
                'text' : text
            }
            dataSet.push(data);
        }
        return dataSet;
    },
    exist : function(value){
        var lv = null,found = false;
        var optionSet = this.options;
        for(var i = optionSet.length-1; i >= 0; i--){
            lv = optionSet[i].value;
            if(lv == value){
                found = true;
                break;
            }
        }
        return found;
    },
    remove :function(){
        var found = false;
        var optionSet = this.options;
        for(var i = optionSet.length-1; i >= 0; i--){
            if(optionSet[i].selected){
                found = true;
                this.removeChild(optionSet[i]);
            }
        }
        if(!found){
            $INFO('请选择要移除的选择项！');
        }
    },
    clear : function(){
        var optionSet = this.options;
        if(optionSet.length <= 0){
            return;
        }

        for(var i = optionSet.length-1; i >= 0; i--){
            this.removeChild(optionSet[i]);
        }
    }
});
var FormExt = function(){
}
Object.extend(FormExt.prototype, {
    post: function(url,target){
        this.action = url;
        if(target){
            this.target = target;
        }
        this.submit();
    }
});

Object.extend(window, {
    getWidth : function() {
        if (self.innerWidth) {
            return self.innerWidth;
        } else if (document.documentElement
            && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        } else if (document.body) {
            return document.body.clientWidth;
        }
    },
    getHeight : function() {
        if (self.innerHeight) {
            return self.innerHeight;
        } else if (document.documentElement
            && document.documentElement.clientHeight) {
            return document.documentElement.innerHeight;
        } else if (document.body) {
            return document.body.innerHeight;
        }
    },
    $E : function(id) {
        var eleObj = null;
        if(typeof id == 'object'){
            eleObj = id;
        }else{
            eleObj = document.getElementById(id);
            if(!eleObj){
                var formObj = document.forms[0];
                if(formObj){
                    var tempObj = formObj[id];
                    if(tempObj && tempObj.length && tempObj.length > 0){
                        var tagName = null;
                        for(var i=0; i<tempObj.length; i++){
                            tagName = tempObj[i].tagName;
                            tagName = tagName.toLowerCase();
                            if('input' == tagName || 'select' == tagName){
                                eleObj = tempObj[i];
                                break;
                            }
                        }
                    }else{
                        eleObj = tempObj;
                    }
                }
            }

            if(!eleObj){
                var objSet = document.getElementsByName(id);
                if(objSet && objSet.length > 0){
                    eleObj = objSet[0];
                }
            }
        }

        if(eleObj){
            var _ext = eleObj._ext;
            if(typeof _ext == 'undefined'){
                Object.extend(eleObj, ElementExt.prototype);
                eleObj._ext = true;
            }
        }
        return eleObj;
    },
    $F : function(name){
        var formObj = null;
        if(!name){
            formObj = document.forms[0];
        }else{
            formObj = document.getElementById(name);
            if(!formObj){
                formObj = document.forms[name];
            }
            if(!formObj){
                formObj = document.getElementsByName(name);
            }
        }

        var _ext = formObj._ext;
        if(typeof _ext == 'undefined'){
            Object.extend(formObj, FormExt.prototype);
            formObj._ext = true;
        }

        return formObj;
    },
    $C : function(tagName, params) {
        var id = params['id'];
        if(!id){
            id = UUID.create();
            id = id.substring(0, 20);
            params = typeof params == 'undefined' ? {} : params;
            params['id'] = '_' + tagName + '_' + id + '_';
        }
        var name = params['name'];

        var docObj = params['document'];
        if(!docObj){
            docObj = document;
        }
        var obj = docObj.getElementById(id);
        if(!obj){
            obj = docObj.getElementsByName(id);
            if(obj){
                obj = obj[0];
            }
        }
        if(!obj){
            if(name){
                obj = docObj.getElementsByName(name);
                if(obj){
                    obj = obj[0];
                }
            }
        }
        if(!obj){
            obj = docObj.createElement(tagName);
        }

        if (params) {
            for ( var key in params) {
                if('document' == key || 'target' == key){
                    continue;
                }
                obj.setAttribute(key, params[key]);
            }
        }
        var value = params['value'];
        if(value){
            obj.value = value;
        }
        var tagertObj = params['target'];
        if(tagertObj){
            tagertObj.appendChild(obj);
        }
        return obj;
    },
    $UID : function(name){
        var id = UUID.create();
        id = id.substring(0, 20);
        id = '_' + name  + '_' + id + '_';
        return id;
    },
    $uid: function(name){
        var id = UUID.create();
        id = id.substring(0, 20);
        id = '_' + name  + '_' + id + '_';
        return id;
    },
    $MSG : function(message, status){
        if(status){
            $window.alert(message, 'ok');
        }else{
            $window.alert(message, 'error');
        }
    },
    $ERROR: function(message){
        $window.alert(message, 'error');
    },
    $INFO:function(message){
        $window.alert(message, 'info');
    },
    $V: function(name){
        var value = '';
        var obj = $E(name);
        if(!obj){
            return '';
        }

        var type = obj.getAttribute('type');
        if('checkbox' == type || 'radio' == type){
            var buf = '', deliter = '';
            var tempName = '', tagName='';
            var objSet = document.getElementsByName(name);
            for(var i=0; i<objSet.length; i++){
                tempName = objSet[i].getAttribute('name');
                tagName = objSet[i].tagName.toLowerCase();
                if('input'== tagName && tempName== name && objSet[i].checked && tempName == name){
                    buf += deliter + objSet[i].value;
                    deliter = ',';
                }
            }
            value = buf;
        }else{
            value = obj.value;
        }
        return value;
    },
    $S: function(id){
        var obj = $E(id);
        var _ext_ext = obj._ext_ext;
        if(typeof _ext_ext == 'undefined'){
            Object.extend(obj, SelectExt.prototype);
            obj._ext_ext = true;
        }
        return obj;
    }
});


Object.extend(Date.prototype, {
    format : function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "H+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }

        return fmt;
    }
});

Date.parseString = function(str){
    var year = null;
    var month = null;
    var day = null;
    var hours = null;
    var minutes = null;
    var seconds = null;
    var minseconds = 0;

    var result = null;
    var reg = /(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):?(\d*)?/g;
    if(reg.test(str)){
        year = RegExp.$1;
        month = RegExp.$2;
        day = RegExp.$3;
        hours =  RegExp.$4;
        minutes = RegExp.$5;
        seconds =  RegExp.$6;
        if(!seconds){
            seconds = 0;
        }
    }else{
        reg = /(\d+)-(\d+)-(\d+)/g;
        if(reg.test(str)){
            year = RegExp.$1;
            month = RegExp.$2;
            day = RegExp.$3;
            hours =  0;
            minutes = 0;
            seconds =  0;
        }
    }
    month = month - 1;

    return new Date(year, month, day, hours, minutes,seconds, minseconds);
}

Object.extend(Number, {
    isInt:function(value,tip){// 是否整形类型
        var flag = false;
        var reg = /^\d+$/;
        if(!reg.test(value)){
            $INFO(tip);
        }else{
            flag =true;
        }
        return flag;
    },
    isFloat:function(value,tip){// 是否浮类型
        var flag = false;
        var reg = /^\d+(\.\d+)?$/;
        if(!reg.test(value)){
            $INFO(tip);
        }else{
            flag =true;
        }
        return flag;
    }
});

var BlockData = new Object();
Object.extend(BlockData, {
    format : function(value){
        if (null == value || value == '') {
            return "0 Bytes";
        }

        var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB",
            "ZB", "YB");
        var index = 0;
        var srcsize = parseFloat(value);
        var size = this.round(srcsize
            / Math.pow(1024, (index = Math.floor(Math.log(srcsize)
                / Math.log(1024)))), 2);

        return size + unitArr[index];
    },
    round : function(num, numDigit) {// 四舍五入
        if (num >= 0) {
            return parseInt((num * Math.pow(10, numDigit) + 0.5))
                / Math.pow(10, numDigit);
        } else {
            var numberRound1 = -num
            var tempNumber = parseInt((numberRound1 * Math.pow(10, numDigit) + 0.5))
                / Math.pow(10, numDigit);
            return -tempNumber;
        }
    }
});


var UUID = function() {
}

Object.extend(UUID, {
    create : function() {
        var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
        var dc = new Date();
        var t = dc.getTime() - dg.getTime();
        var tl = this.getIntegerBits(t, 0, 31);
        var tm = this.getIntegerBits(t, 32, 47);
        var thv = this.getIntegerBits(t, 48, 59) + '1';
        var csar = this.getIntegerBits(this.rand(4095), 0, 7);
        var csl = this.getIntegerBits(this.rand(4095), 0, 7);

        var n = this.getIntegerBits(this.rand(8191), 0, 7)
            + this.getIntegerBits(this.rand(8191), 8, 15)
            + this.getIntegerBits(this.rand(8191), 0, 7)
            + this.getIntegerBits(this.rand(8191), 8, 15)
            + this.getIntegerBits(this.rand(8191), 0, 15);

        return tl + tm + thv + csar + csl + n;
    },
    getIntegerBits : function(val, start, end) {
        var base16 = this.returnBase(val, 16);
        var quadArray = new Array();
        var quadString = '';
        var i = 0;
        for (i = 0; i < base16.length; i++) {
            quadArray.push(base16.substring(i, i + 1));
        }
        for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
            if (!quadArray[i] || quadArray[i] == '')
                quadString += '0';
            else
                quadString += quadArray[i];
        }

        return quadString;
    },
    returnBase : function(number, base) {
        return (number).toString(base).toUpperCase();
    },
    rand : function(max) {
        return Math.floor(Math.random() * (max + 1));
    }
});

var NPage = function() {
}
Object.extend(NPage, {
    dialog : function(caption, url, width, height, btns){
        NPage._dialog(caption, url, width, height, btns, true);
    },
    win : function(caption, url, width, height, btns){
        NPage._dialog(caption, url, width, height, btns, false);
    },
    _dialog : function(caption, url, width, height, btns,hasParam){
        var pageObj = this;
        var btnArray = new Array();
        if(btns){
            for(var i=0; i < btns.length; i++){
                var btnE = {};
                btnE['caption'] = btns[i]['caption'];
                btnE['tag'] = btns[i]['tag'];
                btnE['callback'] = function(popWinObj){
                    return function(){
                        btns[i]['click'](this, pageObj, popWinObj);
                    }
                }
                btnArray.push(btnE);
            }
        }
        if(width.toString().indexOf('px') == -1){
            width = width +　'px';
        }
        if(height.toString().indexOf('px') == -1){
            height = height +　'px';
        }
        var data ={};
        if(hasParam){
            var formObj = document.forms[0];
            var data = putil.form2json(formObj);
        }
        var frameName = $UID('frame');
        var params = {
            'caption' : caption,
            'url' : url,
            'frameName' : frameName,
            'height' : height,
            'width' : width,
            'btnBar' : btnArray,
            'dataParams' : data
        }
        $window.open(params);
    },
    doEvent : function(service, method, jsonParam, callback){
        var param = [];
        for(var key in jsonParam){
            param.push(jsonParam[key]);
        }
        preq.jservice(service, method, param, function(ret){
            if(callback){
                callback(ret);
            }else{
                $MSG(ret.message, ret.result);
            }
        });
    }
});

NPage.prototype = {
    doSearch : function(params, callback){
        if(!callback){
            callback = function(){
                return function(){}
            }
        }

        this.query(params, callback);
    },
    doAdd : function(url) {
        this.form.target = '_self';
        this.form.method = 'post';
        this.form.action = url;
        this.form.submit();
    },
    doAddWin : function(caption, url, width, height, btns) {
        NPage.dialog(caption, url, width, height, btns);
    },
    doAddSide : function(url, width, height, cb, top){
        NPage.showSide(url, width, height, cb, top);
    },
    doEdit : function(url) {
        var _this = this;
        this.$$selected();
        this.$$check(false, '', '编辑', function(data){
            _this.form.target = '_self';
            _this.form.method = 'post';
            _this.form.action = url;
            _this.form.submit();
        });
    },
    doEditWin : function(caption, url, width, height, btns) {
        this.$$selected();
        this.$$check(false, '', '编辑', function(data){
            NPage.dialog(caption, url, width, height, btns);
        });
    },
    doEditSide: function(url, width, height, cb, top){
        this.$$selected();
        this.$$check(false, '', '编辑', function(data){
            var id = data[0]['id'];
            if(url.indexOf('?') != -1){
                url += '&id=' + id;
            }else{
                url += '?id=' + id;
            }
            NPage.showSide(url, width, height, cb, top);
        });
    },
    doRowEdit : function(url){
        this.$$unselected();
        this.form.target = '_self';
        this.form.method = 'post';
        this.form.action = url;
        this.form.submit();
    },
    doRowEditWin : function(caption, url, width,height){
        this.$$unselected();
        NPage.dialog(caption, url, width, height, null);
    },
    doRowEditSide : function(url, width, height, cb, top){
        NPage.showSide(url, width, height, cb, top);
    },
    doDelete : function(method, callback){
        this.$$selected();
        var service =  this.$$jservice();
        this.$$doing(service, method, null, true, '确定要删除所选记录吗?', '删除', callback);
    },
    doEnable : function(method, callback) {
        this.$$selected();
        var service = this.$$jservice();
        this.$$doing(service, method, null, true, '确定要启用所选记录吗?', '启用', callback);
    },
    doDisable : function(method, callback) {
        this.$$selected();
        var service = this.$$jservice();
        this.$$doing(service, method, null, true, '确定要禁用所选记录吗?', '禁用', callback);
    },
    doEvent:function(method, confirm, msg, callback){
        this.$$selected();
        var service = this.$$jservice();
        this.$$doing(service, method, null, true, confirm, msg, callback);
    },
    doCheck : function(confirm, multi, msg, callback){
        var data = this.selected(['id']);
        if(data.length == 0){
            if(!multi){
                msg = '请选择一条待' + msg +　'记录！';
            }else{
                msg = '请选择要' + msg +　'记录！';
            }
            $window.alert(msg,'info');
            return ;
        }
        if(data.length>1 && !multi){
            msg = '请仅选择一条待' + msg +　'记录！';
            $window.alert(msg,'info');
            return ;
        }
        if(confirm){
            $window.confirm(confirm, function(){
                callback(data);
            });
        }else{
            callback(data);
        }
    },
    doSelected : function(){
        this.$$selected();
        var data = this.selected(['id']);
        return this.$$idStr(data);
    }
}
Object.extend(NPage.prototype, {
    $$jservice : function(){
        var jservice = this.$jservice();
        if(typeof jservice == 'undefined'){
            alert(this.attr('jservice') + '指定jservice不存在!');
            return null;
        }

        return jservice;
    },
    $$check : function(multi, confirm, msg, callback){
        var data = this.selected(['id']);
        if(data.length == 0){
            msg = '请选择一条待' + msg +　'记录！';
            $window.alert(msg,'info');
            return ;
        }
        if(data.length>1 && !multi){
            msg = '请仅选择一条待' + msg +　'记录！';
            $window.alert(msg,'info');
            return ;
        }

        if(confirm){
            $window.confirm(confirm, function(){
                callback(data);
            });
        }else{
            callback(data);
        }
    },
    $$doing : function(jservice, jmethod, params, mulit, confirm, msg, callback){
        if(mulit == null || typeof mulit == 'undefined'){
            mulit = false;
        }
        var data = this.selected(['id']);
        if(data.length == 0){
            msg = '请选择一条待' + msg +　'记录！';
            $window.alert(msg,'info');
            return ;
        }
        if(data.length>1 && !mulit){
            msg = '请仅选择一条待' + msg +　'记录！';
            $window.alert(msg,'info');
            return ;
        }

        var _this = this;
        var _doing = function(data){
            var paramArray = [];
            if(params == null || typeof params == 'undefined'){
                params = {};
            }

            params['id'] = _this.$$idStr(data);
            for(var key in params){
// alert('key:== ' +key + ', value '+ params[key]);
                paramArray.push(params[key]);
            }
// alert(paramArray.length +'，param ' + params['id']);
// alert('jservice ' + jservice + ', jmethod');
            $request.jservice(jservice, jmethod, paramArray, function(ret){
                if(callback){
                    callback(ret,_this);
                }else{
                    $MSG(ret.message,ret.result);
                }
                _this.refresh();
            });
        }
        if(confirm){
            $window.confirm(confirm, function(){
                _doing(data);
            });
        }else{
            _doing(data);
        }
    },
    $$idStr : function(data){
        var buf = '',  deliter = '';
        for(var i = 0; i < data.length; i++){
            buf += deliter + data[i].id;
            deliter = ',';
        }
        return buf;
    },
    $$selected : function(){
        var data = this.selected(['id']);
        var trSet = this.getSelectedTrTags();
        if(data.length == trSet.length){
            for(var i = 0; i < data.length; i++){
                var object = null;
                var inputSet = trSet[i].getElementsByTagName('input');
                for(var k = 0; k < inputSet.length; k++){
                    var type =inputSet[k].getAttribute('type');
                    if('checkbox' == type){
                        object = inputSet[k];
                        break;
                    }
                }
                object.value = data[i].id;
            }
        }
    },
    $$unselected :function(){
        var formObj = this.form;
        var inputSet = formObj.getElementsByTagName('input');
        for(var k = 0; k < inputSet.length; k++){
            var type = inputSet[k].getAttribute('type');
            var name = inputSet[k].getAttribute('name');
            if('checkbox' == type && name == 'id'){
                inputSet[k].checked = false;
            }
        }
    }
});

Object.extend(NPage, {
    $ : function(id) {
        var gridObj = null;
        if (id) {
            gridObj = $window.getGrid(id);
        } else {
            gridObj = $window.getGrid();
        }
        if(!gridObj){
            return;
        }

        var extend = gridObj.attr('_extend');
        if(!extend){
            Object.extend(gridObj, NPage.prototype);
            gridObj.attr('_extend', true);
        }
        if(!gridObj.form){
            gridObj.form = document.forms[0];
        }

        return gridObj;
    },
    showSide: function(url, width, height, cb, top){
        var style = '', deliter = '';
        if(top){
            style += deliter + 'top:' + top;
            deliter = ';';
        }else{
            style += deliter + 'top:0px;';
            deliter = ';';
        }
        if(width){
            style += deliter + 'width:' + width;
            deliter = ';';
        }else{
            style += deliter + 'width:100%;'
        }
        if(height){
            style += deliter + 'height:' + height;
            deliter = ';';
        }else {
            style += deliter + 'height:100%;'
        }
        var param = {'url': url};
        if(style != ''){
            param['style'] = style;
        }

        _frameIn(param, function() {
            if(cb){
                cb();
            }else{
                $window.getGrid().refresh();
            }
        });
    },
    closeSide : function(flag){
        _frameBack(flag);
    }
});

NPage.Render = {
    bool : function(name,map){
        var value = map[name];
        if(value){
            return '是';
        }else{
            return '否';
        }
    },
    enabled : function(name, map){
        var value = map[name];
        if(value){
            return '启用';
        }else{
            return '禁用';
        }
    },
    date : function(name, map){
        var value = map[name];
        if(!value){
            return '';
        }else{
            return  Date.parseString(value).format('yyyy-MM-dd');
        }
    },
    time : function(name, map){
        var value = map[name];
        if(!value){
            return '' ;
        }else{
            return  Date.parseString(value).format('yyyy-MM-dd hh:mm');
        }
    },
    size : function(name, map){
        var value = map[name];
        return BlockData.format(value);
    }
}
var NForm = function(){
}
Object.extend(NForm, {
    toJson : function(formName){
        var pattern = null;
        if(formName){
            pattern = '?' + formName + '[name=entity.*]';
        }else{
            pattern = 'form[name=entity.*]';
        }
        var value = netiler.$(pattern);
        return value;
    },
    cancel : function(){
        var formObj = document.forms[0];
        if(formObj['urlhistory.goback']){
            var url = formObj['urlhistory.goback'].value;
            window.location.href = url;
        }
    },
    close : function(){
        window.frameElement.close();
    }
});
NForm.prototype = {
    doSave : function(method, param, callback){
        if(!this.$$valid()){
            return ;
        }

        var formObj = document.forms[0];
        var formName = formObj.getAttribute('name');
        var paramArray =[];
        if(!param){
            param = {};
            param['entity'] = NForm.toJson(formName);
        }
        for(var key in param){
            paramArray.push(param[key]);
        }

        var service = this.$$jservice();
        $request.jservice(service, method, paramArray, function(ret){
            if(callback){
                callback(ret);
            }else{
                $MSG(ret.message, ret.result);
            }
        });
    }
}
Object.extend(NForm.prototype, {
    $$valid : function(){
        var result =this.form.formvalidate();
        if(result){
            $window.alert('请输入必填项数据或正确格式数据！','info');
            return false;
        }
        return true;
    },
    $$jservice : function(){
        var jservice = this.$jservice();
        if(!jservice){
            alert('请给ui:form指定jservice');
            return null;
        }
        return jservice;
    },
    $$netiler : function(){// netiler jservice bug错误修复
        var dateDivSetObj = this.getElementsByTagName('ui:date');
        for(var i = 0; i < dateDivSetObj.length; i++){
            var format = dateDivSetObj[i].getAttribute('format');
            var inputSetObj = dateDivSetObj[i].getElementsByTagName('input');
            var value = inputSetObj[0].value;
            if(value != ''){
                value = Date.parseString(value).format(format);
                inputSetObj[0].value = value;
            }
        }
    }
});

Object.extend(NForm, {
    $ : function(id) {
        var formObj = null;
        if (id) {
            formObj = $window.getForm(id);
        } else {
            formObj = $window.getForm();
        }
        if(!formObj){
            return;
        }

        var extend = formObj.attr('_extend');
        if(!extend){
            Object.extend(formObj, NForm.prototype);
            var formSet = formObj.getElementsByTagName('form');
            formObj.form = formSet[0];
            formObj.attr('_extend', true);
        }

        return formObj;
    }
});