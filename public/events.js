const cat = async () => {
    const res = await fetch('/kitten/image');
    const dataJSON = await res.json();
    if (!res.ok) {
        error(dataJSON);
    } else {
        const kittenImg = document.querySelector('.cat-pic');
        kittenImg.src = dataJSON.src;
        document.querySelector('.score').innerHTML = dataJSON.score;
        document.querySelector('.loader').innerText = '';
    }
}

const upVote = async () => {
    document.getElementById('upvote').addEventListener('click', async () => {
        const res = await fetch('/kitten/upvote', { method: "PATCH" });
        const dataJSON = await res.json();
        if (!res.ok) {
            error(dataJSON);
        } else {
            document.querySelector('.score').innerHTML = dataJSON.score;
        }
    })
}

const downVote = async () => {
    document.getElementById('downvote').addEventListener('click', async () => {
        const res = await fetch('/kitten/downvote', { method: "PATCH" });
        const dataJSON = await res.json();
        if (!res.ok) {
            error(dataJSON);
        } else {
            document.querySelector('.score').innerHTML = dataJSON.score;
        }
    })
}

let nodeList = [];
let listComments = document.querySelectorAll('p');
let commentBox = document.querySelector('.comments');

function deleteComment() {
    commentBox.addEventListener('click', async (e) => {
        e.stopPropagation();
        let thisId = parseInt(e.target.id);
        // console.log(thisId)
        let res = await fetch(`/kitten/comments/${thisId}`, {
                method: "DELETE"
            })
        let dataJSON = await res.json();
        let commentBox = document.querySelector('.comments');
        commentBox.innerHTML = '';
        dataJSON.comments.forEach((comment, i) => {
            const pTag = document.createElement('p');
            pTag.innerHTML = comment;
            // const del = document.createElement('button');
            pTag.appendChild(createDelete(i));
            commentBox.appendChild(pTag);
        })
        console.log(dataJSON);
    })
}


function createDelete(id) {
    let del = document.createElement('button');
    del.setAttribute("type", 'submit');
    del.setAttribute('id', id);
    del.setAttribute('class', 'deletion')
    del.innerText = 'Delete'
    return del;
}

let userComment = document.getElementById('user-comment');
function createDiv(id) {
    let p = document.createElement('p');
    p.innerText = userComment.value
    p.setAttribute('id', id);
    p.appendChild(createDelete(id));
    return p;
}

const comment = async () => {
    document.querySelector('.comment-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        let form = document.querySelector('.comment-form');
        let commentBox = document.querySelector('.comments');
        let userComment = document.getElementById('user-comment');
        let myForm = new FormData();
        let newComment = myForm.get('user-comment')
        console.log(userComment.value);
        const myHeader = new Headers();
        myHeader.append('content-type', 'application/json');
        const res = await fetch('/kitten/comments', {
            method: "POST",
            headers: myHeader,
            body: JSON.stringify({comment: userComment.value})
        });
        const dataJSON = await res.json();

        let comments = dataJSON.comments;
        let newestID = parseInt(comments.length - 1);
        let div = createDiv(newestID);
        console.log(dataJSON);

        if (!res.ok) {
            error(dataJSON);
        } else {
            commentBox.appendChild(div);
        }
    })
}

function error(dataJSON) {
    const errorField = document.querySelector('.error')
    errorField.innerHTML = dataJSON.message
}

const newPic = async () => {
    document.getElementById("new-pic").addEventListener('click', () => {
        document.querySelector('.loader').innerText = 'Loading...'
        cat()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cat();
    newPic();
    upVote();
    downVote();
    comment();
    deleteComment();
})
