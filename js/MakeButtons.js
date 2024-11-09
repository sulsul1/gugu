class MakeButtons{
    constructor(){
    this.container = document.createElement('div')
    this.styles = document.createElement('style')
    this.styles.textContent = " ";
    }
    make(num={button:[0,1,2,3,4,5,6,7,8,9], funs:[]}){  //num 버튼수
 
        button.forEach(v=>{
            let div = document.createElement('div');
            div.textContent = v;
            div.className='btns'

        })
    
    }
}