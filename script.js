let sortID = 0;

const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json()
    let info = data.data
    let buttonContainer = document.getElementById("categoryBtn")
    info.forEach(categorey => {
        let button = document.createElement("button");
        button.setAttribute("onclick", `loadcontent("${categorey.category_id}")`)
        button.classList.add("catBTN")
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
    console.log(ContentData.length)
    if (ContentData.length !== 0) {
        document.querySelector(".items").innerHTML = ""
        let parent = document.createElement("div");
        parent.classList.add("videos")

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
            let isVarifed = content.authors[0].verified
            console.log(isVarifed)
            if (isVarifed == true) {
                
               if(duration){
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
                        <p class = "helloAuthor">${profileName} <span class="badge"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_13_939)">
                          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                          <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_13_939">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg></span></p>
                        <p>${view}</p>
                        </div>
                        
                        </div>
                        `

                parent.appendChild(card)
                document.querySelector(".items").appendChild(parent)
               }
               else{
                let view = content.others?.views
                let card = document.createElement("div")
                card.classList.add("videoCard")
                card.innerHTML = `
                        <div class="thubnailConatiner">
                       
                        <img src="${thubnail}" alt="">
                        </div>
                        <div class="info">
                        <div class="leftPart">
                        <img src="${authorPic}" alt="">
                        </div>
                        <div class="rightPart">
                        <h1>${tittle}</h1>
                        <p class = "helloAuthor">${profileName} <span class="badge"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_13_939)">
                          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                          <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_13_939">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg></span></p>
                        <p>${view}</p>
                        </div>
                        
                        </div>
                        `

                parent.appendChild(card)
                document.querySelector(".items").appendChild(parent)
               }
            }
            else {
                if (duration) {
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
                        <p>${profileName}</p><span class="badge"></span>
                        <p>${view}</p>
                        </div>
                        
                        </div>
                        `

                    parent.appendChild(card)
                    document.querySelector(".items").appendChild(parent)
                }
                else {
                    let view = content.others?.views
                    let card = document.createElement("div")
                    card.classList.add("videoCard")
                    card.innerHTML = `
                        <div class="thubnailConatiner">
                        
                        <img src="${thubnail}" alt="">
                        </div>
                        <div class="info">
                        <div class="leftPart">
                        <img src="${authorPic}" alt="">
                        </div>
                        <div class="rightPart">
                        <h1>${tittle}</h1>
                        <p>${profileName}</p><span class="badge"></span>
                        <p>${view}</p>
                        </div>
                        
                        </div>
                        `

                    parent.appendChild(card)
                    document.querySelector(".items").appendChild(parent)
                }
            }


        })


    }
    else {
        let parent = document.querySelector(".videos");
        parent.innerHTML = "";

        let errorDiv = document.createElement("div")
        errorDiv.classList.add("errorContainer")
        errorDiv.innerHTML = `
        <div class="error">
        <img src="images/Icon.png" alt="">
        <h1>Oops!! Sorry, There is no content here</h1>
    </div>
`
        document.querySelector(".items").appendChild(errorDiv)

    }

}

const Default = async () => {
    loadcontent(1000)
}
Default()


const sort = () => {
    const loadSortedcontent = async () => {
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

