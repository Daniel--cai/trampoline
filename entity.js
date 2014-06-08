(function() {
	var HeroObjects = [];
	var Collectible = [];

	function Sprite(id, url,framespeed, frames, framedimen,once) {
		this.id = id;
		this.framespeed = framespeed;
		this.frames = frames;
		this.index = 0;
		this.url = url;
		this.once = once;
		this.framedimen = framedimen;
		//console.log('sprite created!');
	}

	function Hero(x,s){
		this.x = x;
		var disp;
		if      (s == 1) {
			this.sprite = rabbit;
			this.w = 80;
			this.h = 110;
			realw = 80;
			realh = 110;
		} else if (s == 2) {
			this.sprite = sheep;
			this.w = 100;
			this.h = 80;
			realw = 100;
			realh = 80;
		} else if (s == 3) {
			this.sprite = battleship1;
		}
		this.y = trampolineheight + (150-this.h/2);
		HeroObjects.push(this);
	}

	function render(o, s){
			var idx = 0;		
			if(s.framespeed > 0) {	
				s.index += s.framespeed*delta;
				var max = s.frames.length;
				idx = Math.floor(s.index) % max;
				if (s.index > 10) s.index %= max;
				//console.log(Collectible.length);
				if(s.once && idx >= max) {
					o.destroy();
					console.log('destyo');
					return;
				}
			
			}
			var currframe = s.frames[idx];
			var w = o.w;
			var h = o.h;
			context.save();
			context.translate(o.x, o.y);
			context.drawImage(resources.get(s.url),
						  currframe[0], currframe[1],
						  s.framedimen[0], s.framedimen[1],
						  -w/2, -h/2,
						  w, h);
						  
			//collision bounding box
			//context.strokeStyle = "black";
			//context.lineWidth= "2"; 			 
			//context.strokeRect(-w/2, -h/2, w, h);
			context.restore();	
		}

	function RenderHero(){
			render(hero,hero.sprite);	
			render(enemyhero,enemyhero.sprite);
	}

	function Projectile(id, type,x,y,dir){
		//this.id = HandleId++;
		//CollectibleCount++;
		this.id = id;
		this.type = type;
		this.x = x;
		this.y = y;
		this.dir = dir;
		console.log('new object spawned with dir '  + dir);
		if (type == COIN ) {
			this.sprite = coinsprite;
			this.w = 50;
			this.h = 50;
		}
		if (type == GEM ) { 
			this.sprite = gem;
			this.w = 50;
			this.h = 45;
		}
		if (type == CACTUS ) {
			this.sprite = cactus;
			this.w = 50;
			this.h = 65;
		}
		Collectible.push(this);
	}


	function getProjectileById(id){
		for (var i = 0; i<Collectible.length; i++){	
			if (Collectible[i].id == id)
				return Collectible[i];
		}
		console.log('id '+id+ ' does not exist');
		return;
	}
	
	function RenderProjectile(){
		//console.log(Collectible.length);
		var ms = 5;
		for (var i = 0; i<Collectible.length; i++){
			//move colletives in their direction
			m = Collectible[i];
			if (m.dir == LEFT){
				m.x-= ms;
				if (m.x <= 0) m.dir = RIGHT;
			} else if (m.dir == RIGHT){
				m.x+= ms;
				if (m.x >= canvaswidth) m.dir = LEFT;
			} else {
				console.log('proj has no dir')
			}
			render(Collectible[i],Collectible[i].sprite);		
		}
	}
	
	function checkObjectCollision(){
		for (var i = 0; i<Collectible.length; i++){	
			var h = hero;	
			var m = Collectible[i];
			var vert  =(h.h+m.h)/2;
			if (CheckCollision(hero, m)){
				if (m.type == COIN ){
					coins++;
					if (upgrades[abundanceindex]){ 
						coins++ 
						console.log('abundance effect');
					};
					ding.currentTime = 0;
					ding.play()
				} else if (m.type == GEM ) {
					score++;
					if (upgrades[treasure]) {
						score += 2
						console.log('treasure effect');
					};
					ding.currentTime = 0;
					ding.play();
				} else if (m.type == CACTUS ) {
					//bomb;
					score -= 2;
					if (score <0) score = 0;
					if (upgrades[bargainindex]) {
						coins++
						console.log('bargain effect');
					};
					if (upgrades[cactusbombindex]){
						m.type = CACTUSEFFECT;
						console.log('cactus effect');
					}
					outaudio.currentTime = 0;
					outaudio.play()
				}	
				
				console.log('sneding score: ' +score + ' ' + coins +' ' +m.id);
				doFunction(function(c){
					var msg = {
						type: PROJECTILE,
						data: m.id,
						myscore: score,
						projtype: m.type,
					};
					c.send(msg);
				});
				m.destroy();
			}	
		}
	}

	function clearAll(){
		Collectible = [];
		ProjHandleId = 0;
	}
	
	Projectile.prototype = {			
		destroy: function(){
			position = Collectible.indexOf(this);
			if ( ~position ) Collectible.splice(position, 1);
			console.log('destroyed');
		}
	}
	window.Hero = Hero;
	window.RenderHero = RenderHero;
	window.Sprite = Sprite;
	window.Projectile = Projectile
	window.checkObjectCollision = checkObjectCollision;
	window.RenderProjectile= RenderProjectile;
	window.getProjectileById = getProjectileById;
	window.clearAll = clearAll;

})();
	