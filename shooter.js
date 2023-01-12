//creators
var sp_ship = {
    width: 80,
    height: 100
};
var planet1 = {
    width: 150,
    height: 150
};
var planet2 = {
    width: 200,
    height: 200
};
var diamond = {
    width: 50,
    height: 50
};
var juefo = {
    width: 120,
    height: 77
};
var laser1 = new Audio('/sound/ready/laser1.mp3');
var laser2 = new Audio('/sound/ready/laser2.mp3');
var hit1 = new Audio('/sound/ready/hit1.mp3');
var hit2 = new Audio('/sound/ready/hit2.mp3');
var collect = new Audio('/sound/ready/collect.mp3');
//virables
var shootY = -15;
var ufoshootY = 18;
var diamY = 13;
var planetoidY = 10;
var planetoidY2 = 6;
var score = 0;
var lives = 5;
var ufoSpeed = 5;
var ufoLeft = 0;
var ufoRight = 0;
var direction = 'right';
var ufo_lives = 3;
window.addEventListener('load', function () {
    var startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'flex';
});
var startbtn = function () {
    var startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    loadAll();
    shoot();
};
// Load all elements
var loadAll = function () {
    var BOARD = document.getElementById('board');
    var BOARD_WIDTH = BOARD.offsetWidth;
    var BOARD_HEIGHT = BOARD.offsetHeight;
    var BOARD_LEFT = BOARD.offsetLeft;
    var BOARD_RIGHT = BOARD_LEFT + BOARD_WIDTH;
    var ship = document.getElementById('ship');
    var diamond1 = document.getElementById('diamond1');
    var planetoid1 = document.getElementById('planetoid1');
    var planetoid2 = document.getElementById('planetoid2');
    var ufo = document.getElementById('ufo');
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
    planetoid2.style.top = -100 + 'px';
    planetoid2.style.left = BOARD_LEFT + BOARD_WIDTH / 6 + 'px';
    planetoid2.style.width = planet2.width + 'px';
    planetoid2.style.height = planet2.height + 'px';
    ufo.style.left = BOARD_LEFT + 'px';
    ufo.style.top = 5 + 'px';
    ufo.style.width = juefo.width + 'px';
    ufo.style.height = juefo.height + 'px';
    setInterval(function () {
        //    shoot();
        ufoshoot();
    }, 1600);
    /* setInterval(function () {
        planetoid1_start();
    }, 3000);

    setInterval(function () {
        planetoid2_start();
    }, 6000); */
    /*setInterval(function () {
        diamond1_start();
    }, 5000);*/
    setInterval(function () {
        diamondanim();
        planetoidanim();
        ufoposition();
        shootanim();
        ufoshootanim();
        bul_vs_p1();
        bul_vs_p2();
        bul_vs_ufo();
        ufobul_vs_ship();
        diam_vs_ship();
        ship_vs_p1();
        ship_vs_p2();
    }, 30);
    //random position
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    //Move ship
    document.addEventListener('mousemove', function (e) {
        var ship = document.getElementById('ship');
        var x = e.clientX;
        var y = e.clientY;
        if (x >= BOARD_RIGHT - sp_ship.width / 2) {
            x = BOARD_RIGHT - sp_ship.width / 2;
        }
        if (x <= BOARD_LEFT - sp_ship.width / 2) {
            x = BOARD_LEFT - sp_ship.width / 2;
        }
        if (y >= BOARD_HEIGHT - sp_ship.height) {
            y = BOARD_HEIGHT - sp_ship.height;
        }
        ship.style.left = x + 'px';
        ship.style.top = y + 'px';
    });
    document.addEventListener('touchmove', function (e) {
        // grab the location of touch
        var touchLocation = e.targetTouches[0];
        // assign box new coordinates based on the touch.
        ship.style.left = touchLocation.pageX - (sp_ship.width / 2) + 'px';
        ship.style.top = touchLocation.pageY - sp_ship.height + 'px';
    });
    /* record the position of the touch
    when released using touchend event.
    This will be the drop position. */
    document.addEventListener('touchend', function (e) {
        // current box position.
        var x = parseInt(ship.style.left);
        var y = parseInt(ship.style.top);
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
        if (diamond1Y >= BOARD_HEIGHT) {
            diamond1_start();
        }
    };
    //ufo anim and collision
    var ufoposition = function () {
        var ufoLeft = parseInt(ufo.style.left);
        var ufoRight = ufoLeft + ufo.offsetWidth;
        if (ufoRight >= BOARD_RIGHT) {
            ufoSpeed = -ufoSpeed;
        }
        if (ufoLeft < BOARD_LEFT) {
            ufoSpeed = -ufoSpeed;
        }
        ufoLeft = ufoLeft + ufoSpeed;
        ufoRight = ufoLeft + ufo.offsetWidth;
        ufo.style.left = "".concat(ufoLeft, "px");
    };
    //planetoids
    var planetoid2_start = function () {
        var planetoid2 = document.getElementById('planetoid2');
        var planetoid2_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - planet1.width);
        planetoid2.style.left = planetoid2_X + 'px';
        planetoid2.style.top = -100 + 'px';
        planetsPos2();
    };
    var planetoid1_start = function () {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - planet1.width);
        planetoid1.style.left = planetoid1_X + 'px';
        planetoid1.style.top = -100 + 'px';
        planetoid1.style.width = planet1.width + 'px';
        planetoid1.style.height = planet1.height + 'px';
        planetsPos1();
    };
    var planetoidanim = function () {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid2 = document.getElementById('planetoid2');
        var planetoid1Y = parseInt(planetoid1.style.top);
        var planetoid2Y = parseInt(planetoid2.style.top);
        planetoid1Y = planetoid1Y + planetoidY;
        planetoid2Y = planetoid2Y + planetoidY2;
        planetoid1.style.top = planetoid1Y + 'px';
        planetoid2.style.top = planetoid2Y + 'px';
        if (planetoid1Y >= BOARD_HEIGHT) {
            planetoid1_start();
        }
        if (planetoid2Y >= BOARD_HEIGHT) {
            planetoid2_start();
        }
    };
    var planetsPos2 = function () {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid2 = document.getElementById('planetoid2');
        var planetoid1Left = parseInt(planetoid1.style.left);
        var planetoid1Right = planetoid1Left + planetoid1.offsetWidth;
        var planetoid2Left = parseInt(planetoid2.style.left);
        var planetoid2Right = planetoid2Left + planetoid2.offsetWidth;
        if (planetoid2Right <= planetoid1Left && planetoid2Left >= planetoid1Right) {
            planetoid2_start();
        }
    };
    var planetsPos1 = function () {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid2 = document.getElementById('planetoid2');
        var planetoid1Left = parseInt(planetoid1.style.left);
        var planetoid1Right = planetoid1Left + planetoid1.offsetWidth;
        var planetoid2Left = parseInt(planetoid2.style.left);
        var planetoid2Right = planetoid2Left + planetoid2.offsetWidth;
        if (planetoid1Right <= planetoid2Left && planetoid1Left >= planetoid2Right) {
            planetoid1_start();
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
            diamond1_start();
            collect.play();
        }
    };
};
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
        score_count(2);
    }
};
var bul_vs_p2 = function () {
    var bullet = document.getElementById('bullet');
    var bul_top = parseInt(bullet.style.top);
    var bul_bottom = parseInt(bullet.style.top) + parseInt(bullet.style.height);
    var bul_left = parseInt(bullet.style.left);
    var bul_right = bul_left + 4;
    var planetoid2 = document.getElementById('planetoid2');
    var p2_top = parseInt(planetoid2.style.top);
    var p2_bottom = parseInt(planetoid2.style.top) + parseInt(planetoid2.style.height);
    var p2_left = parseInt(planetoid2.style.left);
    var p2_right = parseInt(planetoid2.style.left) + parseInt(planetoid2.style.width);
    if (bul_top < p2_bottom && bul_top > p2_top && bul_left > p2_left && bul_right < p2_right) {
        shoot();
        score_count(5);
    }
};
var bul_vs_ufo = function () {
    var bullet = document.getElementById('bullet');
    var bul_top = parseInt(bullet.style.top);
    var bul_bottom = parseInt(bullet.style.top) + parseInt(bullet.style.height);
    var bul_left = parseInt(bullet.style.left);
    var bul_right = bul_left + 4;
    var ufo = document.getElementById('ufo');
    var ufo_top = parseInt(ufo.style.top);
    var ufo_bottom = ufo_top + ufo.offsetHeight;
    var ufo_left = parseInt(ufo.style.left);
    var ufo_right = ufo_left + ufo.offsetWidth;
    if (bul_top < ufo_bottom && bul_left > ufo_left && bul_right < ufo_right) {
        shoot();
        score_count(10);
        ufo_lives_count(1);
    }
};
var ufobul_vs_ship = function () {
    var ufobullet = document.getElementById('ufobullet');
    var ufobul_top = parseInt(ufobullet.style.top);
    var ufobul_bottom = ufobul_top + ufobullet.offsetHeight;
    var ufobul_left = parseInt(ufobullet.style.left);
    var ufobul_right = ufobul_left + 8;
    var ship = document.getElementById('ship');
    var ship_top = parseInt(ship.style.top);
    var ship_bottom = ship_top + parseInt(ship.style.height);
    var ship_left = parseInt(ship.style.left);
    var ship_right = ship_left + parseInt(ship.style.width);
    if (ufobul_bottom > ship_top && ufobul_top < ship_bottom && ufobul_left > ship_left && ufobul_right < ship_right) {
        lives_count(1);
        ufoshoot();
        ship.style.display = 'none';
        shipExplosion();
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
        shipExplosion();
    }
};
var ship_vs_p2 = function () {
    var ship = document.getElementById('ship');
    var ship_top = parseInt(ship.style.top);
    var ship_bottom = ship_top + parseInt(ship.style.height);
    var ship_left = parseInt(ship.style.left);
    var ship_right = ship_left + parseInt(ship.style.width);
    var planetoid2 = document.getElementById('planetoid2');
    var p2_top = parseInt(planetoid2.style.top);
    var p2_bottom = parseInt(planetoid2.style.top) + parseInt(planetoid2.style.height);
    var p2_left = parseInt(planetoid2.style.left);
    var p2_right = parseInt(planetoid2.style.left) + parseInt(planetoid2.style.width);
    if (ship_top < p2_bottom && ship_bottom > p2_top && ship_right > p2_left && ship_left < p2_right) {
        lives_count(1);
        planetoid2.style.top = -200 + 'px';
        ship.style.display = 'none';
        shipExplosion();
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
    if (lives < 1) {
        setTimeout(function () {
            game_over();
        }, 10);
    }
};
var ufo_lives_count = function (c) {
    ufo_lives = ufo_lives - c;
    if (ufo_lives == 0) {
        document.getElementById('ufo').style.display = 'none';
        score_count(50);
        ufoExplosion();
        ufo_lives = 3;
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
    laser2.play();
};
var shootanim = function () {
    var bullet = document.getElementById('bullet');
    var bulletY = parseInt(bullet.style.top);
    bulletY = bulletY + shootY;
    bullet.style.top = bulletY + 'px';
    if (bulletY < 0) {
        shoot();
    }
};
var ufoshoot = function () {
    var ufo = document.getElementById('ufo');
    var ufobullet = document.getElementById('ufobullet');
    var ufoshoot_startx = parseInt(ufo.style.left) + ufo.offsetWidth / 2 - 2;
    var ufoshoot_starty = parseInt(ufo.style.top);
    ufobullet.style.opacity = '1';
    ufobullet.style.left = ufoshoot_startx + 'px';
    ufobullet.style.top = ufoshoot_starty + 'px';
    laser1.play();
};
var ufoshootanim = function () {
    var ufobullet = document.getElementById('ufobullet');
    var ufobulletY = parseInt(ufobullet.style.top);
    ufobulletY = ufobulletY + ufoshootY;
    ufobullet.style.top = ufobulletY + 'px';
};
var ufoExplosion = function () {
    var ufo = document.getElementById('ufo');
    var ufoExplosion = document.getElementById('ufoExplosion');
    ufoExplosion.style.opacity = '1';
    ufoExplosion.style.left = ufo.style.left;
    ufoExplosion.style.top = ufo.style.top;
    hit1.play();
    setTimeout(function () {
        ufoExplosion.style.opacity = '0';
        ufo.style.display = 'block';
    }, 500);
};
var shipExplosion = function () {
    var ship = document.getElementById('ship');
    var shipExplosion = document.getElementById('shipExplosion');
    shipExplosion.style.opacity = '1';
    shipExplosion.style.left = ship.style.left;
    shipExplosion.style.top = ship.style.top;
    hit2.play();
    setTimeout(function () {
        shipExplosion.style.opacity = '0';
        ship.style.display = 'block';
    }, 500);
};
var game_over = function () {
    if (score < 500) {
        alert('Twój wynik to: ' + score + '.\n Niestety tym razem nie udało Ci się zgarnąc rabatu.\n Spróbuj jeszcze raz!');
        location.reload();
    }
    if (score >= 500 && score < 2000) {
        alert('Twój wynik to: ' + score + '.\n Gratulacje!!! Zgarniasz 5% rabatu!!!\n KOD RABATOWY: DDSPACESHOOTER5BONUS');
        location.reload();
    }
    if (score >= 2000) {
        alert('Twój wynik to: ' + score + '.\n Gratulacje!!! Zgarniasz 10% rabatu!!!\n KOD RABATOWY: DDSPACESHOOTERBONUS10');
        location.reload();
    }
};
// window resize
window.onresize = function () { location.reload(); };
