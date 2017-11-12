/*
 *  bullet.js by Sandy Leach 
 *  7/5/2017
 *  Turret class for game
 */

var Turret = function(initPack)
{
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.hp = initPack.hp;
    self.hpMax = initPack.hpMax;
    self.draw = function()
    {
        var x = WIDTH/2 - Player.list[selfId].x + self.x;
        var y = HEIGHT/2 - Player.list[selfId].y + self.y;
        ctx.drawImage(Img.turret, x, y);

        // Draw Health Bar
        var hpWidth = 30 * self.hp / self.hpMax;
        ctx.fillStyle = 'red';
        ctx.fillRect(x + 10, y, hpWidth, 4);
    };

    Turret.list[self.id] = self;
    return self;
};

Turret.list = {};