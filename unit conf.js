//preload images
resources.load([
    'images/blue1.png',
	'images/missile.png',
	'images/galaxy.jpg',
	'images/ship2.png',
	'images/explode.png',
	'images/bubble.png',
	'images/poof.png',
	'images/panel.png',
	'images/coin.png',
	'images/sheep.png',
	'images/rabbit.png',
	'images/gem.png',
	'images/cactus.png',
	'images/trampoline.png',
	'images/bg.png'
]);

//=======================
//ships
(function(){
	var heropw = 50;
	var heroph = 70;
	var heroframes =[[0,0]];
	function sprite1() {return new Sprite('images/blue1.png', 0,0,heropw,heroph,2,[0], false, heroframes,[261,378]);};
	function sprite2() {return new Sprite('images/ship2.png', 0,0,heropw,heroph,2,[0], false, heroframes,[85,85]); };
	window.ship1Sprite = sprite1;
	window.ship2Sprite = sprite2;
})();

//=======================
//sfx
(function(){
	var explodeframe = [[0,0],[96,0],[192,0],[288,0],[384,0],
					[0,96],[96,96],[192,96],[288,96],[384,96]];
	function sprite1() {
		return new Sprite('images/explode.png',0,0, 50,50,12, [0,1,2,3,4], false, explodeframe, [96,96]);
	};
	
	
	var poofframe = [[0,0],[0,128],[0,256],[0,384],[0,512]];
	function sprite2() {
		return new Sprite('images/poof.png',0,0, 50,50,12, [0,1,2,3,4], false, poofframe, [128,128]);
	};
	
	window.SFXSprite1 = sprite1;
	window.SFXSprite2 = sprite2;
})();
//=======================
//missile
(function(){
	var frames = [0,1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1];
	var missileframes=[[0,0],[23.5,0],[47,0],[70.5,0],[94,0],[117.5,0],[141,0],[164.5,0],[188,0],[211.5,0],[235,0]];
	
	function missile1() {
		return new Sprite('images/missile.png', 0,0,17,60,10,frames, false, missileframes,[23,97]);
	};
	
	function missile2() {
		return new Sprite('images/bubble.png', 0,0,40,40,0.1,[0,1], false, [[0,0],[0,0]],[128,128]);
	};
	
	window.missileSprite1 = missile2;
	window.missileSprite2 = missile1;
})();