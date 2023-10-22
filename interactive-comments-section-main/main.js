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
const commentMainTemplate = document.getElementById('comment-template');
const newCommentFormTemplate = document.getElementById('new-comment-form-template');

const commentsContainerList = document.getElementById('comments-display-list');

// Functions

const renderBasicElement = (el) => {
    const commentTemplateClone = commentMainTemplate.content.cloneNode(true);

    let elementWrapper = commentTemplateClone.querySelector('.message-container');

    let authorAvatarEl = commentTemplateClone.querySelector('.user-avatar');
    let authorNameEl = commentTemplateClone.querySelector('.user-name');
    let commentTime = commentTemplateClone.querySelector('.comment-date');
    let commentScore = commentTemplateClone.querySelector('.likes-score');
    let commentText = commentTemplateClone.querySelector('.comment-content');   

    authorAvatarEl.src = el.user.image.png;
    authorNameEl.textContent = el.user.username;
    commentTime.textContent = el.createdAt;
    commentScore.textContent = el.score;
    commentText.textContent = el.content;

    elementWrapper.id = el.id;

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

    return replyElement
};

const renderAddNewCommentElement = (el) => {};


const populateInitialContent = async () => {
    await fetchInitialData();

    ALL_COMMENTS.forEach(comment => {
        const renderedComment = renderMainCommentElement(comment);
        commentsContainerList.appendChild(renderedComment)
    })
};

populateInitialContent()


// Event listeners