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

function setClicked(button){
	if (button == brickindex) {
		dobrick();
		console.log('dobrick');
	} else if (button == airgliderindex){
		doairglide();
		console.log('doairglide');
	} else if (button ==  bungeeindex){
		dobungee();
		console.log('dobungee');
	} else if (button == supersizeindex){
		dosupersize();
		console.log('dosupersize');
	} else if (button == parasolindex){
		doparasol();
		console.log('doparasol');
	} else if (button == cactusbombindex){
		docactusbombs();
		console.log('docactus');
	} else if (button == bargainindex){
		dobargain();
		console.log('dobargain');
	} else if (button == blingindex){
		dobling();
		console.log('dobling');
	} else if (button == blingblingindex){
		doblingbling();
		console.log('doblingbling');
	} else if (button == abundanceindex){
		doabundance();
		console.log('doabundance');
	} else if (button == treasureindex) {
		dotreasure();
		console.log('dotreasure');
	}
	doFunction(function(c){
		var msg = {
			type: SCOREUPDATE,
			newscore: score,
		};
		c.send(msg);
	});
	
}

function resetStats(){	
		weight = realweight;
		bungerate = realbungerate;
		deccel = realdeccel;
		turnrate = realturnrate;
		hero.w = realw;
		hero.h = realh;
}

function setfocus(button){
	if (currbutton != button){
		mouseoverbutton = false;
		resetStats();
		currbutton = button;		
	} else if (!mouseoverbutton){
		mouseoverbutton = true;
		if (button == brickindex){
			brick();
		} else if (button == airgliderindex){
			airglide();
			console.log('airglide');
		} else if (button ==  bungeeindex){
			bungee();
			console.log('bungee');
		} else if (button == supersizeindex){
			supersize();
			console.log('supersize');
		} else if (button == parasolindex){
			parasol();
			console.log('parasol');
		} else if (button == cactusbombindex){
			cactusbombs();
			console.log('cactus');
		} else if (button == bargainindex){
			bargain();
			console.log('bargain');
		} else if (button == blingindex){
			bling();
			console.log('bling');
		} else if (button == blingblingindex){
			blingbling();
			console.log('blingbling');
		} else if (button == abundanceindex){
			abundance();
			console.log('abundance');
		} else if (button == treasureindex) {
			treasure();
			console.log('treasure');
		}
	}
}

function brick(){
	if (!upgrades[brickindex]){
		//weight += 3;
		textdesc = "Cheap weights. Cost 1 coin";
	}
}
function unbrick(){
	if (!upgrades[brickindex]){
		//weight -= 3;
	}
}
var brickindex = 1;

function dobrick(){
	if (coins >= 1 && !upgrades[brickindex]){
		realweight = weight;
		textdesc = "Cheap weights. (Purchased)"
		coins--;
		upgrades[brickindex] = 1;
		console.log('bought!');
	} else if (coins < 1 && !upgrades[brickindex]){
		textdesc = "Not enough coins."
		console.log('not enought coins');
	}
	
}

var airgliderindex = 2;
function airglide(){
	if (!upgrades[airgliderindex]){
		turnrate += 50;
		//weight+= 3;
		textdesc = "Swim faster in the air. Cost 2 coin. Weighs 3";
	}
}
function unairglide(){
	if (!upgrades[airgliderindex]){
		turnrate -= 50;
		//weight -= 3;
	}
}

function doairglide(){
	if (coins >= 1 && !upgrades[airgliderindex]){
		realturnrate = turnrate;
		textdesc = "Swim faster in the air. (Purchased)"
		coins -= 1;;
		upgrades[airgliderindex] = 1;
		//upgradetoggles[airgliderindex] = true;
		console.log('bought!');
		//weight += 3;
	} else if (coins < 1 && !upgrades[airgliderindex]){
		textdesc = "Not enough coins."
		console.log('not enought coins');
	}	
}



var bungeeindex = 3;
function bungee(){
	if (!upgrades[bungeeindex]){
		bungerate += 300;
		textdesc = "Springs up after each bounce. Cost 2 coin. Weighs 2.";
	}
}
function unbungee(){
	if (!upgrades[bungeeindex]){
		bungerate += 300;
		//weight -= 2;
	}
}

function dobungee(){
	if (coins >= 2 && !upgrades[bungeeindex]){
		//bungerate += 300
		textdesc = "Springs up after each bounce. (Purchased)"
		upgrades[bungeeindex];
		console.log('bought! bungee');
		//weight += 2;
		coins -= 2;;
	} else if (coins < 1 && !upgrades[bungeeindex]){
		textdesc = "Not enough coins."
	}
}


var supersizeindex = 4;
function supersize(){
	if (!upgrades[supersizeindex]){
		realw = hero.w;
		realh = hero.h;
		hero.w *= 1.5;
		hero.h *= 1.5;
		//weight+= 3;
		textdesc = "Supersize me plz. Cost 3 coin. Weighs 3";
	}
}

function unsupersize(){
	if (!upgrades[supersizeindex]){
		hero.w = realw;
		hero.h = realh ;
		//weight -= 3;
	}
}


function dosupersize(){
	if (coins >= 1 && !upgrades[supersizeindex]){
		textdesc = "Supersize me plz. (Purchased)"
		upgrades[supersizeindex] = 1;;
		console.log('bought! supersize');
		coins -= 1;;
	} else if (coins < 1 && !upgrades[supersizeindex]){
		textdesc = "Not enough coins."
		console.log('not enought coins');
	}
}

var parasolindex = 5;
function parasol(){
	//upgrades[parasolindex] = 1;;
	textdesc = "Slow down your fall rate, use Space to toggle. Cost 3 coin. Weighs 3";
}

function doparasol(){
	if (!upgrades[parasolindex] && coins >= 3) {
		upgrades[parasolindex] = true;
		coins -= 3;		
		textdesc  = " Slow down your fall rate, use Space to toggle. (Purchased)";
	} else if (coins < 3 && !upgrades[parasolindex]){
		textdesc = "Not enough coins."
	} 
}

window.onSpacebar(function (){
	if (upgrades[parasolindex]){
		upgradetoggles[parasolindex] = !upgradetoggles[parasolindex];
		console.log(upgradetoggles[parasolindex]);
		
}});


var cactusbombindex = 6;
function cactusbombs(){
	textdesc = "Cactus you collect now pricks the other player. Costs 4 coins";
}

function docactusbombs(){
	if (!upgrades[cactusbombindex] && coins >= 3){
		upgrades[cactusbombindex] = 1;
		textdesc = "Cactus you collect now also applied to the other player";
	} else if (coins < 3 && !upgrades[cactusbombindex]){
		textdesc = "Not enough coins."
	} 
}

var bargainindex = 7;
function bargain(){
	textdesc = "Collecting Cactus gives an additional 1 Coin. Costs 5 coins";
}

function dobargain(){
	if (!upgrades[bargainindex] && coins >= 5){
		upgrades[bargainindex] = 1;
		coins -= 5;
		textdesc = "Collecting Cactus gives an additional 1 Coin (Purchased)";
	} else if (!upgrades[bargainindex] && coins < 5) {
		textdesc = "Not enough coins";
	}
}

var blingindex = 8;
function bling(){
	textdesc = "Convert 3 Coins to 1 Gem (Unlimited use)";
}

function dobling(){
	if (coins>=3){
		textdesc = "Convert 3 Coins to 1 Gem (Unlimited use)";
		coins -= 3;
		score += 1;
	} else {
		textdesc = "Not enough coins";
	}
}
var blingblingindex = 9;

function blingbling(){
	textdesc = "Convert 2 Gems to 1 Coin (Unlimited use)";
}

function doblingbling(){
	if (score>=2){
		textdesc = "Convert 2 Gems to 1 Coin (Unlimited use)";
		coins += 1;
		score -= 2;
	} else {
		textdesc = "Not enough coins";
	}
}

abundanceindex = 10;

function abundance(){
	textdesc = "Collecting coins now give you 2 coins instead of 1";
}

function doabundance(){
	if (!upgrades[abundanceindex] && coins >= 10){
		coins -= 10;
		upgrades[abundanceindex] = 1;
	} else {
		textdesc = "Not enough coins";
	}
}

function treasure(){
	textdesc = "Collecting gems now give you 3 points instead of 1";	
}

treasureindex = 11;

function dotreasure(){
	if (!upgrades[treasureindex] && coins >= 10){
		coins -= 10;
		upgrades[treasureindex] = 1;
		textdesc = "Collecting gems now give you 3 points instead of 1 (Purchased)";	
	} else {
		textdesc = "Not enough coins";
	}
}