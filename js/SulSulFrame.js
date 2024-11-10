
class SulSulFrame extends ColorList {
    constructor(heights = [15, 70, 10], margin = "40px") {
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
        this.copyright.innerHTML = "Copyright @ MoonSeungHwan | All Rights Reserved"

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
            flexWrap: "wrap",
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
            diplay: "flex",


        });

        Object.assign(this.bottomBox.style, {
            height: `calc(${this.bottomHeight} - ${this.margin}/3)`,

        });

        this.copyright.style = "bottom:10px; position:absolute; font-size:0.8rem"

        this.container.appendChild(this.topBox);
        this.container.appendChild(this.mainBox);
        this.container.appendChild(this.bottomBox);
        document.body.appendChild(this.container);
        document.body.appendChild(this.copyright);
    }
    ScoreBoxInit(){
        this.userBox.textContent = '사용자';
        this.stepBox.textContent = '1단계';
        this.scoreBox.textContent = '0점';
        this.timerBox.textContent = '0초';

    }
    createScoreBox() {  // 점수판 

        this.scoreContainer.appendChild(this.userBox);
        this.scoreContainer.appendChild(this.stepBox);
        this.scoreContainer.appendChild(this.scoreBox);
        this.scoreContainer.appendChild(this.timerBox);

        this.userBox.textContent = '사용자';
        this.stepBox.textContent = '1단계';
        this.scoreBox.textContent = '0점';
        this.timerBox.textContent = '0초';

        this.scoreContainer.className = "scoreBoxcontainer";
        this.userBox.className = "sb userBox";
        this.stepBox.className = "sb stepBox";
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
             .userBox{
             width:90px;
             }
        `;
        document.head.appendChild(style);

        Object.assign(this.scoreContainer.style, {
            position: "absolute",
            right: "2rem",
            width: "500px",
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
    setScoreContainer(key = { user: '사용자', step: 1, score: 0, timer: 0 }) {
        this.userBox.textContent = key.user ?? '사용자';
    
        // 기존의 값에 새로운 값을 더하도록 수정
        const currentStep = parseInt(this.stepBox.textContent) || 0;
        const newStep = parseInt(key.step) || 0;
        this.stepBox.textContent = (newStep + currentStep) + '단계';
    
        const currentScore = parseInt(this.scoreBox.textContent) || 0;
        const newScore = parseInt(key.score) || 0;
        this.scoreBox.textContent = (newScore + currentScore) + '점';
    
        const currentTimer = parseInt(this.timerBox.textContent) || 0;
        const newTimer = parseInt(key.timer) || 0;
        this.timerBox.textContent = (newTimer + currentTimer) + '초';
    }


    resetScoreContainer() { // 리셋
    }


    setTitle(title, fontSize = '1.4rem', left = '60px') {
        this.topBox.innerHTML = "<img src='images/icon.png' style='margin-right:10px'>\t" + title;
        this.topBox.style.left = left;
        this.topBox.style.fontSize = fontSize

    }


    // 팝업존
    popup(width = "300px", height = "200px", title = "", text = "", buttons = [{ btn: "확인", funs: null }]) {
        // Create popup background overlay
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000"
        });

        // Create popup box
        const popupBox = document.createElement("div");
        Object.assign(popupBox.style, {
            width: width,
            height: height,
            backgroundColor: "#fff",
            border: `6px solid ${this.colorList.C1.bg}`,
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        });

        // Create title element (optional, based on title argument)
        if (title) {
            const titleElement = document.createElement("h2");
            titleElement.textContent = title;
            titleElement.style.marginBottom = "10px"; // Add some margin for clarity
            popupBox.appendChild(titleElement);
        }

        // Create text element
        const textElement = document.createElement("p"); // Use <p> for paragraph text
        textElement.textContent = text;
        popupBox.appendChild(textElement);

        // Create buttons and append to popup
        buttons.forEach(button => {
            const btn = document.createElement("button");
            btn.textContent = button.btn;
            Object.assign(btn.style, {
                margin: "5px",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                cursor: "pointer"
            });
            btn.addEventListener("click", () => {
                if (button.funs) {
                    button.funs();
                }
                overlay.remove();
            });
            popupBox.appendChild(btn);
        });

        overlay.appendChild(popupBox);
        document.body.appendChild(overlay);
    }

}
