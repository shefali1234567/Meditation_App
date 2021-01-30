const keyboard = {
    elements:{
        main:null,
        keyContainer:null,
        keys:[]

    },
    eventHandlers:{
     oninput:null,
     onclose:null
    },

    properties:{
        value:"",
        capslock:false
    },

    init(){
        this.elements.main= document.createElement("div");
        this.elements.keyContainer= document.createElement("div");
        this.elements.main.classList.add("keyboard","keyboard_hidden");
        this.elements.keyContainer.classList.add("keyboard_keys");
        this.elements.keyContainer.appendChild(this._createKeys());

        this.elements.keys=this.elements.keyContainer.querySelectorAll(".keyboard_keyss");

        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main)
        document.querySelectorAll(".use_keyboard-input").forEach(element=>{
            element.addEventListener("focus",()=>{
                this.open(element.value,currentValue=>{
                    element.value=currentValue;
                });
            });
        });
        

    },
    _createKeys(){
        const fragment =document.createDocumentFragment();
        const keylayout=[
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        const createiconhtml=(icon_name)=>{
            return `<i  class="material-icons">${icon_name}</i`
        };  

        keylayout.forEach(key=>{
            const keyelement=document.createElement("button");
            const insertlinebreak=["backspace","p","enter","?"].indexOf(key)!==-1;
            keyelement.setAttribute("type","button");
            keyelement.classList.add("keyboard_keyss");
            switch(key)
            {
                case "backspace":
                    keyelement.classList.add("keyboard_keys_wide");
                    keyelement.innerHTML=createiconhtml("backspace");
                    keyelement.addEventListener("click",()=>{
                        this.properties.value=this.properties.value.substring(0,this.properties.value.length-1);
                    });
                    this._triggerEvent("oninput");
                    break;
                 case "caps":
                    keyelement.classList.add("keyboard_keys_wide","keyboard_keys_activable");
                    keyelement.innerHTML=createiconhtml("keyboard_capslock");
                    keyelement.addEventListener("click",()=>{
                        this._toggleCapslock();
                        keyelement.classList.toggle("keyboard_keys_active",this.properties.capslock);
                    });
                    
                    break;   
                    break;
                    case "enter":
                        keyelement.innerHTML=createiconhtml("keyboard_return");
                    keyelement.addEventListener("click",()=>{
                        this.properties.value+="\n";
                        this._triggerEvent("oninput");                    });
                    
                        keyelement.classList.add("keyboard_keys_wide");
                    case "space":
                    keyelement.classList.add("keyboard_keys_wide");
                    keyelement.innerHTML=createiconhtml("keyboard_return");
                    keyelement.addEventListener("click",()=>{
                        this.properties.value+=" ";
                        this._triggerEvent("oninput");                    });
                    
                    break; 
                    case "done":
                    keyelement.classList.add("keyboard_keys_wide");
                    keyelement.innerHTML=createiconhtml("check_circle","keyboard_keys_dark");
                    keyelement.addEventListener("click",()=>{
                        this.close();
                        this._triggerEvent("onclose");                    });
                    
                    break; 
                    default:
                    keyelement.textContent=key.toLowerCase();
                    keyelement.addEventListener("click",()=>{
                        this.properties.value+=this.properties.capslock?key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");                    });
                    
                
                        break;    
            }
            fragment.appendChild(keyelement);
            if (insertlinebreak){
                fragment.appendChild(document.createElement("br"));
            }

        })

       return fragment;
    },
    _triggerEvent(handlerName)
    {
       console.log("event triggered"+handlerName);
       if(typeof this.eventHandlers[handlerName]=="function"){
         this.eventHandlers[handlerName](this.properties.value);
       }
    },
    _toggleCapslock(){
        this.properties.capslock= !this.properties.capslock;

        for(const key of this.elements.keys){

            if(key.childElementCount === 0){
                key.textContent=this.properties.capslock ? key.textContent.toUpperCase() :key.textContent.toLowerCase(); 
            }  
        }
    },
    open(initialValue,oninput,onclose){
        this.properties.value=initialValue || "";
        this.eventHandlers.oninput=oninput;
         this.eventHandlers.onclose=onclose;
        this.elements.main.classList.remove("keyboard_hidden");


    },
    close(){
        this.properties.value="";
        this.eventHandlers.oninput =oninput;
        this.eventHandlers.onclose =onclose;
        this.elements.main.classList.add("keyboard_hidden");

    }


};

window.addEventListener("DOMContentLoaded",function(){
   keyboard.init();
   keyboard.open("decode",function(currentValue){
       console.log("Value chnaged here it is" +currentValue);
   },function(currentValue){
       console.log("keyboard closed! finishing value" +currentValue);
   });

});