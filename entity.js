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

	function Projectile(id, type,x,y){
		//this.id = HandleId++;
		//CollectibleCount++;
		this.id = id;
		this.type = type;
		this.x = x;
		this.y = y;
		if (type == 1 ) {
			this.sprite = coin;
			this.w = 50;
			this.h = 50;
		}
		if (type == 2 ) { 
			this.sprite = gem;
			this.w = 50;
			this.h = 45;
		}
		if (type == 3 ) {
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
		for (var i = 0; i<Collectible.length; i++){	
			render(Collectible[i],Collectible[i].sprite);		
		}
	}
	
	function checkObjectCollision(){
		for (var i = 0; i<Collectible.length; i++){	
			var h = hero;	
			var m = Collectible[i];
			//if (h.player == playernumber) continue;
			//hit distance between centre is than sum of half of their width/height
			
			var dist = Math.sqrt((h.x - m.x)*(h.x - m.x) + (h.y - m.y)*(h.y - m.y));
			var horiz = (h.w+m.w)/2
			var vert  =(h.h+m.h)/2;
			if (dist < horiz || dist < vert){
				if (m.type == 1 ){
					coins++;
				} else if (m.type == 2 ) {
					score++;
				} else if (m.type == 3 ) {
					//bomb;
					score -= 2;
					if (score <0) score = 0;
				}
				
				console.log('sneding score: ' +score + ' ' +m.id);
				doFunction(function(c){
					var msg = {
						type: PROJECTILE,
						data: m.id,
						myscore: score,
					};
					c.send(msg);
				});
				m.destroy();
			}	
		}
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

})();
	