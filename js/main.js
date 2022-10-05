// set random background for landing
let landing=document.querySelector(".landing");

let randomBackground;
function randomize(){
        randomBackground= setInterval(()=>{
        let random=Math.floor(Math.random()*4);
        landing.style.backgroundImage=`url('images/bg${random+1}.png')`;
    },3000);
}
randomize();

// show and hide settingbox
document.querySelector(".setting-box .icon ").onclick = () => {
    document.querySelector(".setting-box .icon i").classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open")
}

// change color
const lis=document.querySelectorAll(".setting-box .option-box li");

if(localStorage.getItem("pageColor")){
    document.documentElement.style.setProperty("--mainColor",(localStorage.getItem("pageColor")));
    lis.forEach(li=>{
        li.classList.remove("active");
        if(li.dataset.color==localStorage.getItem("pageColor")){
            li.classList.add("active");
        }
    })
}

lis.forEach(li => {

    li.addEventListener('click',(e) => {
        document.documentElement.style.setProperty("--mainColor",e.target.dataset.color);
        localStorage.setItem("pageColor",e.target.dataset.color);
        handleActive(e);
    });

});


// random background
let spans=document.querySelectorAll(".setting-box .option-box  .background span");


spans.forEach(span => {
    span.addEventListener('click',(e) => {
        handleActive(e);
        if(e.target.dataset.background=="yes"){
            randomize();
            localStorage.setItem("tfRandom",true);
        }
        else{
            clearInterval(randomBackground);
            localStorage.setItem("tfRandom",false);
        }
    })
});
if(localStorage.getItem(("tfRandom"))==null){
    localStorage.setItem("tfRandom","true");
}

if(localStorage.getItem("tfRandom")=="true"){
    randomize();
}else{
    clearInterval(randomBackground);
}

spans.forEach(span => {
    if(localStorage.getItem("tfRandom") == "true"){
        if(span.dataset.background=="yes"){
            span.classList.add("active");
        }
    }else{
        if(span.dataset.background=="no"){
            span.classList.add("active");
        }
    }
})



// progressbar
let skills=document.getElementById("skills");
let bars=document.querySelectorAll(".skills .skill-progress span");
document.addEventListener('scroll', () => {
    let skillsTopOffset=skills.offsetTop;
    let windowHeight=window.innerHeight;
    let skillsHeight=skills.offsetHeight;
        if(window.scrollY > skillsTopOffset + skillsHeight -windowHeight){
        bars.forEach(bar =>{
            bar.style.width=bar.dataset.progress;
        })
    }
})


// gallery popup

let images=document.querySelectorAll(".gallery .images img");

images.forEach(img => {
    img.addEventListener('click', (e) =>{
        let popupOverlay=document.createElement("div");
        popupOverlay.className="popup-overlay";
        document.body.appendChild(popupOverlay);

        let popupModal=document.createElement("div");
        popupModal.className="popup-modal";

        let popupImage=document.createElement("img");
        popupImage.src=e.target.src;
        popupImage.className="popup-image";
        if(e.target.alt !== ""){
            let popupHeader=document.createElement("h4");
            popupHeader.className='popup-header';
            let projectName=document.createTextNode(e.target.alt);
            popupHeader.appendChild(projectName);
            popupModal.appendChild(popupHeader);

        }


        // declare close as a global variabel 
        var close=document.createElement("span");
        close.className="popup-close";
        close.append("X");



        document.body.appendChild(popupModal);

        popupModal.appendChild(close);
        popupModal.appendChild(popupImage);


    });
});

document.addEventListener('click', (e) => {
    if(e.target.classList.contains("popup-close")){
        e.target.parentElement.remove();
        document.body.querySelector(".popup-overlay").remove();
    } 
});



// navigation toggle
let bullets=document.querySelectorAll(".nav-bullets .bullet");
let links=document.querySelectorAll(".links li a");

function scrollToSection(items){
    items.forEach(item => {
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            let cls=e.target.dataset.section;
            document.querySelector(`.${cls}`).scrollIntoView({
                behavior:'smooth'
            });
        });
    });   
}

scrollToSection(bullets);
scrollToSection(links);

// function handele active class
function handleActive(ev){
        ev.target.parentElement.querySelectorAll(".active").forEach( act => {
            act.classList.remove("active");
        })
        ev.target.classList.add("active");
}


// show and hide nav bullets

let bulletsBlock=document.querySelector(".nav-bullets");
let options=document.querySelectorAll(".option-box .bullets span");

if(localStorage.getItem("showBullets")==null){
    localStorage.setItem("showBullets","block")
}

if(localStorage.getItem("showBullets")!==null){

        if(localStorage.getItem("showBullets")=="block"){
            bulletsBlock.style.display="block";
            options.forEach(option => {

                if(option.dataset.display=="block"){
                    option.className="active"
                }
            })
        }
        else{
            bulletsBlock.style.display="none";
            options.forEach(option => {
                if(option.dataset.display=="none"){
                    option.className="active"
                }
            })
        }
};

options.forEach(option => {
        option.addEventListener('click',(e) => {

        handleActive(e);
        if(e.target.dataset.display=="block"){
            bulletsBlock.style.display="block";
            localStorage.setItem("showBullets",e.target.dataset.display)
        }else{
            bulletsBlock.style.display="none";
            localStorage.setItem("showBullets",e.target.dataset.display)
            // option.nex
        }
    })
})


// reset button
document.querySelector('span.reset').onclick= () => {
    localStorage.clear();
    window.location.reload();
}



// links in mobile views

let icon =document.querySelector(".landing .links-container i");
let ul=document.querySelector(".landing .links-container ul");


icon.onclick = () => {
    ul.classList.toggle("clicked");
    console.log("hello")
}