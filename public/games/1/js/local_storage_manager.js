window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}


LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {

  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  // $.post("/score",{data:score},function(data,status){

  //     })

  console.log(score+"X");
  var xauth=localStorage.getItem('x-auth');
  var postURL=localStorage.getItem("postURL");
  var send_data={
    gid:1,
    score: score,
    uname:localStorage.getItem("uname"),
    admno:localStorage.getItem("admno")
  }
  console.log(send_data);
  var xauth=localStorage.getItem('x-auth');
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log("posted");
      console.log(this.responseText);
      // $('#code-result').val(result.stdout);
    }
  };
  xhttp.open("POST", postURL, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("x-auth",xauth);
  xhttp.send(JSON.stringify(send_data));
   ////RUNS WHEN SCORE NEEDS UPDATION
  this.storage.setItem(this.bestScoreKey, score);
};

// myBestScore = function (score) {
//   module.exports
//   console.log(score+"X");   ////RUNS WHEN SCORE NEEDS UPDATION
//   // this.storage.setItem(this.bestScoreKey, score);
// };

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  // console.log(stateJSON);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};
