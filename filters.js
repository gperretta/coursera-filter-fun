var canvas = document.getElementById("canvas");
var image = null;
var red = null;
var green = null;
var blue = null;
var greyscale = null;
var rainbow = null;
var blur = null;
var reset = null;

function onLoadImage() {
    var file = document.getElementById("upload");
    image = new SimpleImage(file);
    red = new SimpleImage(file);
    green = new SimpleImage(file);
    blue = new SimpleImage(file);
    greyscale = new SimpleImage(file);
    rainbow = new SimpleImage(file);
    blur = new SimpleImage(file);
    reset = new SimpleImage(file);
    imgWin = new SimpleImage(file);
    image.drawTo(canvas);
}

function applyRedHue() {
    for (var pixel of red.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(avg * 2);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }
        else {
            pixel.setRed(255);
            pixel.setGreen(avg * 2);
            pixel.setBlue(avg * 2);
        }
    }
    red.drawTo(canvas);
}

function applyGreenHue() {
    for (var pixel of green.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(0);
            pixel.setGreen(avg * 2);
            pixel.setBlue(0);
        }
        else {
            pixel.setRed(avg * 2);
            pixel.setGreen(255);
            pixel.setBlue(avg * 2);
        }
    }
    green.drawTo(canvas);
}

function applyBlueHue() {
    for (var pixel of blue.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(avg * 2);
        }
        else {
            pixel.setRed(avg * 2);
            pixel.setGreen(avg * 2);
            pixel.setBlue(255);
        }
    }
    blue.drawTo(canvas);
}


function applyGreyscale() {
    for (var pixel of greyscale.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    greyscale.drawTo(canvas);
}


function applyRainbow() {
    var yPos = rainbow.getHeight()
    for (var pixel of rainbow.values()) {
        var yPixel = pixel.getY();
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 7;

        if ((yPixel < yPos / 7) && (avg < 128)) {
            pixel.setRed(avg * 2);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } else if ((yPixel < yPos / 7) && (avg >= 128)) {
            pixel.setRed(255);
            pixel.setGreen(avg * 2 - 255);
            pixel.setBlue(avg * 2 - 255);
        }
        if ((yPixel < 2 * yPos / 7) && (yPixel > yPos / 7) && (avg < 128)) {
            pixel.setRed(2 * avg);
            pixel.setGreen(0.8 * avg);
            pixel.setBlue(0);
        } else if ((yPixel <= 2 * yPos / 7) && (yPixel > yPos / 7) && (avg >= 128)) {
            pixel.setRed(255);
            pixel.setGreen(1.2 * avg - 51);
            pixel.setBlue(2 * avg - 255);
        }

        if ((yPixel <= 3 * yPos / 7) && (yPixel > 2 * yPos / 7) && (avg < 128)) {
            pixel.setRed(2 * avg);
            pixel.setGreen(2 * avg);
            pixel.setBlue(0);
        } else if ((yPixel <= 3 * yPos / 7) && (yPixel > 2 * yPos / 7) && (avg >= 128)) {
            pixel.setRed(255);
            pixel.setGreen(255);
            pixel.setBlue(2 * avg - 255);
        }

        if ((yPixel <= 4 * yPos / 7) && (yPixel > 3 * yPos / 7) && (avg < 128)) {
            pixel.setRed(0);
            pixel.setGreen(2 * avg);
            pixel.setBlue(0);
        } else if ((yPixel <= 4 * yPos / 7) && (yPixel > 3 * yPos / 7) && (avg >= 128)) {
            pixel.setRed(2 * avg - 255);
            pixel.setGreen(255);
            pixel.setBlue(2 * avg - 255);
        }

        if ((yPixel <= 5 * yPos / 7) && (yPixel > 4 * yPos / 7) && (avg < 128)) {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(2 * avg);
        } else if ((yPixel <= 5 * yPos / 7) && (yPixel > 4 * yPos / 7) && (avg >= 128)) {
            pixel.setRed(2 * avg - 255);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(255);
        }

        if ((yPixel <= 6 * yPos / 7) && (yPixel > 5 * yPos / 7) && (avg < 128)) {
            pixel.setRed(0.8 * avg);
            pixel.setGreen(0);
            pixel.setBlue(2 * avg);
        } else if ((yPixel <= 6 * yPos / 7) && (yPixel > 5 * yPos / 7) && (avg >= 128)) {
            pixel.setRed(1.2 * avg - 51);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(255);
        } else if ((yPixel >= 6 * yPos / 7) && (avg < 128)) {
            pixel.setRed(1.6 * avg);
            pixel.setGreen(0);
            pixel.setBlue(1.6 * avg);
        } else if ((yPixel >= 6 * yPos / 7) && (avg >= 128)) {
            pixel.setRed(0.4 * avg + 153);
            pixel.setGreen(2 * avg - 255);
            pixel.setBlue(0.4 * avg + 153);
        }
    }

    rainbow.drawTo(canvas);
    return;
}

function applyBlur() {
    for (var pixel of blur.values()) {
        var ran = Math.random();
        var x = pixel.getX();
        var y = pixel.getY();
        if (ran < 0.75) {
            blur.setPixel(x, y, pixel);
        }
        else {
            getPixel(x, y);
        }
    }
    blur.drawTo(canvas);
    return;
}
// utility function for applyBlur()
function getPixel(x, y) {
    var height = blur.getHeight();
    var width = blur.getWidth();
    var randomX = Math.floor(Math.random() * 10);
    var randomY = Math.floor(Math.random() * 10);
    if (randomX > width - 1) {
        randomX = width - 1;
    }
    else if (randomX < 0) {
        randomX = 0;
    }
    if (randomY > height - 1) {
        randomY = height - 1
    }
    else if (randomY < 0) {
        randomY = 0;
    }
    var newPixel = blur.getPixel(randomX, randomY);
    blur.setPixel(x, y, newPixel);
    return;
}

function clearCanvas() {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, image.width, image.height);
    return;
}

function resetFilters() {
    image.drawTo(canvas);
}