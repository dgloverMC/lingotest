// move accordeon menu in the dom to the main section to be able to place navigation menu on top
const sideAccordion = document.getElementsByClassName('sidenav-wrapper')[0]
const sideAccordionWrapper = document.getElementById('accordeon-content-container')

if(sideAccordionWrapper) {
    sideAccordionWrapper.appendChild(sideAccordion)
}

// move action buttons to navbar
const actionButtons = document.getElementsByClassName('action-buttons')[0]
// move the flare hamburger button to top navigation
// because the functionality to open and close side menu is already there
const hamburgerMenuButton = document.getElementsByClassName('menu-icon')[0]
const spanWithMenuIcon = document.createElement('a')

spanWithMenuIcon.innerHTML = '&#xe91a; '

if(actionButtons && hamburgerMenuButton){
    actionButtons.appendChild(hamburgerMenuButton)
    hamburgerMenuButton.appendChild(spanWithMenuIcon)
}

// Move topicToolbarProxy and article name to article header
const topicToolbarProxy = document.querySelector('.topicToolbarProxy')
const articleHeader = document.getElementById('article-header')
const articleName = document.querySelector('h1')

if(articleHeader){
    articleHeader.appendChild(articleName)
    articleHeader.appendChild(topicToolbarProxy)
}

// find flare search functionality and move to navigation
const searchForm = document.querySelector('form.search')
const actionButtonsContainer = document.querySelector('.custom-top-navbar-buttons')

if(actionButtonsContainer){
    actionButtonsContainer.appendChild(searchForm)
}

// get all h2 and h3 headings to create miniTOC
const allH2ElementsAsArray = Array.from($('h2, h3'))
const miniTOC = document.querySelector("#mini-TOC");
const miniTOCParent = document.querySelector("div.topic-container aside");

function createMiniTOCContent() {
    if (allH2ElementsAsArray.length) {
        allH2ElementsAsArray.forEach(function (heading, index) {
            let anchorWithText = document.createElement("a");
            let listItem = document.createElement('li')
            const headingText = heading.innerText;
            const headingId = heading.innerText.split(' ').join('-')


            if(heading.tagName === 'H2'){
                anchorWithText.className = 'mini-TOC-h2'
            } else if (heading.tagName === 'H3'){
                anchorWithText.className = 'mini-TOC-h3'
            }

            if(index === 0){
                anchorWithText.className = anchorWithText.className + ' current'
            }
            
            heading.id = headingId
            anchorWithText.innerText = headingText
            anchorWithText.href = '#' + headingId
    
            if(listItem && miniTOC){
                listItem.appendChild(anchorWithText)
                miniTOC.appendChild(listItem);
            }
        });
    } else {
        // remove parent box if there are no h2 headings 
        miniTOCParent.removeChild(miniTOC)
    }
}


const allHeadings = Array.from($('h2, h3'))
const main = document.querySelector('.body-container')
if(main && allHeadings.length) {
    
    main.onscroll = function(e){
        const miniTOCHeadings = Array.from(document.querySelectorAll('#mini-TOC li'))
        const mainSectionPositionTop = e.target.scrollTop
    
        const currentlyViewedHeading = findCurrentlyViewedHeading(mainSectionPositionTop)
    
        const previouslyHighlightedHeading = findPreviouslyHighlightedHeading(miniTOCHeadings)
    
        removeClassFromPreviouslyHighlightedElement(previouslyHighlightedHeading)
    
        addClassToCurrentlyViewedElement(findMiniTOCHeadingToUpdate(miniTOCHeadings, currentlyViewedHeading))
    }
    
    function findCurrentlyViewedHeading(mainSectionPositionTop){
        const highlightedHeading = allHeadings.filter(function(heading){
            return heading.offsetTop > mainSectionPositionTop
        })[0]
    
        if(highlightedHeading) {
            return highlightedHeading
        } else {
            return allHeadings[allHeadings.length - 1]
        }
    }
    
    function findPreviouslyHighlightedHeading(miniTOCHeadings){
        return miniTOCHeadings.filter(function(heading){
            if(Array.from(heading.children[0].classList).indexOf("current") !== -1){
                return true
            }
        })[0]
    }
    
    function removeClassFromPreviouslyHighlightedElement (heading){
        heading.children[0].className =  Array.from(heading.children[0].classList).join("").split('current').join("")
    }
    
    function findMiniTOCHeadingToUpdate(miniTOCHeadings, currentlyViewedHeading){
        return miniTOCHeadings.filter(function(heading){
            return heading.innerText === currentlyViewedHeading.innerText
        })[0]
    }
    
    function addClassToCurrentlyViewedElement(heading){
        heading.children[0].className += ' current'
    }
}

createMiniTOCContent()