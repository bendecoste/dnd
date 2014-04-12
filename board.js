var gridWidth = 100;
var gridHeigh = 100;

var mouseIsDown = false;

function Tile(x,y) {
  this.x = x;
  this.y = y;

  this.el = document.createElement('div');
  this.el.className = 'tile';

  this.engadged = false;
}

Tile.prototype.applyToScreen = function() {
  $(this.el).css('left', this.x * 50);
  $(this.el).css('top', this.y * 50);

  function checkChange(evt) {
    if (!mouseIsDown && evt.type !== 'mousedown') {
      return;
    }

    if (!this.engadged) {
      this.engadged = true;
      $(this.el).css('background-color', 'SteelBlue');

      return;
    }

    this.engadged = false;
    $(this.el).css('background-color', 'tomato');
  }

  function occupyWallStreet() {
    $(this.el).css('background-color', 'SeaGreen');
  }

  $(this.el).mouseover(checkChange.bind(this));
  $(this.el).mousedown(checkChange.bind(this));
  $(this.el).dblclick(occupyWallStreet.bind(this));

  document.body.appendChild(this.el);
};

function bindMouseListener() {
  $(document.body).mousedown(function() {
    console.log('DEBUG', 'mouse is down');
    mouseIsDown = true;
  });

  $(document.body).mouseup(function() {
    console.log('DEBUG', 'mouse is up');
    mouseIsDown = false;
  });
}

window.createBoard = function() {
  bindMouseListener();
  for (var i = 0; i < gridWidth; ++i) {
    for (var j = 0; j < gridHeigh; ++j) {
      var tile = new Tile(i,j);
      tile.applyToScreen();
    }
  }
};
