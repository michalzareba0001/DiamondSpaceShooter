//creators
var sp_ship = {
    width: 100,
    height: 100
};
var planet1 = {
    width: 150,
    height: 150
};
var diamond = {
    width: 60,
    height: 60
};
//virables
var shootY = -15;
var diamY = 5;
var planetoidY = 10;
var score = 0;
var lives = 5;
// Load all elements
window.addEventListener('load', function () {
    var BOARD = document.getElementById('board');
    var BOARD_WIDTH = BOARD.offsetWidth;
    var BOARD_HEIGHT = BOARD.offsetHeight;
    var BOARD_LEFT = BOARD.offsetLeft;
    var BOARD_RIGHT = BOARD_LEFT + BOARD_WIDTH;
    var ship = document.getElementById('ship');
    var diamond1 = document.getElementById('diamond1');
    var planetoid1 = document.getElementById('planetoid1');
    ship.style.width = sp_ship.width + 'px';
    ship.style.height = sp_ship.height + 'px';
    ship.style.top = BOARD_HEIGHT / 1.3 + 'px';
    ship.style.left = BOARD_RIGHT - BOARD_WIDTH / 2 - sp_ship.width / 2 + 'px';
    diamond1.style.width = diamond.width + 'px';
    diamond1.style.height = diamond.height + 'px';
    diamond1.style.top = -100 + 'px';
    diamond1.style.left = BOARD_LEFT + BOARD_WIDTH / 4 + 'px';
    planetoid1.style.top = -100 + 'px';
    planetoid1.style.left = BOARD_LEFT + BOARD_WIDTH / 2 + 'px';
    setInterval(function () {
        shoot();
    }, 750);
    setInterval(function () {
        planetoid1_start();
    }, 3000);
    setInterval(function () {
        diamond1_start();
    }, 5000);
    setInterval(function () {
        diamondanim();
        planetoidanim();
        shootanim();
        bul_vs_p1();
        diam_vs_ship();
        ship_vs_p1();
    }, 25);
    //random position
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    //Move ship
    document.addEventListener('mousemove', function (e) {
        var ship = document.getElementById('ship');
        var x = e.clientX;
        var y = e.clientY;
        if (x >= BOARD_RIGHT - sp_ship.width / 1.5) {
            x = BOARD_RIGHT - sp_ship.width / 1.5;
        }
        if (x <= BOARD_LEFT - sp_ship.width / 3) {
            x = BOARD_LEFT - sp_ship.width / 3;
        }
        if (y >= BOARD_HEIGHT - sp_ship.height) {
            y = BOARD_HEIGHT - sp_ship.height;
        }
        ship.style.left = x + 'px';
        ship.style.top = y + 'px';
    });
    //diamonds
    var diamond1_start = function () {
        var diamond1 = document.getElementById('diamond1');
        var diamond1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - diamond.width);
        diamond1.style.left = diamond1_X + 'px';
        diamond1.style.top = -100 + 'px';
    };
    var diamondanim = function () {
        var diamond1 = document.getElementById('diamond1');
        var diamond1Y = parseInt(diamond1.style.top);
        diamond1Y = diamond1Y + diamY;
        diamond1.style.top = diamond1Y + 'px';
    };
    //planetoids
    var planetoid1_start = function () {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - planet1.width);
        planetoid1.style.left = planetoid1_X + 'px';
        planetoid1.style.top = -100 + 'px';
        planetoid1.style.width = planet1.width + 'px';
        planetoid1.style.height = planet1.height + 'px';
    };
    var planetoidanim = function () {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid1Y = parseInt(planetoid1.style.top);
        planetoid1Y = planetoid1Y + planetoidY;
        planetoid1.style.top = planetoid1Y + 'px';
    };
});
//collisions
var bul_vs_p1 = function () {
    var bullet = document.getElementById('bullet');
    var bul_top = parseInt(bullet.style.top);
    var bul_bottom = parseInt(bullet.style.top) + parseInt(bullet.style.height);
    var bul_left = parseInt(bullet.style.left);
    var bul_right = bul_left + 4;
    var planetoid1 = document.getElementById('planetoid1');
    var p1_top = parseInt(planetoid1.style.top);
    var p1_bottom = parseInt(planetoid1.style.top) + parseInt(planetoid1.style.height);
    var p1_left = parseInt(planetoid1.style.left);
    var p1_right = parseInt(planetoid1.style.left) + parseInt(planetoid1.style.width);
    if (bul_top < p1_bottom && bul_top > p1_top && bul_left > p1_left && bul_right < p1_right) {
        shoot();
        score_count(1);
    }
};
var diam_vs_ship = function () {
    var diam = document.getElementById('diamond1');
    var diam_top = parseInt(diam.style.top);
    var diam_bottom = diam_top + parseInt(diam.style.height);
    var diam_left = parseInt(diam.style.left);
    var diam_right = diam_left + parseInt(diam.style.width);
    var ship = document.getElementById('ship');
    var ship_top = parseInt(ship.style.top);
    var ship_bottom = ship_top + parseInt(ship.style.height);
    var ship_left = parseInt(ship.style.left);
    var ship_right = ship_left + parseInt(ship.style.width);
    if (diam_bottom > ship_top && diam_top < ship_bottom && diam_left > ship_left && diam_right < ship_right) {
        score_count(100);
        diam.style.top = -50 + 'px';
    }
};
var ship_vs_p1 = function () {
    var ship = document.getElementById('ship');
    var ship_top = parseInt(ship.style.top);
    var ship_bottom = ship_top + parseInt(ship.style.height);
    var ship_left = parseInt(ship.style.left);
    var ship_right = ship_left + parseInt(ship.style.width);
    var planetoid1 = document.getElementById('planetoid1');
    var p1_top = parseInt(planetoid1.style.top);
    var p1_bottom = parseInt(planetoid1.style.top) + parseInt(planetoid1.style.height);
    var p1_left = parseInt(planetoid1.style.left);
    var p1_right = parseInt(planetoid1.style.left) + parseInt(planetoid1.style.width);
    if (ship_top < p1_bottom && ship_bottom > p1_top && ship_right > p1_left && ship_left < p1_right) {
        lives_count(1);
        planetoid1.style.top = -200 + 'px';
        ship.style.display = 'none';
        setTimeout(function () {
            ship.style.display = 'block';
        }, 200);
    }
};
//score and lives
var score_count = function (a) {
    score = score + a;
    document.getElementById('score_cell').innerHTML = '' + score;
};
var lives_count = function (b) {
    lives = lives - b;
    document.getElementById('lives_cell').innerHTML = '' + lives;
    if (lives == 0) {
        alert('Game Over');
        location.reload();
    }
};
//shooting
var shoot = function () {
    var ship = document.getElementById('ship');
    var bullet = document.getElementById('bullet');
    var shoot_startx = parseInt(ship.style.left) + sp_ship.width / 2 - 2;
    var shoot_starty = parseInt(ship.style.top);
    bullet.style.opacity = '1';
    bullet.style.left = shoot_startx + 'px';
    bullet.style.top = shoot_starty + 'px';
};
var shootanim = function () {
    var bullet = document.getElementById('bullet');
    var bulletY = parseInt(bullet.style.top);
    bulletY = bulletY + shootY;
    bullet.style.top = bulletY + 'px';
};
