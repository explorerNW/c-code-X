/**
 * @author:explorerNW
 */
!(() => {
    const template = ` `;
    function parseToHtml(htmlTemp) {
        var div = document.createElement("div");
        div.innerHTML = template;
        return div.children[0];
    };

    function parseToTable(temp) {
        var tr = document.createElement("tr");
        tr.innerHTML = temp;
        console.log(tr);
        return tr;
    }

    let startTime = null;
    let endTime = null;
    let typeValue = null;
    let statusValue = null;
    let clientWidth = null;
    let clientHeight = null;
    let page = 1;
    let latestPage = null;
    let pageSize = 50;
    class queryDate {
        //初始化
        constructor() {
            //获取body容器
            this.container = document.body;
            //将template添加到容器                 
            //this.container.appendChild(parseToHtml(template));
            //container节点
            //this.containerNode = document.querySelector(".container");
            //获取information-module节点
            this.informationModuleNode = document.querySelector(".information-module");
            //获取resultTable
            this.resultTable = document.querySelector("#resultTable");
            //获取startTime节点            
            this.startTimeNode = document.querySelector("#startTime");
            //获取endTime节点
            this.endTimeNode = document.querySelector("#endTime");
            //this.endTimeNode = document.getElementById("endTime");
            //获取queryBtn
            this.queryBtnNode = document.querySelector("#query");
            //获取optionNode            
            this.optionNode = document.querySelector("#option");
            //获取tableTitle节点
            this.tableTitleNode = document.querySelector("#tableTitle");
            //获取resulRow节点
            this.resultRow = document.querySelector("#resultRow");
            //获取(before next)button
            this.beforePage = document.querySelector("#beforePage");
            this.nextPage = document.querySelector("#nextPage");
            //获取数据
            this._getQueryParameterValue(this);
            this.typeSelectorNode = document.getElementById("typeSelector");
            this.statusSelectorNode = document.getElementById("statusSelector");
            //获取当前时间
            this._getcurrentDate();
            typeValue = this.typeSelectorNode.value;
            statusValue = this.statusSelectorNode.value;
            //clientWH
            this._getClientWidthHeight();
            //initElementWidth&Height
            this._initElementWidthHeight();
            //获得后台数据
            this._getData();
            this._beforePage(this);
            this._nextPage(this);
            //初始化table
            this._initTable();
        }



        //获取当前系统时间
        _getcurrentDate() {
            let current = new Date();
            let year = current.getFullYear();
            let month = Number(current.getMonth()) + 1;
            let startMonth = Number(month) - 1;
            let day = current.getDate();
            if (Number(month) < 10) {
                month = "0" + month;
            }
            if (Number(startMonth) < 10) {
                startMonth = "0" + startMonth;
            }
            if (Number(day) < 10) {
                day = "0" + day;
            }
            //设置开始时间
            startTime = (year + "-" + startMonth + "-" + day).toString();
            this.startTimeNode.value = (year + "-" + startMonth + "-" + day).toString();
            //设置结束时间
            endTime = (year + "-" + month + "-" + day).toString();
            this.endTimeNode.value = (year + "-" + month + "-" + day).toString();
        }

        //获取屏幕宽高
        _getClientWidthHeight() {
            clientWidth = document.documentElement.clientWidth;
            clientHeight = document.documentElement.clientHeight;
        }

        //initElementWidth&Height
        _initElementWidthHeight() {


        }

        //获取查询参数的值
        _getQueryParameterValue(obj) {
            var date = document.getElementById("date");
            //监听click事件
            date.addEventListener("click", function (event) {
                if (event.target.id === "query") {
                    startTime = obj.startTimeNode.value;
                    endTime = obj.endTimeNode.value;
                    obj._getData();
                }
            }, true);
        }
        //初始化table
        _initTable() {
            for (let i = 0; i < `${pageSize}`; i++) {
                let tr = document.createElement("tr");
                tr.setAttribute("id", "row" + i);
                for (let j = 0; j < 5; j++) {
                    let td = document.createElement("td");
                    td.setAttribute("id", "row" + i + "col" + j);
                    tr.appendChild(td);
                }
                this.resultRow.appendChild(tr);
            }
        }
        //下一页
        _nextPage(obj) {
            this.nextPage.addEventListener("click", function () {
                page++;
                if (page > latestPage) {
                    obj.nextPage.disabled = true;
                    page--;
                } else {
                    obj.beforePage.disabled = false;
                    obj._getData();
                }
            }, true);
        }
        //上一页
        _beforePage(obj) {
            this.beforePage.addEventListener("click", function () {
                page--;
                if (page < 1) {
                    obj.beforePage.disabled = true;
                    page++;
                } else {
                    obj.nextPage.disabled = false;
                    obj._getData();
                }
            }, true);
        }

        _message(obj) {
            console.log(obj);
        }

        //fetch获取后台数据
        _getData() {
            let URL = `https://t.vdfor.top/api/v0/hy/test/list?type=0&status=0&startTime=${startTime}&endTime=${endTime}&current=${page}&pageSize=${pageSize}`;
            fetch(URL).then(function (response) {
                let resultRow = document.querySelector("#resultRow");
                response.json().then(function (data) {
                    let resultData = data.data;
                    console.log();
                    latestPage = data.total / pageSize;
                    for (let i = 0; i < pageSize; i++) {
                        for (let j = 0; j < 5; j++) {
                            switch (j) {
                                case 0:
                                    document.querySelector("#row" + i + "col" + j).innerHTML = resultData[i].name;
                                    break;
                                case 1:
                                    if (Number(resultData[i].type) === 1) {
                                        document.querySelector("#row" + i + "col" + j).innerHTML = "Docker";
                                    } else {
                                        document.querySelector("#row" + i + "col" + j).innerHTML = "OpenStack";
                                    }
                                    break;
                                case 2:
                                    let temp = null;
                                    switch (resultData[i].status) {
                                        case 1:
                                            temp = `<span class = "Running">Running</span>`;
                                            break;
                                        case 2:
                                            temp = `<span class = "Finished">Finished</span>`;
                                            break;
                                        case 3:
                                            temp = `<span class = "Error">Error</span>`;
                                    }
                                    document.querySelector("#row" + i + "col" + j).innerHTML = temp;
                                    break;
                                case 3:
                                    document.querySelector("#row" + i + "col" + j).innerHTML = resultData[i].time;
                                    break;
                                case 4:
                                    let temp2 = `<span class = "details" >详情</span><span class = "show">告警</span>`;
                                    if (resultData[i].warning_log === 1) {
                                        temp2 = `<span class = "details"  onclick = "" >详情</span><span  class = "hidden">告警</span>`;
                                    }
                                    if (resultData[i].info_log === 1) {
                                        temp2 = `<span class = "details"  onclick = "javascript:alert(this);" >详情</span><span  class = "hidden">告警</span>`;
                                    } else if (resultData[i].info_log === 0) {
                                        temp2 = `<span class = "details"  onclick = "javascript:alert(this);" >详情</span><span  class = "hidden">告警</span>`;
                                    } else {

                                    }
                                    document.querySelector("#row" + i + "col" + j).innerHTML = temp2;
                            }
                        }
                    }
                });
            });
        }

    }    
    //把class Date暴露
    //window.queryDate = queryDate;
    new queryDate();
})()