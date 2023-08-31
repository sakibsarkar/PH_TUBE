let sortID = 0;
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

loadData()
const loadcontent = async (id) => {
sortID = id
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    let ContentData = data.data;

    let parent = document.querySelector(".videos");
    parent.innerHTML = ""
    ContentData.forEach((content) => {
        // video duration
        let duration = content.others?.posted_date
        if (duration != "") {
            let durationInMilisec = duration * 1000
            var hr = Math.floor(durationInMilisec / (60 * 60 * 1000)) + "hrs "
            var min = Math.floor(durationInMilisec % (60 * 60 * 1000) / (60 * 1000)) + "min ago"
        }
        else {
            var hr = ""
            var min = ""
        }


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
                    <p class="time">${hr}${min}<p>
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


const sort = () => {
    const loadSortedcontent = async (id) => {
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${sortID}`);
        const data = await res.json();
        let ContentData = data.data;

        // Sort ContentData by views in descending order
        ContentData.sort((a, b) => {
            const A = parseInt(a.others?.views || "0");
            const B = parseInt(b.others?.views || "0");
            return B - A;
        });

        let parent = document.querySelector(".videos");
        parent.innerHTML = "";

        ContentData.forEach((content) => {
            let duration = content.others?.posted_date
            if (duration != "") {
                let durationInMilisec = duration * 1000
                var hr = Math.floor(durationInMilisec / (60 * 60 * 1000)) + "hrs "
                var min = Math.floor(durationInMilisec % (60 * 60 * 1000) / (60 * 1000)) + "min ago"
            }
            else {
                var hr = ""
                var min = ""
            }
    
    
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
                        <p class="time">${hr}${min}<p>
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
        
            parent.appendChild(card);
        });
    };
loadSortedcontent()
}

