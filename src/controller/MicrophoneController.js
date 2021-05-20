import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent{

    constructor() {

        super();

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream)=>{

            this._available = true;

            this._stream = stream;

            this.trigger('ready', this._stream);

        }).catch(err=>{
            console.error(err);

        });

    }

    /* Somente irá gravar se, somente se, o Usuário dê permissão do microfone */
    isAvailable(){
        return this._available;
    }

    /* Para o microfone do dispositivo */
    stop(){

        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    /* Gravar a fala/audio/musica do microfone do Dispositivo */
    startRecorder(){

        if(this.isAvailable()){

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = []; // pedaços gravados 

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if(e.data.size > 0) this._recordedChunks.push(e.data);

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let fileName = `rec${Date.now()}.wemb`;

                let audioContext = new AudioContext();

                let reader = new FileReader();

                reader.onload = e => {

                    audioContext.decodeAudioData(reader.result).then(decode => {

                        let file = new File([blob], fileName, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        });

                        this.trigger('recorded', file, decode);

                    });         

                }

                reader.readAsArrayBuffer(blob);

            });

            this._mediaRecorder.start();

            //this.startTimer();
            
        }

    }

    stopRecorder(){

        if(this.isAvailable()){
            
            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();
        }

    }


    /* Timer/Tempo do Microfone que esta sendo usado */
    startTimer() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('recordtimer', Date.now() - start);

        }, 100);

    }

    stopTimer(){
        clearInterval(this._recordMicrophoneInterval);
    }

}