export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then((stream)=>{

            this._stream = stream;

            //this._videoEl.src = window.URL.createObjectURL(stream);
            this._videoEl.srcObject = stream;

            this._videoEl.play();

        }).catch(err=>{
            console.error(err);

        });

    }

    /* Para a transmissão da camera do dispositivo */
    stop(){

        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }


    takePicture(mimeType = 'image/png'){

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoVidth);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }

}