const g=9.81;
let minHeight=0, maxHeight=10, height=0;
let minVelocity=0, maxVelocity=10, velocity=0;
let minAngle=0, maxAngle=180, angle=90;
let minAccuracy=2, maxAccuracy=250, accuracy=50;
let points=0, maxPoints=50;
let vx, vy, t, xmax, ymax;
let arr;

let w, h;
let canvas, ctx, dpi;

let anim1 =
{
    'dir': 1,
    'active': false,
    'interval': null,
    'start': function()
    {
        this.active = true;
        $("#height0").prop("disabled", true);
        $("#height2").prop("disabled", true);
        
    },
    'stop': function()
    {
        clearInterval(this.interval);
        this.active = false;
        $("#height0").prop("disabled", false);
        $("#height2").prop("disabled", false);
    }
};
let anim2 =
{
    'dir': 1,
    'active': false,
    'interval': null,
    'start': function()
    {
        this.active = true;
        $("#velocity0").prop("disabled", true);
        $("#velocity2").prop("disabled", true);
        
    },
    'stop': function()
    {
        clearInterval(this.interval);
        this.active = false;
        $("#velocity0").prop("disabled", false);
        $("#velocity2").prop("disabled", false);
    }
};
let anim3 =
{
    'dir': 1,
    'active': false,
    'interval': null,
    'start': function()
    {
        this.active = true;
        $("#angle0").prop("disabled", true);
        $("#angle2").prop("disabled", true);
        
    },
    'stop': function()
    {
        clearInterval(this.interval);
        this.active = false;
        $("#angle0").prop("disabled", false);
        $("#angle2").prop("disabled", false);
    }
};

class Point
{
    constructor(n)
    {
        this.ord = n;
        this.t = this.ord*t/(accuracy-1);
        this.x = vx*this.t;
        this.xCord = (xmax != 0 ? this.x/xmax*80/100*w : 0)+10/100*w;
        this.y = Math.abs(vy*this.t-1/2*g*this.t*this.t+height);
        this.yCord = h-(this.y/ymax*70/100*h+20/100*h);
        this.vx = vx;
        this.vy = Math.sqrt(2*g*(height-this.y)+vy*vy);
    }
    drawPoints() 
    {
        ctx.fillStyle = "#FFF";
        ctx.beginPath();
        ctx.arc(this.xCord, this.yCord, w/200, 0, 2*Math.PI);
        ctx.fill();
    }
    drawSpecial()
    {
        ctx.fillStyle = "#299134";
        ctx.strokeStyle = "#299134";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.setLineDash([15, 10]);

        ctx.beginPath();
        ctx.arc(this.xCord, this.yCord, w/150, 0, 2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(w*9/100, this.yCord);
        ctx.lineTo(this.xCord, this.yCord)
        ctx.stroke();

        ctx.rotate(-Math.PI/2)
        ctx.fillText(this.y.toFixed(3) + "m", Math.max(Math.min(-this.yCord, -h*13/100), -h*75/100), h*6/100);
        ctx.rotate(Math.PI/2)


        ctx.beginPath();
        ctx.moveTo(this.xCord, h*81/100);
        ctx.lineTo(this.xCord, this.yCord);
        ctx.stroke();

        ctx.fillText(this.x.toFixed(3) + "m", Math.min(Math.max(this.xCord, w*16/100), w*86/100), h*84/100);

        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(this.xCord, h*88/100);
        ctx.lineTo(this.xCord, h*92/100)
        ctx.stroke();

        ctx.fillText(this.t.toFixed(3) + "s", this.xCord, h*94/100);
        
    }
    calcPoints()
    {
        this.t = this.ord*t/(accuracy-1);
        this.x = vx*this.t;
        this.xCord = (xmax != 0 ? this.x/xmax*80/100*w : 0)+10/100*w;
        this.y = Math.abs(vy*this.t-1/2*g*this.t*this.t+height);
        this.yCord = h-(this.y/ymax*70/100*h+20/100*h);
        this.vx = vx;
        this.vy = Math.sqrt(2*g*(height-this.y)+vy*vy);   
    }
}

function getHeight0(value)
{
    height = Number(value);
    $("#height2").val(value);
    $("#height2").css("border", "")
    validateHeight();
}
function getHeight1(value)
{
    value = Number(value)
    $("#height1").val(value);
    validateHeight();
}
function getHeight2(value)
{
    value = Number(value)
    $("#height2").val(value);
    validateHeight();
}
function getHeight3(value)
{
    value = Number(value)
    $("#height3").val(value);
    validateHeight();
}
function validateHeight()
{
    let h0=$("#height0");
    let h1=$("#height1");
    let h2=$("#height2");
    let h3=$("#height3");
    let v1=Number(h1.val());
    let v2=Number(h2.val());
    let v3=Number(h3.val());

    if(v1<0)
    {
        h1.val(0);
    }
    else if(v1<v2)
    {
    }
    else if(v1<v3)
    {
        h2.val(v1);
    }
    else if(v1<999)
    {
        h2.val(v1);
        h3.val(v1);
    }
    else
    {
        h1.val(999);
        h2.val(999);
        h3.val(999);
    }
    
    if(v3>999)
    {
        h3.val(999);
    }
    else if(v3>v2)
    {
    }
    else if(v3>v1)
    {
        h3.val(v3);
        h2.val(v3);
    }
    else if(v3>0)
    {
        h1.val(v3);
        h2.val(v3);
        h3.val(v3);
    }
    else
    {
        h1.val(0);
        h2.val(0);
        h3.val(0);
    }

    minHeight = Number(h1.val());
    height = Number(h2.val());
    maxHeight = Number(h3.val());

    h0.get(0).min = minHeight;
    h0.val(height);
    h0.get(0).max = maxHeight;

    drawPoints();
}
function animateHeight()
{
    if(anim1.active)
    {
        anim1.stop();
    }
    else
    {
        anim1.start();
        anim1.interval = setInterval(
            function()
            {
                if(anim1.dir == 1)
                {
                    height+=1;
                    if(height>maxHeight)
                    {
                        height=maxHeight;
                        anim1.dir=0;
                    }
                }
                else if(anim1.dir == 0)
                {
                    height-=1;
                    if(height<minHeight)
                    {
                        height=minHeight;
                        anim1.dir=1;
                    }
                }
                $("#height0").val(height);
                $("#height2").val(height);
                drawPoints();
            }, 2000/(maxHeight-minHeight)
        );
    }
}

function getVelocity0(value)
{
    velocity = Number(value);
    $("#velocity2").val(value);
    $("#velocity2").css("border", "");
    validateVelocity()
}
function getVelocity1(value)
{
    value = Number(value)
    $("#velocity1").val(value);
    validateVelocity();
}
function getVelocity2(value)
{
    value = Number(value)
    $("#velocity2").val(value);
    validateVelocity();
}
function getVelocity3(value)
{
    value = Number(value)
    $("#velocity3").val(value);
    validateVelocity();
}
function validateVelocity()
{
    let h0=$("#velocity0");
    let h1=$("#velocity1");
    let h2=$("#velocity2");
    let h3=$("#velocity3");
    let v1=Number(h1.val());
    let v2=Number(h2.val());
    let v3=Number(h3.val());

    if(v1<0)
    {
        h1.val(0);
    }
    else if(v1<v2)
    {
    }
    else if(v1<v3)
    {
        h2.val(v1);
    }
    else if(v1<999)
    {
        h2.val(v1);
        h3.val(v1);
    }
    else
    {
        h1.val(999);
        h2.val(999);
        h3.val(999);
    }
    
    if(v3>999)
    {
        h3.val(999);
    }
    else if(v3>v2)
    {
    }
    else if(v3>v1)
    {
        h3.val(v3);
        h2.val(v3);
    }
    else if(v3>0)
    {
        h1.val(v3);
        h2.val(v3);
        h3.val(v3);
    }
    else
    {
        h1.val(0);
        h2.val(0);
        h3.val(0);
    }

    minVelocity = Number(h1.val());
    velocity = Number(h2.val());
    maxVelocity = Number(h3.val());

    h0.get(0).min = minVelocity;
    h0.val(velocity);
    h0.get(0).max = maxVelocity;

    drawPoints();
}
function animateVelocity()
{
    if(anim2.active)
    {
        anim2.stop();
    }
    else
    {
        anim2.start();
        anim2.interval = setInterval(
            function()
            {
                if(anim2.dir == 1)
                {
                    velocity+=1;
                    if(velocity>maxVelocity)
                    {
                        velocity=maxVelocity;
                        anim2.dir=0;
                    }
                }
                else if(anim2.dir == 0)
                {
                    velocity-=1;
                    if(velocity<minVelocity)
                    {
                        velocity=minVelocity;
                        anim2.dir=1;
                    }
                }
                $("#velocity0").val(velocity);
                $("#velocity2").val(velocity);
                drawPoints();
            }, 2000/(maxVelocity-minVelocity)
        );
    }
}

function getAngle0(value)
{
    angle = Number(value);
    $("#angle2").val(value);
    $("#angle2").css("border", "")
    validateAngle();
}
function getAngle1(value)
{
    value = Number(value)
    $("#angle1").val(value);
    validateAngle();
}
function getAngle2(value)
{
    value = Number(value)
    $("#angle2").val(value);
    validateAngle();
}
function getAngle3(value)
{
    value = Number(value)
    $("#angle3").val(value);
    validateAngle();
}
function validateAngle()
{
    let h0=$("#angle0");
    let h1=$("#angle1");
    let h2=$("#angle2");
    let h3=$("#angle3");
    let v1=Number(h1.val());
    let v2=Number(h2.val());
    let v3=Number(h3.val());

    if(v1<0)
    {
        h1.val(0);
    }
    else if(v1<v2)
    {
    }
    else if(v1<v3)
    {
        h2.val(v1);
    }
    else if(v1<180)
    {
        h2.val(v1);
        h3.val(v1);
    }
    else
    {
        h1.val(180);
        h2.val(180);
        h3.val(180);
    }
    
    if(v3>180)
    {
        h3.val(180);
    }
    else if(v3>v2)
    {
    }
    else if(v3>v1)
    {
        h3.val(v3);
        h2.val(v3);
    }
    else if(v3>0)
    {
        h1.val(v3);
        h2.val(v3);
        h3.val(v3);
    }
    else
    {
        h1.val(0);
        h2.val(0);
        h3.val(0);
    }

    minAngle = Number(h1.val());
    angle = Number(h2.val());
    maxAngle = Number(h3.val());

    h0.get(0).min = minAngle;
    h0.val(angle);
    h0.get(0).max = maxAngle;

    drawPoints();
}
function animateAngle()
{
    if(anim3.active)
    {
        anim3.stop();
    }
    else
    {
        anim3.start();
        anim3.interval = setInterval(
            function()
            {
                if(anim3.dir == 1)
                {
                    angle+=1;
                    if(angle>maxAngle)
                    {
                        angle=maxAngle;
                        anim3.dir=0;
                    }
                }
                else if(anim3.dir == 0)
                {
                    angle-=1;
                    if(angle<minAngle)
                    {
                        angle=minAngle;
                        anim3.dir=1;
                    }
                }
                $("#angle0").val(angle);
                $("#angle2").val(angle);
                drawPoints();
            }, 2000/(maxAngle-minAngle)
        );
    }
}

function getAccuracy0(value)
{
    accuracy = Number(value);
    $("#accuracy2").val(value);
    $("#accuracy2").css("border", "")
    validateAccuracy();
}

function getAccuracy1(value)
{
    value = Number(value)
    $("#accuracy1").val(value);
    validateAccuracy();
}
function getAccuracy2(value)
{
    value = Number(value)
    $("#accuracy2").val(value);
    validateAccuracy();
}
function validateAccuracy()
{
    let h0=$("#accuracy0");
    let h1=$("#accuracy1");
    let h2=$("#accuracy2");
    let h3=$("#accuracy3");
    let v1=Number(h1.val());
    let v2=Number(h2.val());
    let v3=Number(h3.val());

    if(v1<0)
    {
        h1.val(0);
    }
    else if(v1<v2)
    {
    }
    else if(v1<v3)
    {
        h2.val(v1);
    }
    else if(v1<250)
    {
        h2.val(v1);
        h3.val(v1);
    }
    else
    {
        h1.val(999);
        h2.val(999);
        h3.val(999);
    }
    
    if(v3>999)
    {
        h3.val(999);
    }
    else if(v3>v2)
    {
    }
    else if(v3>v1)
    {
        h3.val(v3);
        h2.val(v3);
    }
    else if(v3>0)
    {
        h1.val(v3);
        h2.val(v3);
        h3.val(v3);
    }
    else
    {
        h1.val(0);
        h2.val(0);
        h3.val(0);
    }

    minAccuracy = Number(h1.val());
    accuracy = Number(h2.val());
    maxAccuracy = Number(h3.val());

    h0.get(0).min = minAccuracy;
    h0.val(accuracy);
    h0.get(0).max = maxAccuracy;

    points=0;
    $("#points2").val(0);
    $("#points0").val(0);
    maxPoints=accuracy;
    $("#points0").get(0).max=accuracy;
    $("#points3").val(accuracy);
    newPoints();
    drawPoints();
}

function getPoints0(value)
{
    points = Number(value);
    $("#points2").val(value);
    drawPoints();
}
function getPoints2(value)
{
    value = Number(value);
    if(value<0)
    {
        $("#points0").val(0);
        $("#points2").val(0);
        points = 0;
    }
    else if(value>accuracy)
    {
        $("#points0").val(accuracy);
        $("#points2").val(accuracy);
        points = accuracy;
    }
    else 
    {
        $("#points0").val(value);
        points = value;
    }
    drawPoints();
}
function resetPoints()
{
    $("#points0").val(0)
    $("#points2").val(0)
    $("#points2").css("border", "")
}

function newPoints()
{
    calc();
    arr = new Array(accuracy);
    for(let i=0; i<accuracy; i++)
    {
        arr[i] = new Point(i);
    }
}
function drawPoints()
{
    calc();
    drawBackground();
    for(let i=0; i<accuracy; i++)
    {
        arr[i].calcPoints();
        arr[i].drawPoints();
    }
    if(points!=0) arr[points-1].drawSpecial();
}
function calc()
{
    vx = velocity*Math.sin(Math.PI*(180-angle)/180);
    vy = velocity*Math.cos(Math.PI*(180-angle)/180);
    t = (vy+Math.sqrt(vy*vy+2*g*height))/g;

    let vxtemp, vytemp, xtemp, ytemp;
    xmax = 0;
    ymax = 0;
    
    for(let i=minAngle; i<=maxAngle; i++)
    {
        vxtemp = maxVelocity*Math.sin(Math.PI*(180-i)/180);
        vytemp = maxVelocity*Math.cos(Math.PI*(180-i)/180);
        xtemp = vxtemp*(vytemp+Math.sqrt(vytemp*vytemp+2*g*maxHeight))/g;
        ytemp = (i<=90 ? 0 :  vytemp*vytemp/g/2) + maxHeight;
        if(xtemp>xmax)
        {
            xmax=xtemp;
        }
        if(ytemp>ymax)
        {
            ymax=ytemp;
        }
        
    }
    
}
function drawBackground()
{
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF";
    
    ctx.strokeStyle = "#FFFFFF";
    
    //y axis
    ctx.beginPath();
    ctx.moveTo(w*10/100, h*10/100);
    ctx.lineTo(w*10/100, h*82/100)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w*8/100, h*10/100);
    ctx.lineTo(w*10/100, h*5/100);
    ctx.lineTo(w*12/100, h*10/100);
    ctx.lineTo(w*8/100, h*10/100);
    ctx.fill();
    
    //x axis
    ctx.beginPath();
    ctx.moveTo(w*8/100, h*80/100);
    ctx.lineTo(w*90/100, h*80/100)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w*90/100, h*78/100);
    ctx.lineTo(w*95/100, h*80/100)
    ctx.lineTo(w*90/100, h*82/100)
    ctx.lineTo(w*90/100, h*78/100)
    ctx.fill();

    //t axis
    ctx.beginPath();
    ctx.moveTo(w*10/100, h*90/100);
    ctx.lineTo(w*90/100, h*90/100)
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w*10/100, h*88/100);
    ctx.lineTo(w*10/100, h*92/100)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w*30/100, h*89/100);
    ctx.lineTo(w*30/100, h*91/100)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w*50/100, h*88/100);
    ctx.lineTo(w*50/100, h*92/100)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w*70/100, h*89/100);
    ctx.lineTo(w*70/100, h*91/100)
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w*90/100, h*88/100);
    ctx.lineTo(w*90/100, h*92/100)
    ctx.stroke();
}

function clear()
{

}
function save()
{

}
function once()
{
    canvas = $('canvas').get(0);
    dpi = window.devicePixelRatio;
    if(canvas.getContext)
        ctx = canvas.getContext('2d');
    
    newPoints();
}
function scale1()
{
    let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

    w = canvas.width;
    h = canvas.height;

    ctx.lineWidth = w/200;
    ctx.font = w/25 + "px Arial";

    drawPoints();
}

