/*
 *  bullet.js by Sandy Leach
 *  7/5/2017
 *  Player class for game
 *
 *  TODO:
 *
 *  Every level up player gets to pick to upgrade a stat
 *  Every 5 level up player gets to pick between two different power ups
 *
 *
 */

var shield = new Image();
shield.src = '/client/img/shield.png';

var Player = function(initPack)
{
    var self = {};
    self.id = initPack.id;
    self.number = initPack.number;
    self.x = initPack.x;
    self.y = initPack.y;
    self.hp = initPack.hp;
    self.hpMax = initPack.hpMax;
    self.hp = initPack.hp;
    self.score = initPack.score;
    self.characterPicked = false;
    self.character = initPack.character;
    self.spriteCounter = 0;
    self.up = false;
    self.down = false;
    self.left = false;
    self.right = false;
    self.space = false;
    self.attacking = false;
    self.mouseAngle = 0;

    self.draw = function()
    {
        var image = true;
        if (image)
        {
            var x = self.x - Player.list[selfId].x + WIDTH/2;
            var y = self.y - Player.list[selfId].y + HEIGHT/2;

            // HP Bar
            var hpWidth = 30 * self.hp / self.hpMax;
            ctx.fillStyle = 'black';
            ctx.fillRect(x - hpWidth/2 - 1, y - 40 - 1, hpWidth + 2, 6);

            if (self.id === selfId)
                ctx.fillStyle = 'green';
            else
                ctx.fillStyle = 'red';
            ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4);

            // Player
            switch(self.character)
            {
                case 'knight':

                    // Draw shield
                    var testNum = 0;
                    var realAngle;

                    if (!self.attacking)
                    {
                        // Convert from -180-180 to 0-360
                        //angle = angle.round();
                        realAngle = ((self.mouseAngle + 450) % 360);

                        var radians = Math.PI/180;
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(realAngle * radians);
                        ctx.drawImage(shield, -15, -30);
                        ctx.restore();
                    }

                    if (self.up && !self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightUp1.width*2;
                            var height = Img.knightUp1.height*2;
                            ctx.drawImage(Img.knightUp1,
                                0,0, Img.knightUp1.width, Img.knightUp1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightUp2.width*2;
                            var height = Img.knightUp2.height*2;
                            ctx.drawImage(Img.knightUp2,
                                0,0, Img.knightUp2.width, Img.knightUp2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightUp3.width*2;
                            var height = Img.knightUp3.height*2;
                            ctx.drawImage(Img.knightUp3,
                                0,0, Img.knightUp3.width, Img.knightUp3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightUp4.width*2;
                            var height = Img.knightUp4.height*2;
                            ctx.drawImage(Img.knightUp4,
                                0,0, Img.knightUp4.width, Img.knightUp4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (self.up && !self.left && self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightUpRight1.width*2;
                            var height = Img.knightUpRight1.height*2;
                            ctx.drawImage(Img.knightUpRight1,
                                0,0, Img.knightUpRight1.width, Img.knightUpRight1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightUpRight2.width*2;
                            var height = Img.knightUpRight2.height*2;
                            ctx.drawImage(Img.knightUpRight2,
                                0,0, Img.knightUpRight2.width, Img.knightUpRight2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightUpRight3.width*2;
                            var height = Img.knightUpRight3.height*2;
                            ctx.drawImage(Img.knightUpRight3,
                                0,0, Img.knightUpRight3.width, Img.knightUpRight2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightUpRight4.width*2;
                            var height = Img.knightUpRight4.height*2;
                            ctx.drawImage(Img.knightUpRight4,
                                0,0, Img.knightUpRight4.width, Img.knightUpRight4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightRight1.width*2;
                            var height = Img.knightRight1.height*2;
                            ctx.drawImage(Img.knightRight1,
                                0,0, Img.knightRight1.width, Img.knightRight1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightRight2.width*2;
                            var height = Img.knightRight2.height*2;
                            ctx.drawImage(Img.knightRight2,
                                0,0, Img.knightRight2.width, Img.knightRight2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightRight3.width*2;
                            var height = Img.knightRight3.height*2;
                            ctx.drawImage(Img.knightRight3,
                                0,0, Img.knightRight3.width, Img.knightRight3.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightRight4.width*2;
                            var height = Img.knightRight4.height*2;
                            ctx.drawImage(Img.knightRight4,
                                0,0, Img.knightRight4.width, Img.knightRight4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightDownRight1.width*2;
                            var height = Img.knightDownRight1.height*2;
                            ctx.drawImage(Img.knightDownRight1,
                                0,0, Img.knightDownRight1.width, Img.knightDownRight1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightDownRight2.width*2;
                            var height = Img.knightDownRight2.height*2;
                            ctx.drawImage(Img.knightDownRight2,
                                0,0, Img.knightDownRight2.width, Img.knightDownRight2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightDownRight3.width*2;
                            var height = Img.knightDownRight3.height*2;
                            ctx.drawImage(Img.knightDownRight3,
                                0,0, Img.knightDownRight3.width, Img.knightDownRight3.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightDownRight4.width*2;
                            var height = Img.knightDownRight4.height*2;
                            ctx.drawImage(Img.knightDownRight4,
                                0,0, Img.knightDownRight4.width, Img.knightDownRight4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && !self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightDown1.width*2;
                            var height = Img.knightDown1.height*2;
                            ctx.drawImage(Img.knightDown1,
                                0,0, Img.knightDown1.width, Img.knightDown1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightDown2.width*2;
                            var height = Img.knightDown2.height*2;
                            ctx.drawImage(Img.knightDown2,
                                0,0, Img.knightDown2.width, Img.knightDown2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightDown3.width*2;
                            var height = Img.knightDown3.height*2;
                            ctx.drawImage(Img.knightDown3,
                                0,0, Img.knightDown3.width, Img.knightDown3.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightDown4.width*2;
                            var height = Img.knightDown4.height*2;
                            ctx.drawImage(Img.knightDown4,
                                0,0, Img.knightDown4.width, Img.knightDown4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else if (!self.up && self.left && !self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightDownLeft1.width*2;
                            var height = Img.knightDownLeft1.height*2;
                            ctx.drawImage(Img.knightDownLeft1,
                                0,0, Img.knightDownLeft1.width, Img.knightDownLeft1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightDownLeft2.width*2;
                            var height = Img.knightDownLeft2.height*2;
                            ctx.drawImage(Img.knightDownLeft2,
                                0,0, Img.knightDownLeft2.width, Img.knightDownLeft2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightDownLeft3.width*2;
                            var height = Img.knightDownLeft3.height*2;
                            ctx.drawImage(Img.knightDownLeft3,
                                0,0, Img.knightDownLeft3.width, Img.knightDownLeft3.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightDownLeft4.width*2;
                            var height = Img.knightDownLeft4.height*2;
                            ctx.drawImage(Img.knightDownLeft4,
                                0,0, Img.knightDownLeft4.width, Img.knightDownLeft4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else if (!self.up && self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightLeft1.width*2;
                            var height = Img.knightLeft1.height*2;
                            ctx.drawImage(Img.knightLeft1,
                                0,0, Img.knightLeft1.width, Img.knightLeft1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightLeft2.width*2;
                            var height = Img.knightLeft2.height*2;
                            ctx.drawImage(Img.knightLeft2,
                                0,0, Img.knightLeft2.width, Img.knightLeft2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightLeft3.width*2;
                            var height = Img.knightLeft3.height*2;
                            ctx.drawImage(Img.knightLeft3,
                                0,0, Img.knightLeft3.width, Img.knightLeft3.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightLeft4.width*2;
                            var height = Img.knightLeft4.height*2;
                            ctx.drawImage(Img.knightLeft4,
                                0,0, Img.knightLeft4.width, Img.knightLeft4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else if (self.up && self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.knightUpLeft1.width*2;
                            var height = Img.knightUpLeft1.height*2;
                            ctx.drawImage(Img.knightUpLeft1,
                                0,0, Img.knightUpLeft1.width, Img.knightUpLeft1.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.knightUpLeft2.width*2;
                            var height = Img.knightUpLeft2.height*2;
                            ctx.drawImage(Img.knightUpLeft2,
                                0,0, Img.knightUpLeft2.width, Img.knightUpLeft2.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.knightUpLeft3.width*2;
                            var height = Img.knightUpLeft3.height*2;
                            ctx.drawImage(Img.knightUpLeft3,
                                0,0, Img.knightUpLeft3.width, Img.knightUpLeft3.height, x-width/2, y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.knightUpLeft4.width*2;
                            var height = Img.knightUpLeft4.height*2;
                            ctx.drawImage(Img.knightUpLeft4,
                                0,0, Img.knightUpLeft4.width, Img.knightUpLeft4.height, x-width/2, y-height/2, width, height);
                        }
                    }
                    else {
                        var width = Img.knight.width*2;
                        var height = Img.knight.height*2;
                        ctx.drawImage(Img.knight,
                            0,0, Img.knight.width, Img.knight.height,
                            x-width/2,y-height/2, width, height);
                    }

                break;

                case 'mage':
                    var width = Img.mage.width*2;
                    var height = Img.mage.height*2;
                    ctx.drawImage(Img.mage,
                        0,0, Img.mage.width, Img.mage.height,
                        x-width/2,y-height/2, width, height);
                break;

                case 'ninja':

                    if (self.up && !self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaUp1.width*2;
                            var height = Img.ninjaUp1.height*2;
                            ctx.drawImage(Img.ninjaUp1,
                                0,0, Img.ninjaUp1.width, Img.ninjaUp1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaUp2.width*2;
                            var height = Img.ninjaUp2.height*2;
                            ctx.drawImage(Img.ninjaUp2,
                                0,0, Img.ninjaUp2.width, Img.ninjaUp2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaUp3.width*2;
                            var height = Img.ninjaUp3.height*2;
                            ctx.drawImage(Img.ninjaUp3,
                                0,0, Img.ninjaUp3.width, Img.ninjaUp3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaUp4.width*2;
                            var height = Img.ninjaUp4.height*2;
                            ctx.drawImage(Img.ninjaUp4,
                                0,0, Img.ninjaUp4.width, Img.ninjaUp4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (self.up && !self.left && self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaUpRight1.width*2;
                            var height = Img.ninjaUpRight1.height*2;
                            ctx.drawImage(Img.ninjaUpRight1,
                                0,0, Img.ninjaUpRight1.width, Img.ninjaUpRight1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaUpRight2.width*2;
                            var height = Img.ninjaUpRight2.height*2;
                            ctx.drawImage(Img.ninjaUpRight2,
                                0,0, Img.ninjaUpRight2.width, Img.ninjaUpRight2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaUpRight3.width*2;
                            var height = Img.ninjaUpRight3.height*2;
                            ctx.drawImage(Img.ninjaUpRight3,
                                0,0, Img.ninjaUpRight3.width, Img.ninjaUpRight3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaUpRight4.width*2;
                            var height = Img.ninjaUpRight4.height*2;
                            ctx.drawImage(Img.ninjaUpRight4,
                                0,0, Img.ninjaUpRight4.width, Img.ninjaUpRight4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaRight1.width*2;
                            var height = Img.ninjaRight1.height*2;
                            ctx.drawImage(Img.ninjaRight1,
                                0,0, Img.ninjaRight1.width, Img.ninjaRight1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaRight2.width*2;
                            var height = Img.ninjaRight2.height*2;
                            ctx.drawImage(Img.ninjaRight2,
                                0,0, Img.ninjaRight2.width, Img.ninjaRight2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaRight3.width*2;
                            var height = Img.ninjaRight3.height*2;
                            ctx.drawImage(Img.ninjaRight3,
                                0,0, Img.ninjaRight3.width, Img.ninjaRight3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaRight4.width*2;
                            var height = Img.ninjaRight4.height*2;
                            ctx.drawImage(Img.ninjaRight4,
                                0,0, Img.ninjaRight4.width, Img.ninjaRight4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaDownRight1.width*2;
                            var height = Img.ninjaDownRight1.height*2;
                            ctx.drawImage(Img.ninjaDownRight1,
                                0,0, Img.ninjaDownRight1.width, Img.ninjaDownRight1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaDownRight2.width*2;
                            var height = Img.ninjaDownRight2.height*2;
                            ctx.drawImage(Img.ninjaDownRight2,
                                0,0, Img.ninjaDownRight2.width, Img.ninjaDownRight2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaDownRight3.width*2;
                            var height = Img.ninjaDownRight3.height*2;
                            ctx.drawImage(Img.ninjaDownRight3,
                                0,0, Img.ninjaDownRight3.width, Img.ninjaDownRight3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaDownRight4.width*2;
                            var height = Img.ninjaDownRight4.height*2;
                            ctx.drawImage(Img.ninjaDownRight4,
                                0,0, Img.ninjaDownRight4.width, Img.ninjaDownRight4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && !self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaDown1.width*2;
                            var height = Img.ninjaDown1.height*2;
                            ctx.drawImage(Img.ninjaDown1,
                                0,0, Img.ninjaDown1.width, Img.ninjaDown1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaDown2.width*2;
                            var height = Img.ninjaDown2.height*2;
                            ctx.drawImage(Img.ninjaDown2,
                                0,0, Img.ninjaDown2.width, Img.ninjaDown2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaDown3.width*2;
                            var height = Img.ninjaDown3.height*2;
                            ctx.drawImage(Img.ninjaDown3,
                                0,0, Img.ninjaDown3.width, Img.ninjaDown3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaDown4.width*2;
                            var height = Img.ninjaDown4.height*2;
                            ctx.drawImage(Img.ninjaDown4,
                                0,0, Img.ninjaDown4.width, Img.ninjaDown4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && self.left && !self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaDownLeft1.width*2;
                            var height = Img.ninjaDownLeft1.height*2;
                            ctx.drawImage(Img.ninjaDownLeft1,
                                0,0, Img.ninjaDownLeft1.width, Img.ninjaDownLeft1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaDownLeft2.width*2;
                            var height = Img.ninjaDownLeft2.height*2;
                            ctx.drawImage(Img.ninjaDownLeft2,
                                0,0, Img.ninjaDownLeft2.width, Img.ninjaDownLeft2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaDownLeft3.width*2;
                            var height = Img.ninjaDownLeft3.height*2;
                            ctx.drawImage(Img.ninjaDownLeft3,
                                0,0, Img.ninjaDownLeft3.width, Img.ninjaDownLeft3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaDownLeft4.width*2;
                            var height = Img.ninjaDownLeft4.height*2;
                            ctx.drawImage(Img.ninjaDownLeft4,
                                0,0, Img.ninjaDownLeft4.width, Img.ninjaDownLeft4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaLeft1.width*2;
                            var height = Img.ninjaLeft1.height*2;
                            ctx.drawImage(Img.ninjaLeft1,
                                0,0, Img.ninjaLeft1.width, Img.ninjaLeft1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaLeft2.width*2;
                            var height = Img.ninjaLeft2.height*2;
                            ctx.drawImage(Img.ninjaLeft2,
                                0,0, Img.ninjaLeft2.width, Img.ninjaLeft2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaLeft3.width*2;
                            var height = Img.ninjaLeft3.height*2;
                            ctx.drawImage(Img.ninjaLeft3,
                                0,0, Img.ninjaLeft3.width, Img.ninjaLeft3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaLeft4.width*2;
                            var height = Img.ninjaLeft4.height*2;
                            ctx.drawImage(Img.ninjaLeft4,
                                0,0, Img.ninjaLeft4.width, Img.ninjaLeft4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (self.up && self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.ninjaUpLeft1.width*2;
                            var height = Img.ninjaUpLeft1.height*2;
                            ctx.drawImage(Img.ninjaUpLeft1,
                                0,0, Img.ninjaUpLeft1.width, Img.ninjaUpLeft1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.ninjaUpLeft2.width*2;
                            var height = Img.ninjaUpLeft2.height*2;
                            ctx.drawImage(Img.ninjaUpLeft2,
                                0,0, Img.ninjaUpLeft2.width, Img.ninjaUpLeft2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.ninjaUpLeft3.width*2;
                            var height = Img.ninjaUpLeft3.height*2;
                            ctx.drawImage(Img.ninjaUpLeft3,
                                0,0, Img.ninjaUpLeft3.width, Img.ninjaUpLeft3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.ninjaUpLeft4.width*2;
                            var height = Img.ninjaUpLeft4.height*2;
                            ctx.drawImage(Img.ninjaUpLeft4,
                                0,0, Img.ninjaUpLeft4.width, Img.ninjaUpLeft4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else {
                        var width = Img.ninja.width*2;
                        var height = Img.ninja.height*2;
                        ctx.drawImage(Img.ninja,
                            0,0, Img.ninja.width, Img.ninja.height,
                            x-width/2,y-height/2, width, height);
                    }
                break;

                case 'engineer':

                    if (self.up && !self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerUp1.width*2;
                            var height = Img.engineerUp1.height*2;
                            ctx.drawImage(Img.engineerUp1,
                                0,0, Img.engineerUp1.width, Img.engineerUp1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerUp2.width*2;
                            var height = Img.engineerUp2.height*2;
                            ctx.drawImage(Img.engineerUp2,
                                0,0, Img.engineerUp2.width, Img.engineerUp2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerUp3.width*2;
                            var height = Img.engineerUp3.height*2;
                            ctx.drawImage(Img.engineerUp3,
                                0,0, Img.engineerUp3.width, Img.engineerUp3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerUp4.width*2;
                            var height = Img.engineerUp4.height*2;
                            ctx.drawImage(Img.engineerUp4,
                                0,0, Img.engineerUp4.width, Img.engineerUp4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (self.up && !self.left && self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerUpRight1.width*2;
                            var height = Img.engineerUpRight1.height*2;
                            ctx.drawImage(Img.engineerUpRight1,
                                0,0, Img.engineerUpRight1.width, Img.engineerUpRight1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerUpRight2.width*2;
                            var height = Img.engineerUpRight2.height*2;
                            ctx.drawImage(Img.engineerUpRight2,
                                0,0, Img.engineerUpRight2.width, Img.engineerUpRight2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerUpRight3.width*2;
                            var height = Img.engineerUpRight3.height*2;
                            ctx.drawImage(Img.engineerUpRight3,
                                0,0, Img.engineerUpRight3.width, Img.engineerUpRight3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerUpRight4.width*2;
                            var height = Img.engineerUpRight4.height*2;
                            ctx.drawImage(Img.engineerUpRight4,
                                0,0, Img.engineerUpRight4.width, Img.engineerUpRight4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && !self.left && self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerRight1.width*2;
                            var height = Img.engineerRight1.height*2;
                            ctx.drawImage(Img.engineerRight1,
                                0,0, Img.engineerRight1.width, Img.engineerRight1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerRight2.width*2;
                            var height = Img.engineerRight2.height*2;
                            ctx.drawImage(Img.engineerRight2,
                                0,0, Img.engineerRight2.width, Img.engineerRight2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerRight3.width*2;
                            var height = Img.engineerRight3.height*2;
                            ctx.drawImage(Img.engineerRight3,
                                0,0, Img.engineerRight3.width, Img.engineerRight3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerRight4.width*2;
                            var height = Img.engineerRight4.height*2;
                            ctx.drawImage(Img.engineerRight4,
                                0,0, Img.engineerRight4.width, Img.engineerRight4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }

                    // ENGINEER DOWN-RIGHT
                    else if (!self.up && !self.left && self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerDownRight1.width*2;
                            var height = Img.engineerDownRight1.height*2;
                            ctx.drawImage(Img.engineerDownRight1,
                                0,0, Img.engineerDownRight1.width, Img.engineerDownRight1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerDownRight2.width*2;
                            var height = Img.engineerDownRight2.height*2;
                            ctx.drawImage(Img.engineerDownRight2,
                                0,0, Img.engineerDownRight2.width, Img.engineerDownRight2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerDownRight3.width*2;
                            var height = Img.engineerDownRight3.height*2;
                            ctx.drawImage(Img.engineerDownRight3,
                                0,0, Img.engineerDownRight3.width, Img.engineerDownRight3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerDownRight4.width*2;
                            var height = Img.engineerDownRight4.height*2;
                            ctx.drawImage(Img.engineerDownRight4,
                                0,0, Img.engineerDownRight4.width, Img.engineerDownRight4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }

                    else if (!self.up && !self.left && !self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerDown1.width*2;
                            var height = Img.engineerDown1.height*2;
                            ctx.drawImage(Img.engineerDown1,
                                0,0, Img.engineerDown1.width, Img.engineerDown1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerDown2.width*2;
                            var height = Img.engineerDown2.height*2;
                            ctx.drawImage(Img.engineerDown2,
                                0,0, Img.engineerDown2.width, Img.engineerDown2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerDown3.width*2;
                            var height = Img.engineerDown3.height*2;
                            ctx.drawImage(Img.engineerDown3,
                                0,0, Img.engineerDown3.width, Img.engineerDown3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerDown4.width*2;
                            var height = Img.engineerDown4.height*2;
                            ctx.drawImage(Img.engineerDown4,
                                0,0, Img.engineerDown4.width, Img.engineerDown4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && self.left && !self.right && self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerDownLeft1.width*2;
                            var height = Img.engineerDownLeft1.height*2;
                            ctx.drawImage(Img.engineerDownLeft1,
                                0,0, Img.engineerDownLeft1.width, Img.engineerDownLeft1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerDownLeft2.width*2;
                            var height = Img.engineerDownLeft2.height*2;
                            ctx.drawImage(Img.engineerDownLeft2,
                                0,0, Img.engineerDownLeft2.width, Img.engineerDownLeft2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerDownLeft3.width*2;
                            var height = Img.engineerDownLeft3.height*2;
                            ctx.drawImage(Img.engineerDownLeft3,
                                0,0, Img.engineerDownLeft3.width, Img.engineerDownLeft3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerDownLeft4.width*2;
                            var height = Img.engineerDownLeft4.height*2;
                            ctx.drawImage(Img.engineerDownLeft4,
                                0,0, Img.engineerDownLeft4.width, Img.engineerDown4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (!self.up && self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerLeft1.width*2;
                            var height = Img.engineerLeft1.height*2;
                            ctx.drawImage(Img.engineerLeft1,
                                0,0, Img.engineerLeft1.width, Img.engineerLeft1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerLeft2.width*2;
                            var height = Img.engineerLeft2.height*2;
                            ctx.drawImage(Img.engineerLeft2,
                                0,0, Img.engineerLeft2.width, Img.engineerLeft2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerLeft3.width*2;
                            var height = Img.engineerLeft3.height*2;
                            ctx.drawImage(Img.engineerLeft3,
                                0,0, Img.engineerLeft3.width, Img.engineerLeft3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerLeft4.width*2;
                            var height = Img.engineerLeft4.height*2;
                            ctx.drawImage(Img.engineerLeft4,
                                0,0, Img.engineerLeft4.width, Img.engineerUp4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else if (self.up && self.left && !self.right && !self.down)
                    {
                        if (self.spriteCounter === 4)
                            self.spriteCounter = 0;
                        self.spriteCounter++;

                        if (self.spriteCounter === 1)
                        {
                            var width = Img.engineerUpLeft1.width*2;
                            var height = Img.engineerUpLeft1.height*2;
                            ctx.drawImage(Img.engineerUpLeft1,
                                0,0, Img.engineerUpLeft1.width, Img.engineerUpLeft1.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 2)
                        {
                            var width = Img.engineerUpLeft2.width*2;
                            var height = Img.engineerUpLeft2.height*2;
                            ctx.drawImage(Img.engineerUpLeft2,
                                0,0, Img.engineerUpLeft2.width, Img.engineerUpLeft2.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 3)
                        {
                            var width = Img.engineerUpLeft3.width*2;
                            var height = Img.engineerUpLeft3.height*2;
                            ctx.drawImage(Img.engineerUpLeft3,
                                0,0, Img.engineerUpLeft3.width, Img.engineerUpLeft3.height,
                                x-width/2,y-height/2, width, height);
                        }
                        else if (self.spriteCounter === 4)
                        {
                            var width = Img.engineerUpLeft4.width*2;
                            var height = Img.engineerUpLeft4.height*2;
                            ctx.drawImage(Img.engineerUpLeft4,
                                0,0, Img.engineerUpLeft4.width, Img.engineerUp4.height,
                                x-width/2,y-height/2, width, height);
                        }
                    }
                    else {
                        var width = Img.engineer.width*2;
                        var height = Img.engineer.height*2;
                        ctx.drawImage(Img.engineer,
                            0,0, Img.engineer.width, Img.engineer.height,
                            x-width/2,y-height/2, width, height);
                    }

                break;
            }
        }
        else
        {
            // Background Circle
            ctx.beginPath();
            ctx.moveTo(self.x, self.y);
            ctx.arc(self.x, self.y, 16, 0, 2*Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill()
            // Main Circle
            ctx.beginPath();
            ctx.moveTo(self.x, self.y);
            ctx.arc(self.x, self.y, 14, 0, 2*Math.PI);
            ctx.fillStyle = 'gray';
            ctx.fill();
            // HP Bar
            var hpWidth = 30 * self.hp / self.hpMax;
            ctx.fillStyle = 'green';
            ctx.fillRect(self.x - hpWidth/2, self.y - 40, hpWidth, 4);
            // Score
            ctx.fillText(self.score, self.x, self.y - 60);
        }
    }
    Player.list[self.id] = self;
    return self
}

Player.list = {};
