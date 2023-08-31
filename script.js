const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json()
    let info = data.data
    let buttonContainer = document.getElementById("categoryBtn")
    info.forEach(categorey => {
        let button = document.createElement("button");
        button.setAttribute("onclick", `loadcontent("${categorey.category_id}")`)
        button.innerText = categorey.category
        buttonContainer.appendChild(button)
    })
}

const loadcontent = async (id) => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    let ContentData = data.data;
    let parent = document.querySelector(".videos");
    parent.innerHTML=""
    ContentData.forEach((content) => {
        // parent div
        
        let thubnail = content.thumbnail;
        let tittle = content.title
        let authorPic = content.authors[0].profile_picture;
        let profileName = content.authors[0].profile_name;
        let isVarifed = content.authors[0].verifed
        let view = content.others?.views
        let card = document.createElement("div")
        card.classList.add("videoCard")
        card.innerHTML = `
                    <div class="thubnailConatiner">
                    <p class="time">3hrs 56min ago<p>
                    <img src="${thubnail}" alt="">
                    </div>
                    <div class="info">
                        <div class="leftPart">
                            <img src="${authorPic}" alt="">
                        </div>
                        <div class="rightPart">
                            <h1>${tittle}</h1>
                            <p>${profileName}</p>
                            <p>${view}</p>
                        </div>

                    </div>
                
        
        `
        parent.appendChild(card)
    })

}
loadData()