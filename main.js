
document.querySelector("#myForm").addEventListener("submit",addBookmark)



function validateForm(name,url){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!name|| !url){
        alert("Enter your name and URL");
        return false;
    }else if(!url.match(regex)){
        alert('Please use a valid URL');
        return false;
    }else{
        return true;
    }
}

function addBookmark(e){
    const name = document.querySelector("#siteName").value;
    const url = document.querySelector("#siteUrl").value;

    const bookmark={
        name,
        url
    };
    let bookmarks = [];

    if(!validateForm(name,url)){
        return false;
    }

    if(localStorage.getItem("bookmarks") == null){
        bookmarks.push(bookmark);
    }else{
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);       
    }

    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    document.querySelector("#myForm").reset(); 

    fetchBookmarks();
    e.preventDefault();
}

function deleteURL(url){
    let deletedbookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    for(let i=0;i<deletedbookmarks.length;i++){
        if(deletedbookmarks[i].url === url){
            deletedbookmarks.splice(i,1);
        }
    }

    localStorage.setItem("bookmarks",JSON.stringify(deletedbookmarks));
    fetchBookmarks();
}

function fetchBookmarks(){
    const oldBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    let bookmarkResult = document.querySelector("#bookmarksResults");

    bookmarkResult.innerHTML = "";
    for(let i=0;i<oldBookmarks.length;i++){
        bookmarkResult.innerHTML +=`<div class="container">
                                        <h2>${oldBookmarks[i].name}</h2>
                                        <a class="btn btn-secondary" target="_blank" href="${oldBookmarks[i].url}">visit</a>
                                        <a class="btn btn-danger" onclick="deleteURL('${oldBookmarks[i].url}')">delete</a>
                                    </div>`;
    }
}

