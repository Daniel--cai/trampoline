/*
brick - 1
parasol - 2
bungee - 3
*/

var upgradetoggles = [];
var upgrades = [];
var upgradestext = [];
var mouseoverbutton = false;
var currbutton = 0;

function setfocus(button){
	if (currbutton != button){
		mouseoverbutton = false;
		weight = realweight;
		bungerate = realbungerate;
		deccel = realdeccel;
		turnrate = realturnrate;
		if (hero){
			hero.w = realw;
			hero.h = realh;
		}
		currbutton = button;		
	} else if (!mouseoverbutton){
		mouseoverbutton = true;
		if (button == 1){
			brick();
		} else if (button == 2){
			realturnrate = turnrate;
			turnrate += 100;
			textdesc = "increase turnrate  " + button;
		} else if (button == 3){
			realbungerate = bungerate;
			bungerate += 300;
			textdesc = "bungee hop  " + button;
		} else if (button == 4){
			realw = hero.w;
			realh = hero.h;
			hero.w *= 1.5;
			hero.h *= 1.5;
			textdesc = "Supersize  " + button;
		}
	}
}

function brick(){
	if (upgrades.indexOf(brickindex) == -1){
		weight += 3;
		textdesc = "You fall faster. Cost 1 Gold Coin";
	}
}
function unbrick(){
	weight -= 3;
}
var brickindex = 1;

function dobrick(){
	if (coins >= 1 && upgrades.indexOf(brickindex) == -1){
		realweight = weight;
		upgradestext[brickindex] = "(Purchase) You fall faster."
		coins--;
		upgrades.push(1);
		upgradetoggles[brickindex] = true;
		console.log('bought!');
	} else if (coins < 1 && upgrades.indexOf(brickindex) == -1){
		upgradestext[brickindex] = "Not enough coins."
		console.log('not enought coins');
	} else if (upgradetoggles[brickindex] == true){
		upgradetoggles[brickindex] = false;
		unbrick();
		realweight = weight;
		upgradestext[brickindex] = "Brick not equipped. Click to equip.";
		console.log('unequipp');
	} else if (upgradetoggles[brickindex] == false) {
		upgradetoggles[brickindex] = true;
		weight += 2;
		realweight = weight;
		upgradestext[brickindex] = "Brick equipped. Click to upequip.";
		console.log('equipp');
	}
	textdesc = upgradestext[brickindex];
	
}

var parasolindex = 2;
function unparasol(){
	upgrades[parasol] = false;;
}
function parasol(){
	
	upgrades[parasol] = true;
}

function doparasol(){
	if (!upgrades[parasol] && coins >= 3) {
		upgrades[parasol] = true;
		coins -= 3;		
		upgradestext[parasolindex] = "(Purchase) You can slow fall.";
	}
	textdesc = upgradestext[brickindex];
}

window.onSpacebar(function (){
	if (upgrades[parasol]){
		upgradetoggles[parasolindex] = !upgradetoggles[parasolindex];
		console.log(upgradetoggles[parasolindex]);
}});

function bungee(){
	
}

function supersize(){
	
}

