
//creators

const sp_ship = {
    width: 100,
    height: 100
};

const planet1 = {
    width: 150,
    height: 150
}

const planet2 = {
    width: 200,
    height: 200
}

const diamond = {
    width: 60,
    height: 60
}

const juefo = {
    width: 120,
    height: 77
}


//virables

var shootY = -15;
var ufoshootY = 18;
var diamY = 15;
var planetoidY = 12;
var planetoidY2 = 15;
var score = 0;
var lives = 5;
var ufoSpeed = 5;
var ufoLeft = 0;
var ufoRight = 0;
var direction = 'right';
var ufo_lives = 3;

window.addEventListener('load', () => {
    var startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'flex';
});

let startbtn = () => {
    var startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    loadAll();

}



// Load all elements
let loadAll = () => {
    const BOARD = document.getElementById('board');
    const BOARD_WIDTH = BOARD.offsetWidth;
    const BOARD_HEIGHT = BOARD.offsetHeight;
    const BOARD_LEFT = BOARD.offsetLeft;
    const BOARD_RIGHT = BOARD_LEFT + BOARD_WIDTH;
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
        shoot();
        ufoshoot();
    }, 1600);

    setInterval(function () {
        planetoid1_start();
        planetoid2_start();
    }, 3000);

    setInterval(function () {
        diamond1_start();
    }, 5000);

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

    document.addEventListener('mousemove', (e) => {
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

    let diamond1_start = () => {
        var diamond1 = document.getElementById('diamond1');
        var diamond1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - diamond.width);
        diamond1.style.left = diamond1_X + 'px';
        diamond1.style.top = -100 + 'px';
    }

    let diamondanim = () => {
        var diamond1 = document.getElementById('diamond1');
        let diamond1Y = parseInt(diamond1.style.top);
        diamond1Y = diamond1Y + diamY;
        diamond1.style.top = diamond1Y + 'px';
    }
    //ufo anim and collision


    let ufoposition = () => {
        var ufo = document.getElementById('ufo');
        ufoLeft = parseInt(ufo.style.left);
        ufoRight = ufoLeft + ufo.offsetWidth;

        if (direction == 'right') {
            if (ufoRight >= BOARD_RIGHT) {
                direction = 'left';
                ufoSpeed = -ufoSpeed;
            }

        }
        if (direction == 'left') {
            if (ufoLeft <= BOARD_LEFT) {
                direction = 'right';
            }
        }
        ufoLeft = ufoLeft + ufoSpeed;
        ufoRight = ufoLeft + ufo.offsetWidth;
        ufo.style.left = ufoLeft + 'px';


        if (ufoLeft <= BOARD_LEFT) {
            ufoSpeed = -ufoSpeed;
            return ufoSpeed;
        }

    }



    //planetoids

    let planetoid2_start = () => {
        var planetoid2 = document.getElementById('planetoid2');
        var planetoid2_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - planet1.width);
        planetoid2.style.left = planetoid2_X + 'px';
        planetoid2.style.top = -100 + 'px';
        planetsPos2();
    }


    let planetoid1_start = () => {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT - planet1.width);
        planetoid1.style.left = planetoid1_X + 'px';
        planetoid1.style.top = -100 + 'px';
        planetoid1.style.width = planet1.width + 'px';
        planetoid1.style.height = planet1.height + 'px';
        planetsPos1();
    }

    let planetoidanim = () => {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid2 = document.getElementById('planetoid2');
        let planetoid1Y = parseInt(planetoid1.style.top);
        let planetoid2Y = parseInt(planetoid2.style.top);
        planetoid1Y = planetoid1Y + planetoidY;
        planetoid2Y = planetoid2Y + planetoidY2;
        planetoid1.style.top = planetoid1Y + 'px';
        planetoid2.style.top = planetoid2Y + 'px';
    }

    let planetsPos2 = () => {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid2 = document.getElementById('planetoid2');
        let planetoid1Left = parseInt(planetoid1.style.left);
        let planetoid1Right = planetoid1Left + planetoid1.offsetWidth;

        let planetoid2Left = parseInt(planetoid2.style.left);
        let planetoid2Right = planetoid2Left + planetoid2.offsetWidth;

        if (planetoid2Right <= planetoid1Left && planetoid2Left >= planetoid1Right) {
            planetoid2_start();
        }
    }
    let planetsPos1 = () => {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid2 = document.getElementById('planetoid2');
        let planetoid1Left = parseInt(planetoid1.style.left);
        let planetoid1Right = planetoid1Left + planetoid1.offsetWidth;

        let planetoid2Left = parseInt(planetoid2.style.left);
        let planetoid2Right = planetoid2Left + planetoid2.offsetWidth;

        if (planetoid1Right <= planetoid2Left && planetoid1Left >= planetoid2Right) {
            planetoid1_start();
        }
    }


    let diam_vs_ship = () => {
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
        }
    }
};

//collisions

let bul_vs_p1 = () => {
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
}

let bul_vs_p2 = () => {
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
}

let bul_vs_ufo = () => {
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
}

let ufobul_vs_ship = () => {
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

}





let ship_vs_p1 = () => {
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
}

let ship_vs_p2 = () => {
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
}

//score and lives
let score_count = (a) => {
    score = score + a;
    document.getElementById('score_cell').innerHTML = '' + score;
};

let lives_count = (b) => {
    lives = lives - b;
    document.getElementById('lives_cell').innerHTML = '' + lives;
    if (lives == 0) {
        game_over();
    }

}

let ufo_lives_count = (c) => {
    ufo_lives = ufo_lives - c;
    if (ufo_lives == 0) {
        document.getElementById('ufo').style.display = 'none';
        score_count(50);
        ufoExplosion();
        ufo_lives = 3;
    }
}

//shooting

let shoot = () => {
    var ship = document.getElementById('ship');
    var bullet = document.getElementById('bullet');
    let shoot_startx = parseInt(ship.style.left) + sp_ship.width / 2 - 2;
    let shoot_starty = parseInt(ship.style.top);
    bullet.style.opacity = '1';
    bullet.style.left = shoot_startx + 'px';
    bullet.style.top = shoot_starty + 'px';
}

let shootanim = () => {
    var bullet = document.getElementById('bullet');
    let bulletY = parseInt(bullet.style.top);
    bulletY = bulletY + shootY;
    bullet.style.top = bulletY + 'px';
}

let ufoshoot = () => {
    var ufo = document.getElementById('ufo');
    var ufobullet = document.getElementById('ufobullet');
    let ufoshoot_startx = parseInt(ufo.style.left) + ufo.offsetWidth / 2 - 2;
    let ufoshoot_starty = parseInt(ufo.style.top);
    ufobullet.style.opacity = '1';
    ufobullet.style.left = ufoshoot_startx + 'px';
    ufobullet.style.top = ufoshoot_starty + 'px';
}

let ufoshootanim = () => {
    var ufobullet = document.getElementById('ufobullet');
    let ufobulletY = parseInt(ufobullet.style.top);
    ufobulletY = ufobulletY + ufoshootY;
    ufobullet.style.top = ufobulletY + 'px';
}

let ufoExplosion = () => {
    var ufo = document.getElementById('ufo');
    var ufoExplosion = document.getElementById('ufoExplosion');
    ufoExplosion.style.opacity = '1';
    ufoExplosion.style.left = ufo.style.left;
    ufoExplosion.style.top = ufo.style.top;
    setTimeout(function () {
        ufoExplosion.style.opacity = '0';
        ufo.style.display = 'block';
    }, 500);
}

let shipExplosion = () => {
    var ship = document.getElementById('ship');
    var shipExplosion = document.getElementById('shipExplosion');
    shipExplosion.style.opacity = '1';
    shipExplosion.style.left = ship.style.left;
    shipExplosion.style.top = ship.style.top;
    setTimeout(function () {
        shipExplosion.style.opacity = '0';
        ship.style.display = 'block';
    }, 500);
}

let game_over = () => {
    if (score<500){
        alert('Twój wynik to: ' + score + '.\n Niestety tym razem nie udało Ci się zgarnąc rabatu.\n Spróbuj jeszcze raz!');
        location.reload();
    }
    if (score>=500 && score<2000){
        alert('Twój wynik to: ' + score + '.\n Gratulacje!!! Zgarniasz 5% rabatu!!!\n KOD RABATOWY: DDSPACESHOOTER5BONUS');
        location.reload();
    }
    if (score>=2000){
        alert('Twój wynik to: ' + score + '.\n Gratulacje!!! Zgarniasz 10% rabatu!!!\n KOD RABATOWY: DDSPACESHOOTERBONUS10');
        location.reload();
    }
}

