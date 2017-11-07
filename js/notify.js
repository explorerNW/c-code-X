!(() => {
    const template = `<div class = "notify">
                            <div class = "content" >   
                                    <span>Info</span>                                 
                            </div>
                      </div>`;    
    function parseToHtml(temp){
                 let div = document.createElement("div");
                     div.innerHTML = temp;
                     return div.children[0];
    }
    class Notify{
            //init
            constructor(){
                    //获取body容器
                    this.container = document.body;
                    this.container.appendChild(parseToHtml(template));    
                    console.log(this);                
            }            
    }    
    // API支持:  Amd || Commonjs  || Global 
  if (typeof exports === 'object') {
    module.exports = Notify
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return Notify
    });
  } else {
    window.Notify = Notify
  }  
})()