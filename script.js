	
	// Getting all required html elements.
	const currentTime = document.getElementById('current-time');
	const inputt = document.getElementById('add');
	const setAlarmbtn = document.getElementById('set-alarm-btn');
	// Array for storing alarms set
	var alarms = [];
	const alarmList = document.getElementById('alarm-list-display');

	// for current time
	var today = new Date();
	var currentHours = today.getHours();
	var currentHours = ("0"+ currentHours).slice(-2);
	var currentMinutes = today.getMinutes();
	var currentMinutes = ("0"+ currentMinutes).slice(-2);
	var currentSeconds = today.getSeconds();
	var currentSeconds = ("0"+currentSeconds).slice(-2);
	var time = currentHours + ":" + currentMinutes + ":" + currentSeconds;
	currentTime.innerHTML = time;


	// Updating current time every second
	function timeInterval(){
		today = new Date();
		currentHours = today.getHours();
		currentHours = ("0"+currentHours).slice(-2);
		currentMinutes = today.getMinutes();
		currentMinutes = ("0"+currentMinutes).slice(-2);
		currentSeconds = today.getSeconds();
		currentSeconds = ("0"+currentSeconds).slice(-2);
		time =  currentHours + ":" + currentMinutes + ":" + currentSeconds;
		currentTime.innerHTML = time;
	}
	setInterval(timeInterval,1000);

	// checking from alarm list for alarm every second.
	function checkAlarm(){
		for( var i = 0 ; i < alarms.length ; i++){
			if(currentTime.innerHTML==alarms[i]){
				alert(`hey you got your alarm ringing!! for ${currentTime.innerHTML}`);
			}
		}
	}
	setInterval(checkAlarm,1000);


	// When new alarm set then making html element for that and adding it to html file.
	function addAlarmToDom(alarm){
		let id = alarm;
		const ul = document.createElement('section');
			ul.innerHTML = `
				<div class="alarm-list-display-time" id="${id}">
						${alarm}
				</div>
				<div class="delete" id="alarm-list-display-delete-btn" data-id="${id}">Delete</div>
			`
			alarmList.append(ul);
	}


	// for showing list of alarms, Alarm List is rendered below.
	function renderList() {
		alarmList.innerHTML = '';
		for(let i = 0; i < alarms.length; i++){
			console.log("aaaa",alarms[i])
			addAlarmToDom(alarms[i]); 
		}
	}

	// For deleting alarm from list
	function deleteAlarm(alarmId) {
		var newAlarms = alarms.filter(function(alarm){
			return alarm != alarmId
		});
		console.log("mmmmm",newAlarms.length);
		alarms = newAlarms;
		renderList();
		return;
	}


	// before rendering alarm must be added to array of AlarmList by below code
	function addAlarm(alarm) {
		if(alarm){
			alarms.push(alarm);
			renderList();
			return;
		}
	}

	// handler for deleting alarm
	function handleClickListener(e){
		const target = e.target;
		if(target.className == 'delete'){
			const alarmId = target.dataset.id;
			deleteAlarm(alarmId);
			return;
		}
	}
	

	// handler for setting Alarm
	function setAlarmListener(){
		var newAlarms = alarms.filter(function(alarm){
			return alarm == inputt.value;
		});
		if(newAlarms.length==0){
			addAlarm(inputt.value);
			return;
		}else{
			alert("Same alarm exist")
			return;
		}
	}


	// starting of App by below code
	function initializeApp(){
		document.addEventListener('click',handleClickListener);
		setAlarmbtn.addEventListener('click', setAlarmListener);
	}
	initializeApp();