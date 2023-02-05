const { default: axios } = require('axios');
const fetch = require('node-fetch');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const PAGE_ID = process.env.PAGE_ID
const API_SECRET = secrets.API_SECRET
const PIC_DOMAIN = 'https://api.waifu.pics'

fetch(`${PIC_DOMAIN}/sfw/waifu`)
  .then(response => response.json())
  .then(async response => {
    const quote = (await (await fetch("https://animechan.vercel.app/api/random")).json())
    const todayDay = (await (await fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=Asia:Makassar")).json()).dayOfWeek

    let localDay ='😂';
    if(todayDay == "Monday"){
      localDay = "Senin";
    }else if(todayDay == "Tuesday"){
      localDay = "Selasa";
    }else if(todayDay == "Wednesday"){
      localDay = "Rabu";
    }else if(todayDay == "Thursday"){
      localDay = "Kamis";
    }else if(todayDay == "Friday"){
      localDay = "Jumat";
    }else if(todayDay == "Saturday"){
      localDay = "Sabtu";
    }else if(todayDay == "Sunday"){
      localDay = "Minggu";
    }
    //males ^^ :v
    const message =`Selamat Hari ${localDay} %0D%0A%0D%0A${quote.quote}%0D%0A%0D%0A-${quote.character}, Dari Anime: ${quote.anime}`
      axios
      .post(`https://graph.facebook.com/${PAGE_ID}/photos?url=${response.url}&message=${message}&access_token=${ACCESS_TOKEN}`, null)
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })

      axios
      .post(`https://automaton-zeta.vercel.app/api/post-page?secret=${API_SECRET}`, null)
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
  })
  .catch(error => console.log(error))
