class Sony{
    constructor(obj){
        this._speech = window.SpeechRecognition || window.webkitSpeechRecognition
        this._audio = this.speech?new this.speech():""
        this._btn=""
        this._speak="Ola! click em mim para falar comigo!";
        this._board = obj.writingBoard
        this._transcription=""
        this._apprentice=false
        this.dataBase()
        this.speakSony(obj.action,obj.writingBoard)
    }
    choice(word){
        word=="Modo aprendiz"||word=="modo aprendiz"||this.apprentice?this.apprenticeMode(word):this.sonyMode(word)
    }
    apprenticeMode(word){
        this.apprentice=true;
        board.innerHTML=`OK! O que deseja me ensinar?`
        console.log("Modo aprendiz chamado ",word)
        word=="Cor preta"||word=="cor preta"?document.body.style.background="black":0
    }
    sonyMode(word){
        if(word){
            board.innerHTML=`voce disse: <br><br> "${word}"`
        } 
        else board.innerHTML="Não ouvi nada"
        
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
                    this.btn.classList.remove("flashes")
                    this.btn.classList.add("flashes")
                    board.innerHTML="Ouvindo..."
                }
                this.audio.onend=e=>{
                    esta_gravando=false;
                    this.btn.classList.remove("flashes")
                    console.log("parou de falar no onend")
                    this.choice(this.transcription)
                    this.transcription=""
                }
                this.audio.onresult=e=>{
                    console.log("ouvindo");
                    [...e.results].forEach(result => {
                        result.isFinal?this.transcription+=result[0].transcript:this.transcription+=result[0].transcript
                    });
                    (this.transcription.split(" ").length>10)?this.audio.stop():0
                    //board.innerHTML=this.transcription// word input
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
    get apprentice(){return this._apprentice;}
    set apprentice(value){this._apprentice=value}
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