/**
 * @author:c-code-XTEAM(explorerNW)
 */
!(() => {
        const template = `<div id = "notify">                                                                                      
                                <div id="popWindow" class="popWindow" style="display: none;">
                                </div>                                
                                <div id="maskLayer" class="maskLayer" style="display: none;">                                
                                        <span class = "info">Info</span>
                                        <span id = "content" ></span> 
                                        <button id = "close"  style="cursor:pointer;">确定</button>
                                </div>                                
                         </div>  
                      `;
        function parseToHtml(temp) {
                let div = document.createElement("div");
                div.innerHTML = temp;
                return div.children[0];
        }
        class Notify {
                //init
                constructor() {
                        //获取body容器
                        this.container = document.body;
                        this.container.appendChild(parseToHtml(template));
                        //获取contentNode
                        this.contentNode = document.querySelector("#content");
                        //获取popWindow
                        this.popWindow = document.querySelector("#popWindow");
                        //获取maskLayer
                        this.maskLayer = document.querySelector("#maskLayer");
                        //获取closeNode
                        this.closeBtn = document.querySelector("#close");
                        //监听closeBtn的click事件                                                
                        this._BtnClick(this);
                }

                _hidden(){
                        this.popWindow.style.display = "none";
                        this.maskLayer.style.display = "none";
                }

                _BtnClick(obj){
                        this.closeBtn.addEventListener("click",function(){
                                obj._hidden();   
                        });
                }
        }
        //API支持:  Amd || Commonjs  || Global 
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