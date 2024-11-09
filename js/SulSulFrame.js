
class SulSulFrame extends ColorList {
    constructor(heights = [10, 80, 8], margin = "40px") {
        super()
        this.margin = margin;
        this.heights = heights;
        // 기본 프레임
        this.container = document.createElement("div");
        this.topBox = document.createElement("div");
        this.mainBox = document.createElement("div");
        this.bottomBox = document.createElement("div");
        this.copyright = document.createElement("div");
        this.topHeight = this.heights[0] + "vh";
        this.mainHeight = this.heights[1] + "vh";
        this.bottomHeight = this.heights[2] + "vh";
        this.copyright.innerHTML="Copyright @ MoonSeungHwan | All Rights Reserved"

        //점수판 요소
        this.scoreContainer = document.createElement("div");
        this.userBox = document.createElement("div");
        this.scoreBox = document.createElement("div");
        this.timerBox = document.createElement("div");
        this.stepBox = document.createElement("div");

    }

    createContainer() {
        this.container.className = "container";
        this.topBox.className = "topBox";
        this.mainBox.className = "mainBox";
        this.bottomBox.className = "bottomBox";

        Object.assign(document.body.style, {
            margin: "0 ",
            padding: "0",
            display: "flex",
            flexWrap:"wrap",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: this.colorList.C1.bg,
            overflow: "hidden",

        });

        Object.assign(this.container.style, {
            width: "100%",
            height: "100%",
            margin: `calc(${this.margin} / 2)`,
            display: "block",
            overflow: "hidden",
            backgroundColor: this.colorList.C1.active,
            borderRadius: "15px",
            boxShadow: "0px 0px 10px #ccc"
        });

        Object.assign(this.topBox.style, {
            height: `calc(${this.topHeight} - ${this.margin}/3)`,
            color: 'black',
            display: "flex",
            marginLeft: "1.5rem",
            justifyContent: "left",
            alignItems: "center",
            fontFamily: "nanum-gothic",
            fontSize: "1.5rem"

        });

        Object.assign(this.mainBox.style, {
            height: `calc(${this.mainHeight} - ${this.margin}/3)`,
            borderRadius: "15px",
            backgroundColor: "white",
        });

        Object.assign(this.bottomBox.style, {
            height: `calc(${this.bottomHeight} - ${this.margin}/3)`,
            
        });
        
        this.copyright.style="bottom:10px; position:absolute; font-size:12px"

        this.container.appendChild(this.topBox);
        this.container.appendChild(this.mainBox);
        this.container.appendChild(this.bottomBox);
        document.body.appendChild(this.container);
        document.body.appendChild(this.copyright);
    }

    createScoreBox() {  // 점수판 

        this.scoreContainer.appendChild(this.userBox);
        this.scoreContainer.appendChild(this.stepBox);
        this.scoreContainer.appendChild(this.scoreBox);
        this.scoreContainer.appendChild(this.timerBox);

        this.scoreContainer.className = "scoreBoxcontainer";
        this.userBox.className = "sb userBox";
        this.stepBox.className = "sb scoreBox stepBox";
        this.scoreBox.className = "sb scoreBox";
        this.timerBox.className = "sb timerBox";

        const style = document.createElement("style");
        style.textContent = `
            .sb {
                padding: 5px;
                margin: 5px;
                width:20%;
                text-align: center;
                color: #fff;
                background-color: ${this.colorList.C1.p1};
                border-radius: 8px;
            }
        `;
        document.head.appendChild(style);

        Object.assign(this.scoreContainer.style, {
            position: "absolute",
            right: "2rem",
            width: "25%",
            borderRadius: "1rem",
            border: "1px solid white",
            backgroundColor: this.colorList.C1.p2,
            padding: "1px",
            display: "flex",
            fontSize: "1rem",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "space-between",
        })

        this.scoreContainer.appendChild(this.userBox);
        this.scoreContainer.appendChild(this.stepBox);
        this.scoreContainer.appendChild(this.scoreBox);
        this.scoreContainer.appendChild(this.timerBox);
        this.topBox.appendChild(this.scoreContainer)


    }


    setScoreContainer(key) {
        if (key.user) {
            this.userBox.textContent = key.user
        }
        if (key.step) {
            this.stepBox.textContent = eval(key.step + +this.stepBox.textContent)
        }
        if (key.score) {
            this.scoreBox.textContent = eval(key.score + +this.scoreBox.textContent)
        }
        if (key.timer) {
            this.timerBox.textContent = eval(key.timer + +this.timerBox.textContent)
        }
    }

    resetScoreContainer(){
        this.userBox.textContent = 사용자
        this.stepBox.textContent = 0
        this.scoreBox.textContent =0
        this.timerBox.textContent = 0
    }
    setTitle(title, fontSize = '1.4rem', left = '60px') {
        this.topBox.innerHTML = "<img src='images/icon.png' style='margin-right:10px'>\t" + title;
        this.topBox.style.left = left;
        this.topBox.style.fontSize = fontSize

    }



}
