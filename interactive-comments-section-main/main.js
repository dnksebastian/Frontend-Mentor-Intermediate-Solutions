// document.addEventListener('alpine:init', () => {
//     Alpine.store('comments', {
//         allComments: [],
//         activeUser: {},
//         async initialize() {
//             const res = await fetch('./data.json');
//             const fetchedData = await res.json();
//             this.allComments = fetchedData.comments;
//             this.activeUser = fetchedData.currentUser;
//             console.log(this.allComments);
//         },
//     })
// })

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

    let commentReplies = commentElement.querySelector('.comment-replies-wrapper');

    let elementReplies = el.replies;
    
    elementReplies.forEach(reply => {
        const replyEl = renderReplyElement(reply);
        commentReplies.appendChild(replyEl)
    });

    return commentElement
};

const renderReplyElement = (el) => {
    const replyElement = renderBasicElement(el)
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