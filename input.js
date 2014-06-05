(function() {
    var pressedKeys = {};
	var pressedKeyStatus = {};
	var direction;
	var spaceDown;
    var spaceCB = [];
	
	function addSpaceCallBack(callback){
		spaceCB.push(callback);
	};
	
	function setKey(event, status) {
        var code = event.keyCode;
        var key;
		var opkey;
        switch(code) {
        case 32:
            key = 'SPACE'; 
			break;
		case 65:
        case 37:
            key = 'LEFT'; 
			opkey = 'RIGHT';
			break;
		case 87:
        case 38:
            key = 'UP'; 
			opkey = 'DOWN';
			break;
		case 68:
        case 39:
            key = 'RIGHT'
			opkey = 'LEFT';
			break;
        case 83:
		case 40:
            key = 'DOWN';
			opkey = 'UP';
			break;
        default:
            // Convert ASCII codes to letters
            key = String.fromCharCode(code);
        }
		if (key != 'SPACE'){
			if (status == true){
				if (pressedKeys[opkey]){
					pressedKeyStatus[opkey] = true;
					pressedKeys[opkey] = false;
				}
				pressedKeys[key] = true;	
				direction = key;
				//console.log(direction);
			} else {
				 if (pressedKeyStatus[opkey] == true){
					pressedKeyStatus[opkey] = false;
					pressedKeys[opkey] = true;
					direction = opkey;
				
				 }
				  pressedKeys[key] = false;
				  pressedKeyStatus[key] = false;
				 // console.log(direction);
			}
		} else {
			if (!spaceDown){
				spaceDown = true;
				spaceCB.forEach(function(func){func();});
			}
			if (!status)
				spaceDown = false;
		}
		//pressedKeys[opkey] = false;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
		pressedKeyStatus = {};
    });
	
    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
	
	window.addEvent;
	
	window.onSpacebar = addSpaceCallBack;
})();

var keysDown ={};
addEventListener("keydown", function (e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e){
	keysDown[e.keyCode] = false;
}, false);
