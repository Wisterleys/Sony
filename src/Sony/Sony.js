class Sony{
    constructor(obj){
        this._speech = window.SpeechRecognition || window.webkitSpeechRecognition
        this._audio = this.speech?new this.speech():""
        this._btn=""
        this._speak="Ola! Habilite seu microfone para falar comigo!";
        this._board = obj.writingBoard
        this._transcription=""
        this.dataBase()
        this.speakSony(obj.action,obj.writingBoard)
    }
    response(words){
        console.log("chamou!",words)
        if(words=="Qual é o seu nome" || words=="qual é o seu nome"){this.audio.stop();this.board.innerHTML="EU sou Sony! E você?";setTimeout(e=>{this.btn.click()},3000)}
    }
    speakSony(btni,write){
        window.onload=e=>{
            this.btn = btni
            let board = write
            let esta_gravando=false
            if(this.speech){
                this.audio.continuous=false
                this.audio.interimResults=false
                this.audio.lang="pt-BR"
                this.audio.onstart=e=>{
                    esta_gravando=true;
                    this.btn.value="Ouvindo..."
                }
                this.audio.onend=e=>{
                    esta_gravando=false;
                    this.btn.value="Ouvir"
                    console.log("parou de falar no onend")
                }
                this.audio.onresult=e=>{
                    console.log("ouvindo");
                    [...e.results].forEach(result => {
                        result.isFinal?this.transcription+=result[0].transcript:this.transcription+=result[0].transcript
                    });
                    (this.transcription.split(" ").length>10)?this.audio.stop():0
                    //board.innerHTML=this.transcription// word input
                    this.response(this.transcription)
                    this.transcription=""
                }
                this.btn.addEventListener("click",e=>{
                    esta_gravando?this.audio.stop():this.audio.start()
                })
                board.innerHTML= this.speak
                }else board.innerHTML="Desculpe! Seu navegador não tem suporte para eu te ouvir!"
        }
    }
    //DATABASE 
    createSpeeche(json){
        this.dataBaseSelect("speeches").push().set(json)
    }
    selectAll(){
        dataBaseSelect("speeches").on("value",snapshot=>{
            console.log(snapshot)
        })
    }
    dataBaseSelect(reff){
        return firebase.database().ref(reff)
    }
    dataBase(){
        const firebaseConfig = {
            apiKey: "AIzaSyDyxYxq8ZVoH5lW8ayAqSz-LBv-DSU5mLk",
            authDomain: "sony-b9a63.firebaseapp.com",
            projectId: "sony-b9a63",
            storageBucket: "sony-b9a63.appspot.com",
            messagingSenderId: "343602161782",
            appId: "1:343602161782:web:5f360f1b4a97446460d757",
            measurementId: "G-1Q8PFCB83H"
          };
    }
    // ==============================================
    //GETs and SETs
    get transcription(){return this._transcription;}
    set transcription(value){this._transcription=value}
    get board(){return this._board;}
    set board(value){this._board=value}
    get speak(){return this._speak;}
    set speak(value){this._speak=value}
    get btn(){return this._btn;}
    set btn(value){this._btn=value}
    get audio(){return this._audio;}
    set audio(value){this._audio=value}
    get speech(){return this._speech;}
    set speech(value){this._speech=value}
}