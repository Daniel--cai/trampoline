var CONNECTION = 0;
var POSITION = 1;
var PROJECTILE = 2;

var MAX_PEER = 2;
var CURR_PTR = 0;
var BASE_PEER = 'peerid';

var peer;
create_peer();
var connections = [];
function create_peer(){
	console.log('trying to create peer');
	var id = BASE_PEER+CURR_PTR;
	peer = new Peer(id, {
	key: '3ztcx3bu766r',
	debug: 2,
	});
	peer.on('open', function(id){
		$('#pid').text(id);
		//console.log(id)
		if (id == 'peerid0') 
			playernumber = 1;
		else if (id == 'peerid1')
			playernumber = 2;
console.log('You are playing as player ' + playernumber);
		// connect with previous peers;
		
		for (var i = 0; i<CURR_PTR; i++){
				//var id = document.getElementById('connect').value;
				//$('#status').text('connecting to id:' + id);
				console.log('attemping to connect to id ' +BASE_PEER+i);
				var c = peer.connect(BASE_PEER+i);
				c.on('open',function(){
					console.log('connected to id ' +BASE_PEER+i);
					onConnection(c);
				});
				
				c.on('close',function(){
					alert('The other player has left the game');
				});
				
				c.on('data', function(data){
					onData(data);
				});
				c.on('error', function(err){
					console.log('received err: ' +err.type);
				});
				//console.log('You are playing as player '+playernumber);
			}
	});
	
	
	peer.on('connection', connect);
	
	peer.on('error', function(err){
		if (err.type == 'unavailable-id'){
			console.log('id taken, cycling next');
		}
		CURR_PTR++;
		if (CURR_PTR < MAX_PEER){
			create_peer();
		} else {
			console.log('not more available keys');
			alert('Server full');
		
		}
	});
	
	
}

//receiving
function connect(conn) {
	console.log('successful');
	console.log('received connection from :' + conn.peer);
	//playernumber = 2;
	//console.log('You are playing as player '+playernumber);
	conn.on('open', function(){
		onConnection(conn);
	})
	conn.on('data', function(data){
		onData(data);
	});
	
	conn.on('close',function(){
		alert('The other player has left the game');
	});

};

function doFunction(fn){
	if (opId){
		var conns = peer.connections[opId];
		//console.log('attemping to send to opID: ' + opId);
		for (var i = 0, ii = conns.length; i < ii; i += 1) {
			var conn = conns[i];
			fn(conn, $(this));
		}
	}

}

function onConnection(c){
	console.log(c);
	opId = c.peer;
	//console.log("connected to peer " + c.peer);
	var msg = {
		type: CONNECTION,
		data: "success " + c.peer + ', my ID: ' +peer.id
	};
	c.send(msg);
	init();

};

function onData(msg){
	if (msg.type == CONNECTION){ 
		console.log(msg.data);
	} else if (msg.type == POSITION) {
		enemyhero.x = msg.x;
		enemyhero.y = msg.y;
		enemyhero.w = msg.w;
		enemyhero.h = msg.h;
	} else if (msg.type == PROJECTILE){
		console.log('received projectile to destroy:' + msg.data);
		p  = getProjectileById(msg.data).destroy();
		opscore = msg.myscore;
	};
	

};

var opId;
function connectToPeer(){
	var id = document.getElementById('connect').value;
	$('#status').text('connecting to id:' + id);
	var c = peer.connect(id);
	c.on('open',function(data){
		onConnection(c);
	});
	
	c.on('close',function(){
		console.log('The other player has left the game');
	});
	
	c.on('data', function(data){
		onData(data);
	});
	c.on('error', function(err){
		//alert('received err: ' +err.type);
	});
	//playernumber = 1;
	//console.log('You are playing as player '+playernumber);
};


window.onunload = window.onbeforeunload = function(e) {
  if (!!peer && !peer.destroyed) {
    peer.destroy();
  }
  
};