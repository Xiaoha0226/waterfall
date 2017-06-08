window.onload=function(){
	waterfall('main','pin');

	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};

	window.onscroll=function(){
		var oParent=document.getElementById('main');
		console.log('onscroll');
		console.log(checkscrollside());
		if(checkscrollside()){
			console.log('checked');
			for(var i=0;i<dataInt.data.length;i++){
				var oPin=document.createElement('div');
				oPin.className='pin';
				oParent.appendChild(oPin);
				var oBox=document.createElement('div');
				oBox.className='box';
				oPin.appendChild(oBox);
				var oImg=document.createElement('img');
				oImg.src='./images/'+dataInt.data[i].src;
				oBox.appendChild(oImg);
			}
			waterfall('main','pin');
		}
	}
}
function waterfall(parent,pin){
	var oParent = document.getElementById(parent);
	var aPin=oParent.getElementsByClassName(pin);
	var iPinW=aPin[0].offsetWidth;
	var num=Math.floor(document.body.clientWidth/iPinW);
	console.log(document.body.clientWidth);
	//oParent.style.cssText='width:'+iPinW*num+'px; margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
	oParent.style.width='iPinW*num';
	oParent.style.margin ='0 auto';
	//console.log(aPin[0].offsetWidth);

	var pinHArr=[];
	for(var i=0;i<aPin.length;i++){
		var pinH=aPin[i].offsetHeight;
		if(i<num){
			pinHArr[i]=pinH;
		}else{
			var minH=Math.min.apply(null, pinHArr);
			var minHIndex=getminHIndex(pinHArr,minH);
			aPin[i].style.position = 'absolute';
			aPin[i].style.top=minH+'px';
			aPin[i].style.left=minHIndex*iPinW+'px';
			pinHArr[minHIndex]=pinHArr[minHIndex]+aPin[i].offsetHeight;
		}

	}
}

function getminHIndex(arr,minH) {
	for(var i=0;i<arr.length;i++){
		if(arr[i]==minH){
			return i;
		}
	}
}
function checkscrollside(){
	var oParent=document.getElementById('main');
	var aPin=oParent.getElementsByClassName('pin');
	var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);

	console.log('lastPinH:'+lastPinH);
	var documentH=document.documentElement.clientHeight;
	console.log('documentH'+documentH);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	console.log('scrollTop'+scrollTop);
	console.log('xiangjia:'+documentH+scrollTop);
	return (lastPinH<(documentH+scrollTop))?true:false;
}