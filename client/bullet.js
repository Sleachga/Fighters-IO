/*
 *  bullet.js by Sandy Leach 
 *  7/5/2017
 *  Bullet class for game
 */

var shuriken = new Image();
shuriken.src = '/client/img/shuriken2.png';

var Bullet = function(initPack)
{
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.parentId = initPack.parentId;
    self.draw = function() 
    {
        var image = true;
        if (image)
        {
            var width, height, x, y;

            if (Player.list[self.parentId].character === 'ninja')
            {
                width = shuriken.width/2;
                height = shuriken.height/2;
                x = self.x - Player.list[selfId].x + WIDTH/2;
                y = self.y - Player.list[selfId].y + HEIGHT/2;
                ctx.drawImage(shuriken,
                    0,0, shuriken.width, shuriken.height,
                    x-width/2, y-height/2, width, height);
            } 
            else 
            {
                width = Img.bullet.width/2;
                height = Img.bullet.height/2;
                x = self.x - Player.list[selfId].x + WIDTH/2;
                y = self.y - Player.list[selfId].y + HEIGHT/2;
                ctx.drawImage(Img.bullet,
                    0,0, Img.bullet.width, Img.bullet.height,
                    x-width/2, y-height/2, width, height);
            }
        }
        else
        {
            ctx.fillStyle = 'red';
            ctx.fillRect(self.x-5, self.y-5, 10, 10);
        }
    };
    Bullet.list[self.id] = self;
    return self;
};

Bullet.list = {};