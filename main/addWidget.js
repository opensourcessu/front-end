var tableAddr = new Array(12); //
var table = document.createElement("table");
table.setAttribute("id", "table");
table.setAttribute("border", 1);

let add_widget = {};

(function (add_widget) {
    const widget_html = {
        search: 
    `<div id="webpage">
        <div id="menuholder">
            <a class="menu" href="#0" onclick="search_engine.nvmode();"><img src="../Images/네이버.png" width="30" hight="30"></a>
            <a class="menu" href="#0" onclick="search_engine.ggmode();"><img src="../Images/구글.png" width="30" hight="30"></a>
            <a class="menu" href="#0" onclick="search_engine.fcmode();"><img src="../Images/페북.png" width="30" hight="30"></a>
            <a class="menu" href="#0" onclick="search_engine.gitmode();"><img src="../Images/깃.png" width="30" hight="30"></a>
            <a class="menu" href="#0" onclick="search_engine.dmode();"><img src="../Images/다음.png" width="25" hight="25"></a>

        </div>
        <input id="srch" name="searchbox" type="text" autocomplete="off" maxlength="255" onkeydown="return search_engine.openurl(event);"
            autofocus />
    </div>`,
        todo_list: "",
        weather: "",
        calendar: "",
        email: "",
        album: "<img src='/img/tree.png' style='width:200px; height:315px; border-radius:20px'>",
        postit: "<textarea style='width:200px; height:135px; background-color:pink; border-radius:5px; font-size:15px;'></textarea>",
    };

    var font="font-family: 'Nanum Brush Script', cursive;"; ///여기다가 폰트저장
    var backColor="#dcccac";
  
    ////////////////////
    var widgetSize=new Array(); //위젯들 크기 넣어놓기..
    widgetSize[1]=new Array(12,3);
    widgetSize[2]=new Array(8,6);
    widgetSize[3]=new Array(3,4);
    widgetSize[4]=new Array(4,3);
    widgetSize[5]=new Array(4,4);
    widgetSize[6]=new Array(2,3);
    widgetSize[7]=new Array(2,3);

    ///////////////////////////
    var widgetCount=0;
    var widgets = new Array(); //여기에 백에서 정보담아올수있는지..?
    /*
    widgets[widgetCount++] = new Array(7); //id type positionx positiony sizewidth sizeheight raw
    widgets[0][0]=6;
    widgets[0][1]=6; //image
    widgets[0][2] = 0;
    widgets[0][3] = 0;
    widgets[0][4] = 2;
    widgets[0][5] = 7;

    widgets[widgetCount++] = new Array(7); //id type positionx positiony sizewidth sizeheight raw
    widgets[1][0]=7;
    widgets[1][1]=7; //postit
    widgets[1][2] = 7;
    widgets[1][3] = 0;
    widgets[1][4] = 2;
    widgets[1][5] = 3;*/
    ///////////////////////////////

    var full=new Array(12); //자리가 찼는지 확인하는 배열
    for(var i=0;i<12;i++) {
        full[i]=new Array(12);
        //db에서 받아오기
    }
    for(var i=0;i<12;i++) {
        for(var j=0;j<12;j++) {
            full[i][j]=0;
        }
    }/*
    for(var k=0;k<widgets.length;k++) {
        for(var i=widgets[k][2];i<widgets[k][2]+widgets[k][5];i++) {
            for(var j=widgets[k][3];j<widgets[k][4];j++) {
                full[i][j]=1;
            }
        }
    }*/
  
  
    ////////////////////////////////////////////////
    var selectedWidget=new Array(7);
    
    add_widget.select = function select(s) {
      for(var i=0;i<7;i++) {
          selectedWidget[i]=undefined;
      }
        
      if(s=='c') {
          selectedWidget[1]="calender";
          selectedWidget[4]=3;
          selectedWidget[5]=4;
      } else if(s=='a') {
          selectedWidget[1]="image";
          selectedWidget[4]=2;
          selectedWidget[5]=2;
      } else if(s=='e') {
          selectedWidget[1]="email";
          selectedWidget[4]=4;
          selectedWidget[5]=3;
      } else if(s=='p') {
          selectedWidget[1]="postit";
          selectedWidget[4]=2;
          selectedWidget[5]=2;
      } else if(s=='w') {
          selectedWidget[1]="weather";
          selectedWidget[4]=3;
          selectedWidget[5]=2;
      } else if(s=='t') {
          selectedWidget[1]="todo";
          selectedWidget[4]=6;
          selectedWidget[5]=3;
      } else if(s=='s') {
          selectedWidget[1]="search";
          selectedWidget[4]=6;
          selectedWidget[5]=2;
      }
    }

    // table 생성
    for (var i = 0; i < 12; i++) {
        var trString = "tr";
        tableAddr[i] = new Array(12);
        tableAddr[i] = document.createElement("tr");
        tableAddr[i].setAttribute("id", trString += i.toString());
        for (var j = 0; j < 12; j++) {
        
            tableAddr[i][j] = document.createElement("td");
            tableAddr[i][j].setAttribute("width", 100);
            tableAddr[i][j].setAttribute("height", 45);
            tableAddr[i][j].style.padding=0;

            if(full[i][j]==1) {
                tableAddr[i][j].style.backgroundColor="red";
            }

            var div=document.createElement("div");
            div.setAttribute("id", i.toString()+" "+j.toString()); //여기다가 위젯 넣으면 되겠다
            div.setAttribute("class","itemBox");
            div.style.maxHeight="45px";
            tableAddr[i][j].appendChild(div);

            tableAddr[i][j].setAttribute("id", "td"+i.toString()+" "+j.toString());
            tableAddr[i].appendChild(tableAddr[i][j]);
        }
        table.appendChild(tableAddr[i]);
    }

    document.getElementById("setTable").appendChild(table);

    for(var i=0;i<widgetCount;i++) {
        var loc=widgets[i][2].toString()+" "+widgets[i][3].toString();
        var content;
        if(widgets[i][1]==1) { //검색창

        } else if(widgets[i][1]==2) { //투두

        } else if(widgets[i][1]==3) { //날씨
        
        } else if(widgets[i][1]==4) { //캘린더
        
        } else if(widgets[i][1]==5) { //이메일
        
        } else if(widgets[i][1]==6) { //앨범
            content="";
        } else if(widgets[i][1]==7) { //포스트잇
            content="";
        }
        document.getElementById(loc).innerHTML=content;
    }
    //////////////////////////////////////////////////////
    var rect = table.getBoundingClientRect();
    intLeft = rect.left;
    intTop = rect.top;

    ///////////////////////////
    $(function() {
        $(".widgetItemBox").draggable({
            drag:function() {
                var offset=$(this).offset();
                var xPos=offset.left;
                var yPos=offset.top;
                

                if(xPos>intLeft && xPos<intLeft+1200 && yPos>intTop && yPos<intTop+540) { //표 안에 있을때
                    //$(this).text(whereAmI(xPos,yPos)); //각 칸마다 id
                    var checkFull=0;
                    for(var i=whereAmIx(xPos);i<Math.min(whereAmIx(xPos)+widgetSize[$(this).attr("id")][0],12);i++) {
                        for(var j=whereAmIy(yPos);j<Math.min(whereAmIy(yPos)+widgetSize[$(this).attr("id")][1],12);j++) {
                            if(full[j][i]==1) {
                                checkFull++;
                            }
                        }
                    }

                    if(checkFull!=0) { //놓을 수 없는 자리
                        //document.getElementById(whereAmI(xPos,yPos)).style.backgroundColor="red";
                        checkFull=0;
                        $(this).mouseup(function () {
                            $(this).animate({ top : 0, left : 0 }, 1000, 'easeOutElastic' ); //원래자리로
                        });
                    } else { //놓을 수 있는 자리
                        $(this).mouseup(function () { ///만드는중...
                            xPos=$(this).offset().left;
                            yPos=$(this).offset().top;
                            for(var i=whereAmIx(xPos);i<whereAmIx(xPos)+widgetSize[$(this).attr("id")][0];i++) {
                                for(var j=whereAmIy(yPos);j<whereAmIy(yPos)+widgetSize[$(this).attr("id")][1];j++) {
                                    full[j][i]=1;
                                    //document.getElementById("td"+j+" "+i).style.backgroundColor="red";
                                    switch($(this).attr("id")) {
                                        case "1": 
                                            widgets[widgetCount-1][1]=1; //검색창
                                            widgets[widgetCount-1][4]=12; //위젯 가로길이
                                            widgets[widgetCount-1][5]=3;   //위젯 세로길이
                                            //hi=widget_html.search;
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#FFADAD";
                                        break;
                                        case "2": 
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#FFD6A5";
                                        break; //투두
                                        case "3":
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#FDFFB6"; break; //날씨
                                        case "4":
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#CAFFBF"; break; //캘린더
                                        case "5":
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#A0C4FF"; break; //이메일
                                        case "6":
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#BDB2FF"; //앨범
                                        break;
                                        case "7":
                                            document.getElementById("td"+j+" "+i).style.backgroundColor="#FFC6FF"; break; //포스트잇
                                    }
                                }
                            }
                            widgets[widgetCount++] = new Array(7);
                            widgets[widgetCount-1][2]=whereAmIx(xPos); //추가한 위젯 위치 저장
                            widgets[widgetCount-1][3]=whereAmIy(yPos);
                            
                            
                            //document.getElementById(whereAmI(xPos,yPos)).innerHTML=hi;
                            $(this).animate({ top : 0, left : 0 }, 1000, 'easeOutElastic' );
                            if ($(this).attr("id") === "1") {
                                search_engine.init();
                            }
                            //document.getElementById($(this).attr("id")).style.display="none";
                        });
                    
                        
                    }
                } else { //표 바깥에 있을때
                    ;
                }
            }
        });
    });

    function whereAmI(x,y) {
        var xx=Math.floor(((x-intLeft)/100));
        var yy=Math.floor(((y-intTop)/45));
        var ss=yy.toString();
        ss+=" ";
        ss+=xx.toString();
        return ss;
    }
    function whereAmIx(x) {
        var xx=Math.floor(((x-intLeft)/100));
        return xx;
    }
    function whereAmIy(y) {
        var yy=Math.floor(((y-intTop)/45));
        return yy;
    }

    document.querySelector("body").style.backgroundColor=backColor; //배경색..
})(add_widget);