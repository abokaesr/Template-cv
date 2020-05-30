/*******************        Pure Javascript For Main Functions         ******************************/



/**
 *  this line is very important because we want to set the local storge the save the color
 * 
 */

let localColorStorge = localStorage.getItem('colorOption')
if (localColorStorge !== null) {
    document.documentElement.style.setProperty('--main-color', localColorStorge);

    // remove the active class from the items that are not selected 
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === localColorStorge) {
            //add class active to target color
            element.classList.add('active');
        };
    });

}

/**
 *  both variables must be global to be seen by other functions
 * 
 */
// Random Background option .. this must be true to random the images otherwise stop all 

let backgroundOption = true;

// declare valriable to stop the images. this will help us to clear the interval
let handelSetIntervalFunction;

// check if there is any local storge for the background images
let localBackgroundStorge = localStorage.getItem('background-option');
if (localBackgroundStorge !== null) {
    if (localBackgroundStorge === "true") {
        // return true and run the function 
        backgroundOption = true;
    } else {
        // return true and run the function 
        backgroundOption = false;
    }

    //remove active class from the items
    document.querySelectorAll('.random-backrgound button').forEach(element => {
        element.classList.remove('active-random');
    });

    //add class active to itme that we click
    if (localBackgroundStorge === "true") {
        document.querySelector(".random-backrgound .yes").classList.add("active-random");
    } else {
        document.querySelector(".random-backrgound .no").classList.add("active-random");

    }
}
//get defalut value 
let ClearTheShowingLocal;
// local storage for  show and hide the bullet
let localshowBulletOprions = localStorage.getItem("show-option");
if (localshowBulletOprions !== null) {
    document.querySelectorAll(".bullet-option button").forEach(Element => {
        Element.classList.remove('active-random');
    });
    if (localshowBulletOprions == "block") {
        document.querySelector(".nav-bullet").style.display = "block";
    } else {
        document.querySelector(".nav-bullet").style.display = "none";
    }

    //add class active to itme that we click
    if (localshowBulletOprions === "block") {
        document.querySelector(".bullet-option .yes").classList.add("active-random");
    } else {
        document.querySelector(".bullet-option .no").classList.add("active-random");

    }

}

/**
 *  start the sitting box functions
 *  the other function will be in javascript
 */
document.querySelector('.fa-gear').onclick = function() {

    //add class to sitting box 
    document.querySelector('.sitting-box').classList.toggle('open');
};



/*
 * get the color orions to switch them / Background Options 
 * 
 *  1-) we have to save all target list in one variable
 *  2-) do loop to featch all Elemnts that handel the what we want to change
 *  3-) set the event onclick to get the Values
 *  4-) change the root 
 */

// change the color option
const colorOptions = document.querySelectorAll('.colors-list li');

// loop on all li to fetch the data of colors
colorOptions.forEach(li => {
    // use event click to get the colors of each element
    li.addEventListener("click", (event) => {
        //using this method we can get the color in li
        let getColor = event.target.dataset.color;
        // once we get the color then we have to change it with root
        document.documentElement.style.setProperty('--main-color', getColor);

        // set the color to be storge and save in local storge
        localStorage.setItem("colorOption", getColor);

        // remove active class from colors
        event.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove('active');
        });
        event.target.classList.add('active');
    });

});

//change the background options

const backgroundOptions = document.querySelectorAll('.random-backrgound button');

// loop on all buttons
backgroundOptions.forEach(button => {
    // click on each button
    button.addEventListener("click", event => {
        event.target.parentElement.querySelectorAll(".active-random").forEach(ele => {
            // remove the active class
            ele.classList.remove('active-random');
        });
        // add class active
        event.target.classList.add('active-random');

        // check if the click on yes or no to send the order to stop or allow the random images
        if (event.target.dataset.random === "yes") {
            // return true and run the function 
            backgroundOption = true;
            RandomBackgroundImage();
            // save the value in local storge to use it later
            localStorage.setItem('background-option', true);

        } else {
            // return false and clear the intrnal to stop images
            backgroundOption = false;
            clearInterval(handelSetIntervalFunction);
            // save the value in local storge to use it later
            localStorage.setItem('background-option', false);

        }
    });
});

// show nav bullet
const getShowBullet = document.querySelectorAll(".bullet-option button");
getShowBullet.forEach(button => {
    button.addEventListener("click", event => {
        event.target.parentElement.querySelectorAll(".active-random").forEach(ele => {
            // remove the active class
            ele.classList.remove('active-random');
        });
        // add class active
        event.target.classList.add('active-random');
        if (event.target.dataset.show === "yes") {
            showOption = true;
            document.querySelector(".nav-bullet").style.display = "block";
            // save the value in local storge to use it later
            localStorage.setItem('show-option', "block");
        } else {
            document.querySelector(".nav-bullet").style.display = "none";
            showOption = false;
            clearInterval(ClearTheShowingLocal);
            // save the value in local storge to use it later
            localStorage.setItem('show-option', "none");
        }
    });
});


// End the sitting box functions




/*
 *  start the laoding page functions its very important and hard
 */

// start the landing page to select Elemnts
let landingPage = document.querySelector('.landing-page');

// maje an array to get the images paths to show it in packground

let imageArray = ["awsom-web.jpg", "software.jpg", "web_dev2_image.png", "web_dev_image.png"];

function RandomBackgroundImage() {

    // make codition to check if true or false
    if (backgroundOption === true) {
        // genrate number by showing it in specifice time
        handelSetIntervalFunction = setInterval(function() {

            //get randome number
            let randomNumber = Math.floor(Math.random() * imageArray.length);

            // change the images like slide show ///change background image url for landing page
            landingPage.style.backgroundImage = 'url("images/' + imageArray[randomNumber] + '")';

            // remove active class from colors


        }, 2000)
    }
}
RandomBackgroundImage();

/**
 *  End the laoding page functions
 */



// start the skills side

let getSkills = document.querySelector(".skills");
// start the projects side
let ProjectsImages = document.querySelector(".Projects");
// do action when window scroll down
window.onscroll = function() {
    // get the offset for the skills section
    let skillsOffset = getSkills.offsetTop;
    //get the outer height 
    let outerHeight = getSkills.offsetHeight;
    // get the offset for the skills section
    let ProjectOffset = ProjectsImages.offsetTop;
    //get the outer height 
    let ProjectouterHeight = ProjectsImages.offsetHeight;
    // get the window height 
    let windowHeight = this.innerHeight;
    //  get window scroll down or top
    let windowScrollTop = this.pageYOffset;
    // reash the skills section 
    if (windowScrollTop > (skillsOffset + outerHeight - windowHeight)) {
        // do loop to featch all skills progress bar
        let Allskills = document.querySelectorAll(".info-skils .skill-info .skill-progress span");


        Allskills.forEach(skill => {
            // change the width of progress bar to match with data-progress
            skill.style.width = skill.dataset.progress;
            if (skill.dataset.progress > '70') {
                skill.style.backgroundColor = "green";
            } else if (skill.dataset.progress > '50' && skill.dataset.progress < '70') {
                skill.style.backgroundColor = "orange";
            } else {
                skill.style.backgroundColor = "red";
            }
        });
    }
    // show the  projects side when the scroll reash the 2000
    if (windowScrollTop > (ProjectOffset + ProjectouterHeight - windowHeight)) {
        let AllImages = document.querySelectorAll(".Projects .images img");
        AllImages.forEach(images => {
            // change the width of progress bar to match with data-progress
            images.style.opacity = "1";
        }, 1000);
    }

}


/**
 * Start the popup section when the user click on one of the project img 
 * 
 *  1-) in this section we will create Element using javascript then add class to it 
 * 
 *  2-) append the new element to body when the user click on any of the images
 * 
 *  3-)create popup box and its class
 * 
 * 4-) create the image form to accept the src that we will get when we click on any of images
 * 
 *  5-) add popup image to body to show it in overlay
 * 
 * 6-) we can create it menual  and then add the function on click but we did so to practice on javascript
 */

let ImagePopUp = document.querySelectorAll(".Projects img");


ImagePopUp.forEach(img => {

    img.addEventListener("click", (event) => {

        // create overlay popup Element
        let overlay = document.createElement("div");
        //create class to div elemet 
        overlay.className = "popup-overlay";
        // append the overlay and desgin it using css
        document.body.appendChild(overlay);

        // create popup box
        let popUpBox = document.createElement("div");
        //create class for the div
        popUpBox.className = "popup-box";

        // create image form 
        let popUpImage = document.createElement("img");
        //set the img src to be the same as the one that we click on 
        popUpImage.src = img.src;

        // add image to popup box to show it in body
        popUpBox.appendChild(popUpImage);

        // add the popup box to body
        document.body.appendChild(popUpBox);

        // add alter text to be header to popup image

        if (img.alt !== null) {

            //create Alt heading
            let AltHeading = document.createElement("h3");

            // create the text 
            let AltTextImage = document.createTextNode(img.alt);

            // append the text to heading

            AltHeading.appendChild(AltTextImage);
            //append to popup
            popUpBox.appendChild(AltHeading);

        }

        // create close image 
        let CloseImageButton = document.createElement("span");

        // create close text to close the image when you click on
        CloseImageButtonText = document.createTextNode("X");

        // append the X inside the span
        CloseImageButton.appendChild(CloseImageButtonText);

        //add class to it
        CloseImageButton.className = "close-image";
        // add the close cutton to box popup
        popUpBox.appendChild(CloseImageButton);

    });

});

// close the popup image when we click on close

document.addEventListener("click", function(e) {
    if (e.target.className == "close-image") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});


// Resite the localStorge.
document.querySelector(".sitting-box .reset-options ").onclick = function() {
    // if we dont have something important in localsotrge then we can use clear

    // use clear to delete eveery things in local storge 
    localStorage.clear();

    // otherwise if you want to delete specifice item we use localStorage.removeItem(" class name")

    // reload window 
    window.location.reload();
};


// Toggle to view links of the header in phone view

let toggleBtn = document.querySelector(".toggle-menu");
let toggleLinks = document.querySelector(".header-links ");

toggleBtn.onclick = function(e) {
    /*
        this event will help us to stop Propagation means not allow to select 
        what is inside the button so there will be no mistakes with other code
    
        */
    e.stopPropagation();

    // add classes to targets classes
    this.classList.toggle("menu-active");
    toggleLinks.classList.toggle("open")
};
toggleLinks.onclick = function(e) {
    e.stopPropagation();
};

//close the menu if we click anywhere on screen 

document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== toggleLinks) {
        //check if the class is open 
        if (toggleLinks.classList.contains("open")) {
            toggleLinks.classList.toggle("open")
            toggleBtn.classList.toggle("menu-active");
        }

    }

});









/**
 *  bulit section
 *  
 *  1-) fetch the bullets queries to loop for all 
 * 
 *  2-) add event click to bullet to scroll down to related element
 * 
 * 3-) use the scrollintoView event to get the exact class
 * 
 * 4-) this is version 1 the version 2 is down as function
 * 
 * 

// selecte all builts
const Allbullets = document.querySelectorAll(".nav-bullet .bullet");
Allbullets.forEach(bullet => {

    bullet.addEventListener("click", (event) => {
        document.querySelector(event.target.dataset.sectoin).scrollIntoView({
            behavior: "smooth",
        });
    });

});

// selecte all head links
const alllinks = document.querySelectorAll(".landing-page  a");
alllinks.forEach(link => {


    link.addEventListener("click", (event) => {
        // we add this default when we deal with links to block the fake travel 
        event.preventDefault();
        document.querySelector(event.target.dataset.sectoin).scrollIntoView({
            behavior: "smooth",
        });
    });


});


*/


/**************************   V.2 as functions to clear the code         **************************************/


/**
 * 
 *  in this part we gonna create new featuers where we can handel
 * large lines just using one function to avoid the repeation
 * 
 *  SO ALL functions down are working the same way as the above 
 * 
 * but down just like new version of the above lines 
 * 
 */

// function to handle the scrollDown when we click on any link
const Allbullets = document.querySelectorAll(".nav-bullet .bullet");
const alllinks = document.querySelectorAll(".landing-page  a");

function handleScroll(elemnt) {

    elemnt.forEach((e) => {
        e.addEventListener("click", (event) => {
            // we add this default when we deal with links to block the fake travel 
            event.preventDefault();
            document.querySelector(event.target.dataset.sectoin).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
handleScroll(Allbullets);
handleScroll(alllinks);