/*
*判断一个字符串是不是json字符串
* str:字符串
* */
import {Message} from "element-ui";
import login from '@/api/login'
import ls from '@/utils/localStorage'
import router from '../router'

isJSON.strict = strict;
export function isJSON (str, pass_object) {
  if (pass_object && isObject(str)) return true;

  if (!isString(str)) return false;

  str = str.replace(/\s/g, '').replace(/\n|\r/, '');

  if (/^\{(.*?)\}$/.test(str))
    return /"(.*?)":(.*?)/g.test(str);

  if (/^\[(.*?)\]$/.test(str)) {
    return str.replace(/^\[/, '')
        .replace(/\]$/, '')
        .replace(/},{/g, '}\n{')
        .split(/\n/)
        .map(function (s) { return isJSON(s); })
        .reduce(function (prev, curr) { return !!curr; });
  }

  return false;
}

function strict (str) {
  if (isObject(str)) {
    return true;
  }

  try {
    return JSON.parse(str) && true;
  } catch (ex) {
    return false;
  }
}

/*
* 判断字符串
* */
export function isString (x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

export function resData (res) {
  if (!res || !res.data) {
    return  false;
  }
  if (isString(res.data)) {
    res.data = res.data.replace(/'/g, '"');
  }
  if (isJSON(res.data)) {
      try{
          res.data = JSON.parse(res.data);
      } catch(e) {
          res.data = eval("("+ res.data +")");
      }
  }

  let { code, message } = res.data;
  if (code === 302) {
      ls.clear();
      router.replace({
          path: '/login',
          query: {
              redirect: router.currentRoute.fullPath
          }
      });
      return false;
  }
  if (code !== 200) {
    Message.error(message || '请求失败');
    return false;
  }

  return res.data;
}

export function setParams(jsonObj) {
  return Object.keys(jsonObj).map(function (key) {
    // if (![undefined, '', null].includes(jsonObj[key])) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key]);
    // }
  }).join('&')
}

/*
*生成从minNum到maxNum的随机数
* */
export function randomNum(minNum,maxNum){
    var num = 1 ;
    switch(arguments.length){
        case 1:
            num = parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            num = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            num = 1;
            break;
    }
    return num;
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }
}

/*包含带小数的数字处理,千位加逗号,分位保留,*/
export function formatNumldy(strNum){
    let outputmoney = function (number) {
        number = number.replace(/\,/g, "");   //把所有的逗号，清除
        if (isNaN(number) || number == "")return "";
        number = Math.round(number * 100) / 100;
        if (number < 0)
            return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
        else
            return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
    }
    //格式化金额
    let outputdollars = function (number) {
        if (number.length <= 3)
            return (number == '' ? '0' : number);
        else {
            let mod = number.length % 3;
            let output = (mod == 0 ? '' : (number.substring(0, mod)));
            for (let i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod == 0) && (i == 0))
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                else
                    output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
            return (output);
        }
    }
    let outputcents = function (amount) {
        amount = Math.round(((amount) - Math.floor(amount)) * 100);
        return (amount < 10 ? '.0' + amount : '.' + amount);
    }
    return outputmoney(strNum + "");
}
