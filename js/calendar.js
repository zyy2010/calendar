(function(){
	window.onload = function(){
		var title = document.querySelector('h2'),
			calendar = document.getElementById('calendar'),
			calendarContent = calendar.querySelector('.calendarContent'),
			calendarTitle = calendar.querySelector('.title'),
			titleYear = calendarTitle.querySelector('.year'),
			titleMon = calendarTitle.querySelector('.mon'),
			arrowLeft = calendarTitle.querySelector('.arrowLeft'),
			arrowRight = calendarTitle.querySelector('.arrowRight'),
			changeMon = calendarTitle.querySelector('.changeMon'),
			calendarTitleYear = calendar.querySelector('.titleYear'),
			titleOnlyYear = calendarTitleYear.querySelector('.year');
			arrowYearLeft = calendarTitleYear.querySelector('.arrowLeft'),
			arrowYearRight = calendarTitleYear.querySelector('.arrowRight'),
			changeYearMon = calendarTitleYear.querySelector('.changeMon'),
			calendarBox = calendar.querySelector('.box'),
			calendarNextBox = calendar.querySelector('.nextBox'),
			calendarMon = calendar.querySelector('.calendarMon'),
			calendarMonInit = calendar.querySelector('.calendarMonInit'),
			calendarMonInitLi = calendarMonInit.querySelectorAll('li'),
			calendarMonNext = calendar.querySelector('.calendarMonNext'),
			clock = document.getElementById('clock'),
			clockContent = clock.querySelector('.box ul'),
			hour = clock.querySelector('.hour'),
			min = clock.querySelector('.min'),
			sec = clock.querySelector('.sec'),
			iTime = clock.querySelector('.time'),
			iWeek = clock.querySelector('.clockWeek'),
			calendarTimer = null;
		
		var time = new Date(),
			year = time.getFullYear(),
			mon = time.getMonth()+1;
		
		titleYear.textContent = year;
		titleMon.textContent = mon;
		
		var iYear = titleYear.textContent;
		var iMon = titleMon.textContent;
		
		//打开页面就开始调用日历样式
		setCalendar(iYear,iMon);
		
		//点击左边日历上标题时间，显示每年的月份
		changeMon.addEventListener('click',function(){
			calendarTitle.style.display = 'none';
			calendarContent.style.visibility = 'hidden';
			calendarTitleYear.style.display = 'block';
			calendarMon.style.visibility = 'visible';
			
			fnCss(calendarContent,'top',-490);
			fnCss(calendarMon,'top',-490);
			
			titleOnlyYear.textContent = iYear;
			
			calendarContent.style.transform = 'scale(0.8)';
			calendarMonInit.style.transform = 'scale(1)';
			
			
		});
		
		//点击月份列表回到天数
		for( var i=0; i<calendarMonInitLi.length; i++ ){
			calendarMonInitLi[i].index = i;
			calendarMonInitLi[i].addEventListener('click',function(){
				iMon = this.index+1;
				calendarContent.style.transform = 'scale(1)';
				calendarMonInit.style.transform = 'scale(1.5)';
				calendarTitleYear.style.display = 'none';
				calendarMon.style.visibility = 'hidden';
				calendarTitle.style.display = 'block';
				calendarContent.style.visibility = 'visible';
				
				fnCss(calendarContent,'top',0);
				fnCss(calendarMon,'top',0);
				
				titleYear.textContent = titleOnlyYear.textContent;
				titleMon.textContent = iMon;
			
				iYear = titleYear.textContent;
				iMon = titleMon.textContent;
				//console.log(iYear,iMon);
				setCalendar(iYear,iMon);
			});
		}
		
		//获取日期ul初始left值
		fnCss(calendarBox,'left');
		fnCss(calendarNextBox,'left');
		
		//点击天数左方向键
		arrowLeft.addEventListener('click',function(){
			
			iMon--;
				
			if( iMon <= 1 ){
				iMon = 12;
				iYear--;
				titleYear.textContent = iYear;
			}
			
			fnCss(calendarNextBox,'left',-490);
			starMove(calendarBox,{left:490},500,'linear');
			
			starMove(calendarNextBox,{left:0},500,'linear',function(){
				fnCss(calendarBox,'left',0);
				fnCss(calendarNextBox,'left',-490);
				
			});
			
			titleMon.textContent = iMon;
			
			iYear = titleYear.textContent;
			iMon = titleMon.textContent;
			
			setCalendar(iYear,iMon);
			
		});
		
		//点击天数右方向键
		arrowRight.addEventListener('click',function(){
			
			iMon++;
			
			if( iMon > 12 ){
				iMon = 1;
				iYear++;
				titleYear.textContent = iYear;
			}
			
			fnCss(calendarNextBox,'left',490);
			starMove(calendarBox,{left:-490},500,'linear');
			
			starMove(calendarNextBox,{left:0},500,'linear',function(){
				fnCss(calendarBox,'left',0);
				fnCss(calendarNextBox,'left',490);
			});
			
			titleMon.textContent = iMon;
			
			iYear = titleYear.textContent;
			iMon = titleMon.textContent;
			
			setCalendar(iYear,iMon);
			
		});
		
		//点击月份左方向键
		arrowYearLeft.addEventListener('click',function(){
			iYear--;
			titleOnlyYear.textContent = iYear;
			
			fnCss(calendarMonNext,'left',-490);
			starMove(calendarMonInit,{left:490},500,'linear');
			
			starMove(calendarMonNext,{left:0},500,'linear',function(){
				fnCss(calendarMonInit,'left',0);
				fnCss(calendarMonNext,'left',-490);
				
			});
		});
		
		//点击月份右方向键
		arrowYearRight.addEventListener('click',function(){
			iYear++;
			titleOnlyYear.textContent = iYear;
			
			fnCss(calendarMonNext,'left',490);
			starMove(calendarMonInit,{left:-490},500,'linear');
			
			starMove(calendarMonNext,{left:0},500,'linear',function(){
				fnCss(calendarMonInit,'left',0);
				fnCss(calendarMonNext,'left',490);
				
			});
		});
		
		
		
		function setCalendar(year,month){
			var arrDays = [],
				str = '';
//			console.log(year,month);
			
			//获取每个月第一天是周几
			var week = new Date(year,month-1,1).getDay();
			//获取每个月有多少天
			var countDay = getCountDays(month);
			
			for( var i=1; i<=countDay; i++ ){
				arrDays.push(i);
			}
			
			for( var i=0; i<week; i++ ){
				arrDays.unshift('');
			}
				
			var time = new Date(),
			day = time.getDate();
			
			for( var i=0; i<42; i++ ){
				
				if( i == (day-1+week) && iMon == mon ){
					str += '<li class="countday">'+arrDays[i]+'</li>';
				}else if( i < arrDays.length ){
					str += '<li>'+arrDays[i]+'</li>';
				}else{
					str += '<li></li>';
				}
				
			}
			calendarBox.innerHTML = str;
			calendarNextBox.innerHTML = str;
		}
		
		//设置每个月的天数
		function getCountDays(month){
			var time = new Date();
				
			time.setMonth(month);
			time.setDate(0);
			
			return time.getDate();
			
		}
		
		//点击大标题，回到当前日期
		title.addEventListener('click',function(){
			
			var oYear = time.getFullYear(),
				oMon = time.getMonth()+1;
			
			console.log(oYear,oMon);
			
			iYear = titleYear.textContent;
			iMon = titleMon.textContent;
			
			console.log(iYear,iMon);
			
			if( iYear == oYear && iMon > oMon ){
				iYear = titleYear.textContent = oYear;
				iMon = titleMon.textContent = oMon;
				
				fnCss(calendarNextBox,'left',-490);
				starMove(calendarBox,{left:490},500,'linear');
				
				starMove(calendarNextBox,{left:0},500,'linear',function(){
					fnCss(calendarBox,'left',0);
					fnCss(calendarNextBox,'left',-490);
					
				});
				
			}else if( iYear > oYear ){
				iYear = titleYear.textContent = oYear;
				iMon = titleMon.textContent = oMon;
				
				fnCss(calendarNextBox,'left',-490);
				starMove(calendarBox,{left:490},500,'linear');
				
				starMove(calendarNextBox,{left:0},500,'linear',function(){
					fnCss(calendarBox,'left',0);
					fnCss(calendarNextBox,'left',-490);
					
				});
			}else if( iYear == oYear && iMon == oMon ){
				iYear = titleYear.textContent = oYear;
				iMon = titleMon.textContent = oMon;
			}else{
				iYear = titleYear.textContent = oYear;
				iMon = titleMon.textContent = oMon;
				
				
				fnCss(calendarNextBox,'left',490);
				starMove(calendarBox,{left:-490},500,'linear');
				
				starMove(calendarNextBox,{left:0},500,'linear',function(){
					fnCss(calendarBox,'left',0);
					fnCss(calendarNextBox,'left',490);
				});
				
			}
			
			setCalendar(year,mon);
			
		});
		
		
		//设置右边旋转时钟
		fnClock();
		function fnClock(){
			var str = '';
			for( var i=0; i<60; i++ ){
				str += '<li style="transform: rotate('+ i*6 +'deg);"></li>';
			}
			clockContent.innerHTML = str;
			
			setClock();
			setInterval(setClock,1000);
		}
		
		function setClock(){
			var time = new Date(),
				timeSec = time.getSeconds(),
				timeMin = time.getMinutes() + timeSec/60,
				timeHour = time.getHours() + timeMin/60,
				day = time.getDate(),
				week = time.getDay(),
				mon = time.getMonth()+1,
				year = time.getFullYear();
			
			//设置旋转时钟
			hour.style.transform = 'rotate('+ timeHour*30 +'deg)';
			min.style.transform = 'rotate('+ timeMin*6 +'deg)';
			sec.style.transform = 'rotate('+ timeSec*6 +'deg)';
			
			title.innerHTML = '<span>'+ year +'</span>年<span>'+ mon +'</span>月<span>'+ day +'</span>日';
			
			//设置时间
			iTime.textContent = toDB(parseInt(timeHour)) + ':' + toDB(parseInt(timeMin)) + ':' + toDB(parseInt(timeSec));
			
			//设置星期
			switch(week){
				case 0:
					iWeek.textContent = '星期日';
					break;
				case 1:
					iWeek.textContent = '星期一';
					break;
				case 2:
					iWeek.textContent = '星期二';
					break;
				case 3:
					iWeek.textContent = '星期三';
					break;
				case 4:
					iWeek.textContent = '星期四';
					break;
				case 5:
					iWeek.textContent = '星期五';
					break;
				case 6:
					iWeek.textContent = '星期六';
					break;
			}
		}
		
		//时间不足两位前面补0
		function toDB(num){
			return num<10 ? '0' + num : '' + num;
		}
		
	};
	
	
	function fnCss(el,attr,val){
		if( arguments.length > 2 ){
			if( attr == 'opacity' ){
				el.style[attr] = val;
				el.style.filter = 'alpha(opacity='+ val * 100 +')';
			}else if( attr == 'zIndex' ){
				el.style[attr] = val;
			}else{
				el.style[attr] = val + 'px';
			}
		}else{
			return el.currentStyle ? parseFloat(el.currentStyle[attr]) : parseFloat(getComputedStyle(el)[attr]);
		}
	}
	
	function starMove(el,target,time,type,callBack){
		var t = 0,
			b = {},
			c = {},
			d = Math.ceil(time/20);
		
		for( var s in target ){
			b[s] = fnCss(el,s);
			c[s] = target[s]-b[s];
		}
		clearInterval(el.timer);
		el.timer = setInterval(function(){
			if( t >= d ){
				clearInterval(el.timer);
				callBack && callBack();
			}else{
				t++;
				for(var s in target){
					var val = Tween[type](t,b[s],c[s],d); 
					fnCss(el,s,val);
				}
			}
		},20);
	}
	
	
	
})();