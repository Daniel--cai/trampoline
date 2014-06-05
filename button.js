function button4(){
	console.log('old ' + hero.maxspeed);
	hero.maxspeed+=50;
	console.log('new ' + hero.maxspeed);
}

function button5(){
	console.log('old ' + fuelregen);
	fuelregen+=50;
	console.log('new ' + fuelregen);
}

function button6(){
	console.log('old ' + maxfuel);
	maxfuel+=100;
	if (maxfuel > 700) maxfuel = 700
	console.log('new ' + maxfuel);
}
