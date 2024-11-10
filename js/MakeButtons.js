class MakeButtons {
    constructor(parent, cols, callback, options={bgcolor:'antiquewhite',size:'80%'}) { //부모상자, 몇개라인/ 버튼값 전송/
        this.btnContainer = document.createElement('div')
        this.callback = callback    
        this.styles = document.createElement('style')
        this.styles.textContent = `
        .btnContainer{
        width:100%;
            height:100%;
            display:grid;
            grid-template-columns: repeat(${cols}, 1fr);
            place-items:center;
            font-size:20px;
            
        }
        .makeBtns{
            display:flex;
            align-items: center;
            justify-content: center;
            width:${options.size};
            height:${options.size};
            font-size:1.5rem;
            padding:0px;
            border-radius:10px;
            
            background-color: ${options.bgcolor};
            margin:15px;
            pointer-events: auto;
        } `
        document.body.appendChild(this.styles)
        this.parent = parent;
        this.btnContainer.className = 'btnContainer';
        this.parent.appendChild(this.btnContainer)

    }
    make(num) {  //num 버튼수 // callback function 
        num.button.forEach(v => {
            let div = document.createElement('div');
            div.textContent = v;
            div.dataset.getnumer = v
            div.className = 'makeBtns'
            div.addEventListener('click', (e) => {
                this.clickNum = e.target.textContent;
                this.callback(this.clickNum);
            })
            this.btnContainer.appendChild(div)

        })
    }


}
