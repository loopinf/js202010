var MyLib = {};

// Child가 Parent를 상속받는다.
MyLib.inherite = function(Parent, Child){
  // var F = function(){};
  // F.prototype = Parent.prototype;
  // Child.prototype = new F();
  // 전달한 prototype 객체를 공유하는 객체를 생성해서 반환
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
};

/**
 * 오버로딩
 *  - 동일한 이름의 메소드를 중복 정의하는 객체지향 언어의 기능
 *  - 매개변수의 개수, 타입, 순서를 다른게 정의해야 한다.
 * 자바스크립트의 오버로딩
 *  - 동일한 이름의 함수를 중복으로 정의하면 마지막에 정의한 함수만 남음
 *  - 함수는 하나만 정의하고 함수내에서 매개변수의 개수, 타입, 순서를 체크해서 분기처리 
 */
// get 방식의 Ajax 요청을 보낸다.
MyLib.get = function(url, data, success){
  var options = {};
  if(typeof data == 'string'){
    options.data = data;
    options.success = success;
  }else{
    options.success = data;
  }
  MyLib.ajax(url, options);
};

// Ajax 요청을 보낸다.
// var ajax = function(url, method, async, data, dataType, success){
MyLib.ajax = function(url, options){
  options = options || {};
  options.method = options.method || 'get';
  if(options.async == undefined){
    options.async = true;
  }
  options.data = options.data || '';
  options.dataType = options.dataType || 'text';

  if(options.method == 'get' && options.data){
    url += '?' + options.data;
    options.data = '';
  }
  // 1. XMLHttpRequest 생성		
  var xhr = new XMLHttpRequest();
  if(options.success){
    xhr.onload = function(){
      // 4. 응답 데이터 처리
      var result = xhr.responseText;
      if(options.dataType == 'json'){
        result = JSON.parse(result);
      }    
      options.success(result);
    };
  }

  // 2. 요청준비(open())
  xhr.open(options.method, url, options.async);
  // 3. 요청(send())
  xhr.send(options.data);
};