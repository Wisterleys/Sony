class Sony{
    #speak
    constructor(obj){
        this.speech = window.SpeechRecognition || window.webkitSpeechRecognition
        this.audio = this.speech?new this.speech():""
        this.speak="Ola! Meu nome é Sony, Habilite seu microfone para falar comigo!";
        this.board = obj.writingBoard
        this.transcription=""
        this.dataBase()
        this.speakSony(obj.action,obj.writingBoard)
    }
    response(words){
        if(words=="Qual é seu nome") this.board.innerHTML="EU sou Sony! E você?"
    }
    speakSony(btni,write){
        window.onload=e=>{
            let btn = btni
            let board = write
            let esta_gravando=false
            if(this.speech){
                this.audio.continuous=true
                this.audio.interimResults=true
                this.audio.lang="pt-BR"
                this.audio.onstart=e=>{
                    esta_gravando=true;
                    btn.value="Ouvindo..."
                    
                }
                this.audio.onend=e=>{
                    esta_gravando=false;
                    btn.value="Ouvir"
                    console.log("parou de falar no onend")
                }
                this.audio.onresult=e=>{
                    console.log("ouvindo");
                    [...e.results].forEach(result => {
                        result.isFinal?this.transcription+=result[0].transcript:this.transcription+=result[0].transcript
                    });
                    (this.transcription.split(" ").length>10)?this.audio.stop():0
                    board.innerHTML=this.transcription// word input
                    this.transcription=""
                }
                btn.addEventListener("click",e=>{
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
}