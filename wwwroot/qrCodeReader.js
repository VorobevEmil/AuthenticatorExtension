// qrCodeReader.js
window.readQRCode = (base64Image) => {
    return new Promise((resolve, reject) => {
        // Create a new Image object
        var img = new Image();

        // Set the src of the Image object to the base64 string
        img.src = 'data:image/png;base64,' + base64Image;

        img.onload = function() {
            // Create a canvas and draw the image onto it
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);

            // Get the image data from the canvas
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Use jsQR to decode the QR code from the ImageData
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            resolve(code ? code.data : null);
        };

        img.onerror = function() {
            reject(new Error('Could not load image'));
        };
    });
};