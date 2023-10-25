// General
let ALL_COMMENTS = [];
let CURRENT_USER = {};

const fetchInitialData = async () => {
    const res = await fetch('./data.json');
    const fetchedData = await res.json()
    ALL_COMMENTS = [...fetchedData.comments];
    CURRENT_USER = {...fetchedData.currentUser}

    console.log(ALL_COMMENTS);
};


// DOM Elements
const componentContainer = document.querySelector('.component-helper');

const commentMainTemplate = document.getElementById('comment-template');
const newCommentFormTemplate = document.getElementById('new-comment-form-template');

const commentsContainerList = document.getElementById('comments-display-list');


// Functions

const generateNewID = () => {
    return Math.floor(Math.random() * 100000);
};

const displayCommentTime = (commentPostDate) => {
    // ... this will change comment timestamp into relative time e.g 'a day ago'
};


const renderBasicElement = (el) => {
    const commentTemplateClone = commentMainTemplate.content.cloneNode(true);

    let elementWrapper = commentTemplateClone.querySelector('.message-container');

    let authorAvatarEl = commentTemplateClone.querySelector('.user-avatar');
    let authorNameEl = commentTemplateClone.querySelector('.user-name');
    let commentTime = commentTemplateClone.querySelector('.comment-date');
    let commentScore = commentTemplateClone.querySelector('.likes-score');
    let commentText = commentTemplateClone.querySelector('.comment-content');

    let likeCommentBtn = commentTemplateClone.querySelector('.increase-likes-btn');
    let unlikeCommentBtn = commentTemplateClone.querySelector('.decrease-likes-btn');
    let deleteCommentBtn = commentTemplateClone.querySelector('.delete-comment-btn');

    authorAvatarEl.src = el.user.image.png;
    authorNameEl.textContent = el.user.username;
    commentTime.textContent = el.createdAt;
    commentScore.textContent = el.score;
    commentText.textContent = el.content;
    elementWrapper.id = el.id;

    likeCommentBtn.addEventListener('click', likeSelectedComment);
    unlikeCommentBtn.addEventListener('click', unlikeSelectedComment);
    deleteCommentBtn.addEventListener('click', deleteSelectedComment);

    return commentTemplateClone;
};

const renderMainCommentElement = (el) => {
    const commentElement = renderBasicElement(el);

    const commentElWrap = commentElement.querySelector('li');
    let commentReplies = commentElement.querySelector('.comment-replies-wrapper');
    let elementReplies = el.replies;

    commentElWrap.classList.add('main-comment')
    
    elementReplies.forEach(reply => {
        const replyEl = renderReplyElement(reply);
        commentReplies.appendChild(replyEl)
    });

    return commentElement
};

const renderReplyElement = (el) => {
    const replyElement = renderBasicElement(el)

    const replyElWrap = replyElement.querySelector('li');
    replyElWrap.classList.add('reply-comment');

    const commentEl = replyElement.querySelector('.comment-content');
    const replyToEl = document.createElement('span');
    commentEl.prepend(replyToEl);

    replyToEl.classList.add('replyto');
    replyToEl.textContent = `@${el.replyingTo}`


    return replyElement
};

const markElementsBySelf = () => {
    const allElements = document.querySelectorAll('.message-container');

    allElements.forEach(el => {
        const elUsername = el.querySelector('.user-name').textContent;

        if (elUsername === CURRENT_USER.username) {
            el.classList.add('by-user')
        }
    })
};


const renderAddNewCommentElement = () => {
    const formTemplateClone = newCommentFormTemplate.content.cloneNode(true);


    let commentFormEl = formTemplateClone.querySelector('.new-comment-form');

    commentFormEl.addEventListener('submit', addNewMainComment);

    let userAvatar = formTemplateClone.querySelector('.reply-av');
    userAvatar.src = CURRENT_USER.image.png


    return formTemplateClone
};

const renderComments = () => {
    const commentEls = ALL_COMMENTS.map(comment => {
        const renderedComment = renderMainCommentElement(comment);
        return renderedComment
    })

    commentsContainerList.replaceChildren(...commentEls)

    markElementsBySelf()
};


const populateInitialContent = async () => {
    await fetchInitialData();
    renderComments()

    const mainNewCommentEl = renderAddNewCommentElement()
    componentContainer.appendChild(mainNewCommentEl);
};

populateInitialContent()



const addNewMainComment = (e) => {
    e.preventDefault();
    
    const commentFormEl = e.target;
    
    const currentCommentEl = commentFormEl.querySelector('.new-comment-input');
    
    let currentCommentElVal = currentCommentEl.value;

    const newCommentObj = {
        id: generateNewID(),
        content: currentCommentElVal,
        createdAt: 'Just now', //this is temporary
        score: 0,
        user: CURRENT_USER,
        replies: [],
    }


    ALL_COMMENTS.push(newCommentObj);

    renderComments()

    console.log(currentCommentElVal);

    commentFormEl.reset()
};

// Helper functions

const findClosestMainComment = (e) => {
    const closestMainCommentEl = e.target.closest('.main-comment');
    return closestMainCommentEl
};

const findClosestMainObj = (e) => {
    const closestMainEl = findClosestMainComment(e);
    const closestMainCommID = +closestMainEl.id

    const mainCommObj = ALL_COMMENTS.find(obj => +obj.id === closestMainCommID)
    return mainCommObj;
};

const findClosestRepliesArr = (e) => {
    const mainComm = findClosestMainObj(e);

    return mainComm.replies
};

const findCommentObj = (e) => {
    const currentCommentEl = e.target.closest('.message-container');
    const currentCommentID = +currentCommentEl.id;
 
    let commentsArrObj

    if (currentCommentEl.classList.contains('reply-comment')) {
        const repliesArr = findClosestRepliesArr(e)

        commentsArrObj = repliesArr.find(obj => +obj.id === currentCommentID)
        
    } else if(currentCommentEl.classList.contains('main-comment')) {
        
        commentsArrObj = ALL_COMMENTS.find(obj => +obj.id === currentCommentID);
    }

    return commentsArrObj;
};


// Like & unlike comments

const likeSelectedComment = (e) => {

    const currentObj = findCommentObj(e);

    currentObj.score++
    renderComments()

};

const unlikeSelectedComment = (e) => {
    const currentObj = findCommentObj(e);

    currentObj.score--
    renderComments()
};


// Delete comment

const deleteSelectedComment = (e) => {
    const currentCommentEl = e.target.closest('.message-container');
    const currentCommentID = +currentCommentEl.id;

    
    if (currentCommentEl.classList.contains('reply-comment')) {
        const closestMainObj = findClosestMainObj(e);
        const currentRepliesArr = findClosestRepliesArr(e);
        const filteredReplies = currentRepliesArr.filter(el => +el.id !== currentCommentID);

        closestMainObj.replies = filteredReplies;

    
    } else if(currentCommentEl.classList.contains('main-comment')) {
        const filteredArr = ALL_COMMENTS.filter(el => +el.id !== currentCommentID);
        ALL_COMMENTS = filteredArr;
    }

    renderComments()

};