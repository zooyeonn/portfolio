// API : application programming 
// key : AIzaSyCIwiWtES-mzbMzfSBT6T7Dp_fTUbEyg9g
// playlist : PL5EyAeUspyQKZChtfcF2nv1QBZ71PuHl5

const vidList = document.querySelector(".vidList");

const key ="AIzaSyCIwiWtES-mzbMzfSBT6T7Dp_fTUbEyg9g";
const playlistId = 'PL5EyAeUspyQKZChtfcF2nv1QBZ71PuHl5';
const num = 9;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
.then((data)=>{
    return data.json();
})
.then(json=>{
    let items = json.items;
    console.log(items);
    let result = '';

    items.map((item)=>{

        let title = item.snippet.title;


        let con = item.snippet.description;


        let date = item.snippet.publishedAt;

        result +=`
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.medium.url}">
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${con}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;

    })

    vidList.innerHTML = result;


});

vidList.addEventListener("click",(e)=>{
    e.preventDefault();
    
    const vidId = e.target.closest("a").getAttribute("href");

    let pop = document.createElement("figure");
    pop.classList.add("pop");
    pop.innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
                    <span class="btnClose">close</span>
    `;
    vidList.append(pop);
});

vidList.addEventListener("click",(e)=>{
    const pop = vidList.querySelector(".pop");
    if(pop){
        const close = pop.querySelector("span");
        if(e.target == close) pop.remove(); 
    } 
});

