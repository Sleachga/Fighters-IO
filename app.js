/*
 *  app.js by Sandy Leach
 *  7/5/2017
 *  Player class for game
 *
 *  TODO:
 *
 *  Stop players from moving within 5 pixels of each other
 *  Label all variables
 *
 *  Make Mage Animations
 *  Make Mage reload time much longer
 *  Make Mage damage High
 *  Change bullets Based off Class
 *
 *  Make Sword Animation for knight
 *  Have a point based off of angle + distance
 *  If that point is within a certain amount of pixels of a player
 *      do damage
 *
 *  Change movement speed accordingly
 *
 *  Make the map larger and match player map constraints
 *
 *  Long-Term -> Switch to acceleration instead of simple speed
 *
 */

// var mongojs = require("mongojs");
var db = null; // mongojs('localhost:27017/myGame', ["account", "progress"]);

var express = require('express');
var app = express();
var serv = require('http').Server(app);

// gets index.html for express
app.get('/', function (req, res)
{
    res.sendFile(__dirname + '/client/index.html');
});

// uses /client as directory
app.use('/client', express.static(__dirname + '/client'));

// emits on localhost:1997
var port = (process.env.PORT || 1997);
serv.listen(port);
console.log("Server started on port " + port);

// Socket List Array for iteration
var SOCKET_LIST = {};

var canvasWidth;
var canvasHeight;

// Base variable for all objects
var Entity = function ()
{
    var self =
        {
            x: 10 + Math.random() * 480,
            y: 10 + Math.random() * 480,
            acceleration: 0,
            spdX: 0,
            spdY: 0,
            id: ""
        };
    // update function
    self.update = function ()
    {
        self.updatePosition();
    };
    // updatePosition() that updates location based on speed x and y
    self.updatePosition = function ()
    {
        // A = Δv / t
        // acceleration = ΔspdX / t
        self.x += self.spdX + self.acceleration;
        self.y += self.spdY + self.acceleration;
    };

    self.getDistance = function (pt)
    {
        return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
    };

    return self;
};

var Turret = function (id, x, y)
{
    var self = Entity();

    self.id = id;
    self.x = x;  // player horizontal position
    self.y = y;  // player vertical position
    self.shotAngle = 0; // R // player shot angle
    self.reload = 5; //
    self.reloadTimer = 0;
    self.hp = 10;
    self.hpMax = 10;
    self.combatList = [];
    self.attacking = false;
    self.toRemove = false;
    self.range = 200;
    self.score = 0;
    self.bulletSpeed = 2;
    self.damage = 2;

    self.getInitPack = function ()
    {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            hp: self.hp,
            hpMax: self.hpMax
        };
    };

    self.getUpdatePack = function ()
    {
        return {
            hp: self.hp,
            attacking: self.attacking,
            attackList: self.attackList,
            acceleration: self.acceleration

        }
    };

    self.shootBullet = function (angle)
    {
        var b = Bullet(self.id, self.angle, self.bulletSpeed, self.damage);
        b.x = self.x + 30;
        b.y = self.y + 30;
    };

    self.update = function ()
    {
        self.combat();
        if (self.hp <= 0) self.toRemove = true;
    };

    self.getDistance = function (x, y)
    {
        return Math.sqrt(Math.pow(self.x - x, 2) + Math.pow(self.y - y, 2));
    };

    self.combat = function ()
    {
        var x, y, id;

        // Check player list and add in-range players to combatList
        for (var i in Player.list)
        {
            var skip = false;

            x = Player.list[i].x;
            y = Player.list[i].y;

            // CHECK IF THE PLAYER IS ALREADY IN THE LIST
            for (var j in self.combatList)
            {
                if (Player.list[i].id === self.combatList[j])
                    skip = true;
            }

            if (!skip && self.getDistance(x, y) <= self.range)
            {
                self.combatList.push(Player.list[i].id);
                // console.log('Turret ' + self.id + ' added user ' + Player.list[i].id);
            }
        }

        // Check combatList and remove players out of range
        for (var i in self.combatList)
        {
            id = self.combatList[i];
            x = Player.list[id].x;
            y = Player.list[id].y;

            var distance = self.getDistance(x, y);

            if (distance > self.range)
            {
                // console.log('Turret ' + self.id + ' removed user ' + id);
                self.combatList.splice(i, 1);
            }
        }

        // Shoot at the first player at list
        if (self.reloadTimer >= self.reload &&
            self.combatList.length > 0)
        {
            id = self.combatList[0];
            x = Player.list[id].x;
            y = Player.list[id].y;

            var angle = Math.atan2(y - self.y, x - self.x) * 180 / Math.PI;
            self.shootBullet(angle);
            self.reloadTimer = 0;
        }
        self.reloadTimer++;
    };

    Turret.list[self.id] = self;
    initPack.turret.push(self.getInitPack());
    return self;
};

Turret.list = {};

Turret.getAllInitPack = function ()
{
    var turrets = [];
    for (var i in Turret.list)
        turrets.push(Turret.list[i].getInitPack());
    return turrets;
};

Turret.update = function ()
{
    var pack = [];
    for (var i in Turret.list)
    {
        var turret = Turret.list[i];
        turret.update();
        if (turret.toRemove)
        {
            delete Turret.list[i];
            removePack.turret.push(turret.id);
        }
        else
            pack.push(turret.getUpdatePack());
    }
    return pack;
};

// Player object
var Player = function (id)
{
    var self = Entity();
    self.id = id;
    self.number = "" + Math.floor(10 * Math.random());
    self.x = Math.random() * 500;
    self.y = Math.random() * 500;
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.pressingAttack = false;
    self.mouseAngle = 0;
    self.maxSpd = 10;
    self.hp = 10;
    self.hpMax = 10;
    self.score = 0;
    self.reload = 5;
    self.reloadTimer = 0;
    self.special = false;
    self.character = 'undefined';
    self.pickedClass = false;
    self.bulletSpeed = 1;
    self.ninjaReload = 0;
    self.damage = 1;

    var super_update = self.update;

    // update() uses polymorphism and checks conditions to shoot bullets

    self.update = function ()
    {
        self.reloadTimer++;

        self.updateSpd();
        super_update();

        if (self.pressingAttack && self.reloadTimer > self.reload)
        {
            self.shootBullet(self.mouseAngle);
            self.reloadTimer = 0;
        }
        else if (self.class === 'knight')
        {
            // Put the shield up
        }
    };

    self.shootBullet = function(angle)
    {
        if (self.character === 'ninja')
        {
            self.ninjaReload++;

            if (self.ninjaReload === 3)
            {
                self.ninjaReload = 0;
                self.reload = 30;
            }
            else
            {
                self.reload = 2;

                var a = Bullet(self.id, angle, self.bulletSpeed, self.damage);
                a.x = self.x;
                a.y = self.y;

                var b = Bullet(self.id, angle - 10, self.bulletSpeed, self.damage);
                b.x = self.x;
                b.y = self.y;

                var c = Bullet(self.id, angle + 10, self.bulletSpeed, self.damage);
                c.x = self.x;
                c.y = self.y;
            }
        }
        else
        {
            console.log('Class not picked');
            var b = Bullet(self.id, angle, self.bulletSpeed, self.damage);
            b.x = self.x;
            b.y = self.y;
        }
    };


    self.updateSpd = function ()
    {
        if (self.pressingRight && self.x <= 1000)
            self.spdX = self.maxSpd;
        else if (self.pressingLeft && self.x >= 0)
            self.spdX = -self.maxSpd;
        else
            self.spdX = 0;

        if (self.pressingUp && self.y >= 0)
            self.spdY = -self.maxSpd;
        else if (self.pressingDown && self.y <= 1000)
            self.spdY = self.maxSpd;
        else
            self.spdY = 0;
    };

    self.getInitPack = function ()
    {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            hpMax: self.hpMax,
            score: self.score,
            class: self.class
        };
    };

    self.getUpdatePack = function ()
    {
        if (!self.pickedClass)
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                hp: self.hp,
                score: self.score
            };
        else
            return {
                id: self.id,
                x: self.x,
                y: self.y,
                hp: self.hp,
                score: self.score,
                character: self.character,
                pressingAttack: self.pressingAttack,
                pressingUp: self.pressingUp,
                pressingDown: self.pressingDown,
                pressingLeft: self.pressingLeft,
                pressingRight: self.pressingRight,
                mouseAngle: self.mouseAngle,
                acceleration: self.acceleration
            }
    };

    Player.list[id] = self;
    initPack.player.push(self.getInitPack());
    return self;
};

Player.list = {};

Player.onConnect = function (socket)
{
    var player = Player(socket.id);
    socket.on('keyPress', function (data)
    {
        if (data.inputId === 'left')
            player.pressingLeft = data.state;
        else if (data.inputId === 'right')
            player.pressingRight = data.state;
        else if (data.inputId === 'up')
            player.pressingUp = data.state;
        else if (data.inputId === 'down')
            player.pressingDown = data.state;
        else if (data.inputId === 'attack')
            player.pressingAttack = data.state;
        else if (data.inputId === 'mouseAngle')
        {
            console.log('Player ' + data.id + ' Angle ' + Math.round(data.stat));

            if (Player.list[data.id])
            {
                Player.list[data.id].mouseAngle = Math.round(data.state);

                console.log("Player: " + data.id + " Angle: " + Player.list[data.id].mouseAngle);
            }

            // player.list[data.id].mouseAngle = Math.round(data.state);
        }

        else if (data.inputId === 'space')
            player.special = data.state;
    });

    socket.emit('init',
        {
            selfId: socket.id,
            player: Player.getAllInitPack(),
            bullet: Bullet.getAllInitPack(),
            turret: Turret.getAllInitPack(),
        });
};

Player.getAllInitPack = function ()
{
    var players = [];
    for (var i in Player.list)
        players.push(Player.list[i].getInitPack());
    return players;
};

Player.onDisconnect = function (socket)
{
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
};

Player.update = function ()
{
    var pack = [];
    for (var i in Player.list)
    {
        var player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
};

var Bullet = function (parent, angle, speed, damage)
{
    var self = Entity();
    self.id = Math.random();
    self.speed = speed;
    self.spdX = self.speed * Math.cos(angle / 180 * Math.PI) * 10;
    self.spdY = self.speed * Math.sin(angle / 180 * Math.PI) * 10;
    self.damage = damage;
    self.parent = parent;
    self.timer = 0;
    self.toRemove = false;
    var super_update = self.update;

    self.update = function ()
    {
        if (self.timer++ > 20)
            self.toRemove = true;

        super_update();

        for (var i in Player.list)
        {
            var p = Player.list[i];

            if (self.getDistance(p) < 32 && self.parent !== p.id)
            {
                p.hp -= self.damage;

                if (p.hp <= 0)
                {
                    var shooter = Player.list[self.parent];
                    if (shooter)
                        shooter.score += 1;
                    p.hp = p.hpMax;
                    p.x = Math.random() * 500;
                    p.y = Math.random() * 500;
                }

                self.toRemove = true;
            }
        }

        for (var i in Turret.list)
        {
            var t = Turret.list[i];
            var bangCounter = 0;

            if (self.getDistance(t) < 32 && self.parent !== t.id)
            {
                console.log('bang!' + bangCounter++);
                t.hp -= self.damage;

                if (t.hp <= 0)
                {
                    var shooter = Player.list[self.parent];
                    if (shooter)
                        shooter.score += 1;
                    t.hp = t.hpMax;
                    t.x = Math.random() * 1000;
                    t.y = Math.random() * 1000;
                }

                self.toRemove = true;
            }
        }
    };

    self.getInitPack = function ()
    {
        return {
            parentId: self.parent,
            id: self.id,
            x: self.x,
            y: self.y,
        };
    };

    self.getUpdatePack = function ()
    {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            acceleration: self.acceleration,
        };
    };

    Bullet.list[self.id] = self;
    initPack.bullet.push(self.getInitPack());
    return self;
};

Bullet.list = {};

Bullet.update = function ()
{
    var pack = [];
    for (var i in Bullet.list)
    {
        var bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove)
        {
            delete Bullet.list[i];
            removePack.bullet.push(bullet.id);
        }
        else
            pack.push(bullet.getUpdatePack());
    }
    return pack;
};

Bullet.getAllInitPack = function ()
{
    var bullets = [];
    for (var i in Bullet.list)
        bullets.push(Bullet.list[i].getInitPack());
    return bullets;
};

var DEBUG = false;

var isValidPassword = function (data, cb)
{
    return cb(true);
    db.account.find({username: data.username, password: data.password}, function (err, res)
    {
        if (res.length > 0)
            cb(true);
        else
            cb(false);
    });
};

var isUsernameTaken = function (data, cb)
{
    return cb(false);
    db.account.find({username: data.username}, function (err, res)
    {
        if (res.length > 0)
            cb(true);
        else
            cb(false);
    });
};

var addUser = function (data, cb)
{
    return cb();
    db.account.insert(
        {
            username: data.username,
            password: data.password
        }, function (err)
        {
            cb();
        });
};

var io = require('socket.io')(serv, {});

io.sockets.on('connection', function (socket)
{
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    var autoSign = false;

    socket.on('canvasWidth', function (data)
    {
        canvasWidth = data;
        alert(canvasWidth);
    });

    socket.on('canvasHeight', function (data)
    {
        canvasHeight = data;
        alert(canvasHeight);
    });

    socket.on('signIn', function (data)
    {
        socket.emit('signInResponse', {success: true});

        isValidPassword(data, function (res)
        {
            if (res)
            {
                Player.onConnect(socket);
                socket.emit('signInResponse', {success: true});
            }
            else
            {
                socket.emit('signInResponse', {success: false});
            }
        });
    });

    socket.on('signUp', function (data)
    {
        isUsernameTaken(data, function (res)
        {
            if (res)
            {
                socket.emit('signUpResponse', {success: false});
            }
            else
            {
                addUser(data, function ()
                {
                    socket.emit('signUpResponse', {success: true});
                });
            }
        });
    });

    socket.on('disconnect', function ()
    {
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });

    socket.on('sendMsgToServer', function (data)
    {
        var playerName = ("" + socket.id).slice(2, 7);
        for (var i in SOCKET_LIST)
        {
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);
        }
    });

    socket.on('evalServer', function (data)
    {
        if (!DEBUG) return;

        var res = eval(data);

        socket.emit('evalAnswer', res);
    });

    // delete this in future, might not be necessary - this can be done locally
    socket.on('playerChoice', function (data)
    {
        console.log('Recieved player choice - Player ID: ' + data.id + ' Player Choice: ' + data.choice);
        Player.list[data.id].character = data.choice;
        Player.list[data.id].pickedClass = true;

        var curPlayer = Player.list[data.id];

        // Specific class variables are set
        if (data.choice === 'ninja')
        {
            curPlayer.maxSpd = 10;
            curPlayer.reload = 2;
            curPlayer.bulletSpeed = 2;
        }
        else if (data.choice === 'knight')
        {
            //Do knight Stuff
            curPlayer.maxSpd = 5;
            curPlayer.damage = 5;
        }
        else if (data.choice === 'engineer')
        {
            //Do engineer Stuff
            curPlayer.bulletSpeed = 0;
            curPlayer.reload = 1.5;
        }
        else if (data.choice === 'mage')
        {
            curPlayer.reload = 10;
            curPlayer.bulletSpeed = 3;
        }

        socket.emit('PlayerChoiceAns', data.choice);
    });
});

var initPack = {player: [], bullet: [], turret: []};
var removePack = {player: [], bullet: [], turret: []};

var turretCounter = 0;
var numTurrets = 0;

var createTurret = function (x, y)
{
    var t = Turret(numTurrets++, x, y);
    console.log("Turret Created! " + numTurrets);
};

setInterval(function ()
{
    // Generates turrets

    // if (turretCounter++ === 100 && numTurrets < 2)
    // {
    //     createTurret(Math.random() * 1000, Math.random() * 1000)
    //     turretCounter = 0;
    // }

    var pack =
        {
            player: Player.update(),
            bullet: Bullet.update(),
            turret: Turret.update()
        };

    for (var i in SOCKET_LIST)
    {
        var socket = SOCKET_LIST[i];
        socket.emit('init', initPack);
        socket.emit('update', pack);
        socket.emit('remove', removePack);
    }

    initPack.player = [];
    initPack.bullet = [];
    initPack.turret = [];
    removePack.player = [];
    removePack.bullet = [];
    removePack.turret = [];

}, 1000 / 25);
