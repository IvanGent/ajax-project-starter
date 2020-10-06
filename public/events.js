const cat = async () => {
    const res = await fetch('/kitten/image');
    const dataJSON = await res.json();
    if (!res.ok) {
        error(dataJSON);
    } else {
        const kittenImg = document.querySelector('.cat-pic');
        kittenImg.src = dataJSON.src;
        document.querySelector('.score').innerHTML = dataJSON.score;
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

const comment = async () => {
    document.querySelector('.comment-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        const res = await fetch('/kitten/comments', { method: "POST" });
        const dataJSON = await res.json();
        if (!res.ok) {
            error(dataJSON);
        } else {

        }
    })
}

function error(dataJSON) {
    const errorField = document.querySelector('.error')
    errorField.innerHTML = dataJSON.message
}

const newPic = async () => {
    document.getElementById("new-pic").addEventListener('click', () => {
        cat()
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cat();
    newPic();
    upVote();
    downVote();
})
