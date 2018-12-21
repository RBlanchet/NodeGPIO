var piblaster = require('pi-servo-blaster.js');
const MAX_ANGLE = 180;
function angleToPercent(angle) {
    return Math.floor((angle/MAX_ANGLE) * 100);
}

var curAngle = 0;
var direction = 1;
setInterval(() => {
    piblaster.setServoPwm("P1-11", angleToPercent(curAngle) + "%");
    console.log("Setting angle at: ", curAngle, angleToPercent(curAngle));
    curAngle += direction;
    // Change direction when it exceeds the max angle.
    if (curAngle >= MAX_ANGLE) {
        direction = -1;
    } else if (curAngle <= 0) {
        direction = 1;
    }
}, 10);