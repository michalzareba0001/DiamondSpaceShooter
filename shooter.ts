//creators

const sp_ship = {
    width: 100,
    height: 100
};

const planet1 = {
    width: 150,
    height: 150
}

const diamond = {
    width: 60,
    height: 60
}

//virables

var shootY = -15;
var diamY = 5;
var planetoidY = 10;
var score = 0;
var lives = 5;



// Load all elements
window.addEventListener('load', () => {
    const BOARD = document.getElementById('board');
    const BOARD_WIDTH = BOARD.offsetWidth;
    const BOARD_HEIGHT = BOARD.offsetHeight;
    const BOARD_LEFT = BOARD.offsetLeft;
    const BOARD_RIGHT = BOARD_LEFT + BOARD_WIDTH;
    var ship = document.getElementById('ship');
    var diamond1 = document.getElementById('diamond1');
    var planetoid1 = document.getElementById('planetoid1')

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
        var diamond1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT-diamond.width);
        diamond1.style.left = diamond1_X + 'px';
        diamond1.style.top = -100 + 'px';
    }

    let diamondanim = () => {
        var diamond1 = document.getElementById('diamond1');
        let diamond1Y = parseInt(diamond1.style.top);
        diamond1Y = diamond1Y + diamY;
        diamond1.style.top = diamond1Y + 'px';
    }


    //planetoids

    let planetoid2_start = () => {
        var planetoid2 = document.getElementById('planetoid2');
        var planetoid2_X = randomNumber(BOARD_LEFT, BOARD_RIGHT-planet1.width);
        planetoid2.style.left = planetoid2_X + 'px';
        planetoid2.style.top = -100 + 'px';



    let planetoid1_start = () => {
        var planetoid1 = document.getElementById('planetoid1');
        var planetoid1_X = randomNumber(BOARD_LEFT, BOARD_RIGHT-planet1.width);
        planetoid1.style.left = planetoid1_X + 'px';
        planetoid1.style.top = -100 + 'px';
        planetoid1.style.width = planet1.width + 'px';
        planetoid1.style.height = planet1.height + 'px';
    }

    let planetoidanim = () => {
        var planetoid1 = document.getElementById('planetoid1');
        let planetoid1Y = parseInt(planetoid1.style.top);
        planetoid1Y = planetoid1Y + planetoidY;
        planetoid1.style.top = planetoid1Y + 'px';
    }
});

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
        score_count(1);
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
        diam.style.top = -50 + 'px'; 
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
        setTimeout( function (){
            ship.style.display = 'block';
        }, 200);

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
        alert('Game Over');
        location.reload();
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

