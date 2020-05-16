var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var itemCoordinates = [];
window.onload = () => {
	generateObjects();
	drawGrid();
	attachClickEvents();
	var startNewBtn = document.getElementById('start-new');
	startNewBtn.addEventListener('click', startNew);
	attachHover();
}
function cl(...loggable){
	console.log(loggable);
}
function drawGrid(){
	var html = '';
	var number;
	for(var i = 0; i <= 10; i++){
		number = i;
		if(number === 10){
			html += `<div class="letters cell"></div>`;
		} else {
			html += `<div class="numbers cell">${++number}</div>`;
		}
		for(var y = 0; y < 10; y++){
			if(i === 10){
				html += `<div class="letters cell">${letters[y]}</div>`;
			}
			else{
				html += `<div class="grid cell ${letters[y]} Z${number}" data-coor="${letters[y]}${number}"></div>`;
				if(y === 9){html += '<br>';}
			}

		}
	}
	document.querySelector('.grid-container').innerHTML = html;
}
function attachClickEvents(){
	var cells = document.querySelectorAll('.grid');
	cells.forEach((cell, index) => {
		cell.addEventListener('click', ()=>{
			if(checkIfCorrect(cell.dataset.coor)){
				cell.style.background = 'green';
				cell.style.verticalAlign = 'top';
				cell.innerHTML = 'correct';
			}
			else{
				cell.style.background = 'white';
				setTimeout(function(){
					cell.style.background = 'red';
				}, 100);
			}
		});
	});
}
function generateObjects(){
	let htmlObjects = '';
	let number;
	for(var i = 0; i < 2; i++){
		number = i;
		var letter = letters[Math.floor(Math.random() * letters.length)];
		var num = Math.ceil(Math.random() * letters.length);
		var coordinate = letter + num;
		itemCoordinates.push(coordinate);
		htmlObjects += `
			<div class="object" data-coor="${coordinate}">
			${++number}) Object ${number} has coordinates ${coordinate}
			</div>`;
	}
	document.querySelector('.objects-container').innerHTML = htmlObjects;
}
function checkIfCorrect(coordinate){
	retVal = false;
	var res = itemCoordinates.filter(item => item == coordinate);
	if(res.length > 0){
		retVal = true;
	}
	return retVal;
}
function startNew(){
	generateObjects();
	drawGrid();
	attachClickEvents();
}
function attachHover(){
	window.onmouseover=function(e) {
		var target = e.target;
        if(target.className.includes('grid cell')){
	    	var bottomCoor = target.dataset.coor[0];
       		var sideCoor = target.dataset.coor[1];
	        var column = document.querySelectorAll(`.${bottomCoor}`);
	        var row = document.querySelectorAll(`.Z${sideCoor}`);
	        // row.map((element) => {
	        // 	element.style.backgorund = 'red';
	        // });
	        column.forEach((element) => {
				element.style.background = '#dedcdc';
	        });
	        row.forEach((element) => {
				element.style.background = '#dedcdc';
	        });
	        target.style.background = '#bdbdbd';
			// target.getElementsByClassName(e.target.dataset.coor[0]).style.background = 'red';
        }
	}
	window.onmouseout = (e) => {
		var target = e.target;
        if(target.className.includes('grid cell')){
	    	var bottomCoor = target.dataset.coor[0];
       		var sideCoor = target.dataset.coor[1];
	        var column = document.querySelectorAll(`.${bottomCoor}`);
	        var row = document.querySelectorAll(`.Z${sideCoor}`);
	        row.forEach((element) => {
				element.style.background = 'white';
	        });
        	column.forEach((element) => {
				element.style.background = 'white';
	        });
	        target.style.background = 'white';
        }
	}
}