export interface MediaAsset {
  id: string;
  title: string;
  type: string;
  folder: string;
  file: string;
  src: string;
  isVideo: boolean;
  size: string;
  url?: string;
}

export function getDisplayTitle(item: { title?: string; type?: string }): string {
  if (!item || !item.title) return "Zenkai Creative Showcase";
  const title = item.title;
  if (/^(Visual|IMG|202\d|\d{4})/i.test(title)) {
    switch (item.type) {
      case "Posters":
        return "Esports & Gaming Poster Showcase";
      case "Thumbnails":
        return "High-CTR YouTube Cover Design";
      case "2D Design":
        return "Brand Apparel & Merch Design";
      case "Reels":
        return "High-Retention Video Edit";
      default:
        return "Zenkai Creative Asset";
    }
  }
  return title;
}

export const assetItems: MediaAsset[] = [
  {
    "id": "reel-v2",
    "title": "Short-Form Video V2 Showcase",
    "type": "Reels",
    "folder": "REELS",
    "file": "v2.mp4",
    "src": "/Assets/REELS/v2.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reel-v3",
    "title": "Custom Software V3 Showcase",
    "type": "Reels",
    "folder": "REELS",
    "file": "v3.mp4",
    "src": "/Assets/REELS/v3.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reel-growth-creative",
    "title": "Growth Creative Showcase",
    "type": "Reels",
    "folder": "REELS",
    "file": "growth_creative.mp4",
    "src": "/Assets/REELS/growth_creative.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "software-mark47",
    "title": "MARK47 | PUBG Mobile Production Software",
    "type": "Software",
    "folder": "Software",
    "file": "MARK47.png",
    "src": "/Assets/MARK47.png",
    "isVideo": false,
    "size": "wide",
    "url": "https://mark47.com"
  },
  {
    "id": "web-solentrix",
    "title": "Solentrix | Premium Solar Energy Solutions",
    "type": "Web",
    "folder": "Web",
    "file": "solentrix.png",
    "src": "/Assets/Thumbnails/solentrix.png?v=2",
    "isVideo": false,
    "size": "wide",
    "url": "https://www.solentrixtraders.com/"
  },
  {
    "id": "web-gainplus",
    "title": "GAIN+ | AI Talent Marketplace Platform",
    "type": "Web",
    "folder": "Web",
    "file": "gainplus.png",
    "src": "/Assets/Thumbnails/gainplus.png?v=2",
    "isVideo": false,
    "size": "wide",
    "url": "http://gainplus.ai/"
  },
  {
    "id": "posters-1",
    "title": "Esports Championship Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "20250104_090803.jpg",
    "src": "/Assets/POSTERS/20250104_090803.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "posters-2",
    "title": "Pro Gaming Showcase Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "20250104_090832.jpg",
    "src": "/Assets/POSTERS/20250104_090832.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-3",
    "title": "Global Tournament Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "20250104_090850.jpg",
    "src": "/Assets/POSTERS/20250104_090850.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-4",
    "title": "Esports World Cup Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "20250104_090915.jpg",
    "src": "/Assets/POSTERS/20250104_090915.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-5",
    "title": "Championship Finalist Graphic",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "20250104_090933.jpg",
    "src": "/Assets/POSTERS/20250104_090933.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-6",
    "title": "Arslan Ash Tournament Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "Arslan ash tournament.jpg",
    "src": "/Assets/POSTERS/Arslan%20ash%20tournament.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "posters-7",
    "title": "TLPH Gaming Roster Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "IMG_6968.JPG",
    "src": "/Assets/POSTERS/IMG_6968.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-8",
    "title": "Esports Spotlight Graphic",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "IMG_6969.JPG",
    "src": "/Assets/POSTERS/IMG_6969.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-9",
    "title": "Championship Key Visual Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "IMG_6970.JPG",
    "src": "/Assets/POSTERS/IMG_6970.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-10",
    "title": "Pro Fighter Showcase Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "IMG_6971.JPG",
    "src": "/Assets/POSTERS/IMG_6971.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "posters-11",
    "title": "Jonn Character Poster",
    "type": "Posters",
    "folder": "POSTERS",
    "file": "jonn.jpg",
    "src": "/Assets/POSTERS/jonn.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "reels-1",
    "title": "4th DLC Wishlist! 🤔🤩Who Do You Want To See As The Final DLC! ⤵️",
    "type": "Reels",
    "folder": "REELS",
    "file": "dlc_wishlist.mp4",
    "src": "/Assets/REELS/dlc_wishlist.mp4",
    "isVideo": true,
    "size": "wide"
  },
  {
    "id": "reels-2",
    "title": "@rog Me AZOTH 96 HE",
    "type": "Reels",
    "folder": "REELS",
    "file": "rog_azoth.mp4",
    "src": "/Assets/REELS/rog_azoth.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-3",
    "title": "Ashes Reel",
    "type": "Reels",
    "folder": "REELS",
    "file": "Ashes reel.mp4",
    "src": "/Assets/REELS/Ashes%20reel.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-4",
    "title": "Danyal Mirza",
    "type": "Reels",
    "folder": "REELS",
    "file": "Danyal_Mirza_2.mp4",
    "src": "/Assets/REELS/Danyal_Mirza_2.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-5",
    "title": "Every Sport Has A LeBron.Esports Has Faker.",
    "type": "Reels",
    "folder": "REELS",
    "file": "faker_lebron.mp4",
    "src": "/Assets/REELS/faker_lebron.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-6",
    "title": "Inter Ferzeen Reel02",
    "type": "Reels",
    "folder": "REELS",
    "file": "inter ferzeen reel02.mp4",
    "src": "/Assets/REELS/inter%20ferzeen%20reel02.mp4",
    "isVideo": true,
    "size": "wide"
  },
  {
    "id": "reels-7",
    "title": "Jon Usama Visa Final01",
    "type": "Reels",
    "folder": "REELS",
    "file": "jon usama visa final01.mp4",
    "src": "/Assets/REELS/jon%20usama%20visa%20final01.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-8",
    "title": "Reel 15",
    "type": "Reels",
    "folder": "REELS",
    "file": "Reel 15.mp4",
    "src": "/Assets/REELS/Reel%2015.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-9",
    "title": "Reel",
    "type": "Reels",
    "folder": "REELS",
    "file": "Reel.mp4",
    "src": "/Assets/REELS/Reel.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-10",
    "title": "Teach Me Jun1",
    "type": "Reels",
    "folder": "REELS",
    "file": "teach me jun1.mp4",
    "src": "/Assets/REELS/teach%20me%20jun1.mp4",
    "isVideo": true,
    "size": "normal"
  },
  {
    "id": "reels-11",
    "title": "Translate",
    "type": "Reels",
    "folder": "REELS",
    "file": "Translate.mp4",
    "src": "/Assets/REELS/Translate.mp4",
    "isVideo": true,
    "size": "wide"
  },
  {
    "id": "thumbnails-1",
    "title": "Visual 09 01 54",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-01-54.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-01-54.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-2",
    "title": "Visual 09 02 08",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-02-08.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-02-08.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-3",
    "title": "Visual 09 02 21",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-02-21.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-02-21.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-4",
    "title": "Visual 09 02 35",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-02-35.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-02-35.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-5",
    "title": "Visual 09 02 55",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-02-55.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-02-55.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-6",
    "title": "Visual 09 03 06",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-03-06.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-03-06.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-7",
    "title": "Visual 09 03 16",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-03-16.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-03-16.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-8",
    "title": "Visual 09 03 30",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-03-30.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-03-30.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-9",
    "title": "Visual 09 03 41",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-03-41.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-03-41.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-10",
    "title": "Visual 09 03 51",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-03-51.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-03-51.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-11",
    "title": "Visual 09 04 07",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-04-07.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-04-07.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-12",
    "title": "Visual 09 04 19",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-04-19.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-04-19.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-13",
    "title": "Visual 09 04 30",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-04-30.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-04-30.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-14",
    "title": "Visual 09 04 43",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-04-43.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-04-43.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-15",
    "title": "Visual 09 05 01",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-05-01.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-05-01.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-16",
    "title": "Visual 09 05 12",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-05-12.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-05-12.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-17",
    "title": "Visual 09 05 21",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-05-21.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-05-21.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-18",
    "title": "Visual 09 05 36",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-05-36.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-05-36.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-19",
    "title": "Visual 09 05 52",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-05-52.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-05-52.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-20",
    "title": "Visual 09 06 04",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "2025-01-04_09-06-04.jpg",
    "src": "/Assets/Thumbnails/2025-01-04_09-06-04.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-21",
    "title": "Arslan 1",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 1.jpg",
    "src": "/Assets/Thumbnails/Arslan%201.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-22",
    "title": "Arslan 2",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 2.jpg",
    "src": "/Assets/Thumbnails/Arslan%202.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-23",
    "title": "Arslan 3",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 3.jpg",
    "src": "/Assets/Thumbnails/Arslan%203.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-24",
    "title": "Arslan 4",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 4.jpg",
    "src": "/Assets/Thumbnails/Arslan%204.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-25",
    "title": "Arslan 5",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 5.jpg",
    "src": "/Assets/Thumbnails/Arslan%205.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-26",
    "title": "Arslan 55",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 55.jpg",
    "src": "/Assets/Thumbnails/Arslan%2055.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-27",
    "title": "Arslan 64",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan 64.jpg",
    "src": "/Assets/Thumbnails/Arslan%2064.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-28",
    "title": "Arslan Podcast",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan podcast.jpg",
    "src": "/Assets/Thumbnails/Arslan%20podcast.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-29",
    "title": "Arslan Pubg",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan pubg.jpg",
    "src": "/Assets/Thumbnails/Arslan%20pubg.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-30",
    "title": "Arslan Rapid Fire",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan rapid fire.jpg",
    "src": "/Assets/Thumbnails/Arslan%20rapid%20fire.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-31",
    "title": "Arslan Tierlist",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan tierlist.jpg",
    "src": "/Assets/Thumbnails/Arslan%20tierlist.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-32",
    "title": "Arslan Tournament",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan tournament.jpg",
    "src": "/Assets/Thumbnails/Arslan%20tournament.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-33",
    "title": "Arslan Vs Abood",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan vs abood.jpg",
    "src": "/Assets/Thumbnails/Arslan%20vs%20abood.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-34",
    "title": "Arslan Vs Knee",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan vs knee.jpg",
    "src": "/Assets/Thumbnails/Arslan%20vs%20knee.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-35",
    "title": "Arslan",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Arslan.jpg",
    "src": "/Assets/Thumbnails/Arslan.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-36",
    "title": "Atif 1",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Atif 1.jpg",
    "src": "/Assets/Thumbnails/Atif%201.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-37",
    "title": "Atif 2",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Atif 2.jpg",
    "src": "/Assets/Thumbnails/Atif%202.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-38",
    "title": "Atif",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Atif.jpg",
    "src": "/Assets/Thumbnails/Atif.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-39",
    "title": "Atif",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "Atif._",
    "src": "/Assets/Thumbnails/Atif._",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-40",
    "title": "IMG 6964",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6964.JPG",
    "src": "/Assets/Thumbnails/IMG_6964.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-41",
    "title": "IMG 6965",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6965.JPG",
    "src": "/Assets/Thumbnails/IMG_6965.JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-42",
    "title": "IMG 6966",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6966.JPG",
    "src": "/Assets/Thumbnails/IMG_6966.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-43",
    "title": "IMG 6967",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6967.JPG",
    "src": "/Assets/Thumbnails/IMG_6967.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-44",
    "title": "IMG 6968",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6968.JPG",
    "src": "/Assets/Thumbnails/IMG_6968.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-45",
    "title": "IMG 6969",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6969.JPG",
    "src": "/Assets/Thumbnails/IMG_6969.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-46",
    "title": "IMG 6972",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6972.JPG",
    "src": "/Assets/Thumbnails/IMG_6972.JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-47",
    "title": "IMG 6973",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6973.JPG",
    "src": "/Assets/Thumbnails/IMG_6973.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-48",
    "title": "IMG 6974",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6974.JPG",
    "src": "/Assets/Thumbnails/IMG_6974.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-49",
    "title": "IMG 6975",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6975(1).JPG",
    "src": "/Assets/Thumbnails/IMG_6975(1).JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-50",
    "title": "IMG 6975",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6975.JPG",
    "src": "/Assets/Thumbnails/IMG_6975.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-51",
    "title": "IMG 6976",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6976(1).JPG",
    "src": "/Assets/Thumbnails/IMG_6976(1).JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-52",
    "title": "IMG 6976",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6976.JPG",
    "src": "/Assets/Thumbnails/IMG_6976.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-53",
    "title": "IMG 6977",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6977.JPG",
    "src": "/Assets/Thumbnails/IMG_6977.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-54",
    "title": "IMG 6978",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6978(1).JPG",
    "src": "/Assets/Thumbnails/IMG_6978(1).JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-55",
    "title": "IMG 6978",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6978.JPG",
    "src": "/Assets/Thumbnails/IMG_6978.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-56",
    "title": "IMG 6979",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6979(1).JPG",
    "src": "/Assets/Thumbnails/IMG_6979(1).JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-57",
    "title": "IMG 6979",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6979.JPG",
    "src": "/Assets/Thumbnails/IMG_6979.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-58",
    "title": "IMG 6980",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6980.JPG",
    "src": "/Assets/Thumbnails/IMG_6980.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-59",
    "title": "IMG 6981",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6981.JPG",
    "src": "/Assets/Thumbnails/IMG_6981.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-60",
    "title": "IMG 6982",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6982.JPG",
    "src": "/Assets/Thumbnails/IMG_6982.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-61",
    "title": "IMG 6983",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6983.JPG",
    "src": "/Assets/Thumbnails/IMG_6983.JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-62",
    "title": "IMG 6984",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6984.JPG",
    "src": "/Assets/Thumbnails/IMG_6984.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-63",
    "title": "IMG 6985",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6985.JPG",
    "src": "/Assets/Thumbnails/IMG_6985.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-64",
    "title": "IMG 6986",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6986.JPG",
    "src": "/Assets/Thumbnails/IMG_6986.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-65",
    "title": "IMG 6987",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6987.JPG",
    "src": "/Assets/Thumbnails/IMG_6987.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-66",
    "title": "IMG 6988",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6988.JPG",
    "src": "/Assets/Thumbnails/IMG_6988.JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-67",
    "title": "IMG 6992",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6992.JPG",
    "src": "/Assets/Thumbnails/IMG_6992.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-68",
    "title": "IMG 6993",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6993.JPG",
    "src": "/Assets/Thumbnails/IMG_6993.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-69",
    "title": "IMG 6994",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6994.JPG",
    "src": "/Assets/Thumbnails/IMG_6994.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-70",
    "title": "IMG 6995",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_6995.JPG",
    "src": "/Assets/Thumbnails/IMG_6995.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-71",
    "title": "IMG 8846",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_8846.JPG",
    "src": "/Assets/Thumbnails/IMG_8846.JPG",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "thumbnails-72",
    "title": "IMG 8847",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_8847.JPG",
    "src": "/Assets/Thumbnails/IMG_8847.JPG",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "thumbnails-73",
    "title": "IMG 8849",
    "type": "Thumbnails",
    "folder": "Thumbnails",
    "file": "IMG_8849.JPG",
    "src": "/Assets/Thumbnails/IMG_8849.JPG",
    "isVideo": false,
    "size": "normal"
  },

  // 4Thrive Apparel & Merch
  {
    "id": "merch-4thrive-1",
    "title": "4Thrive Apparel Design Artboard 10",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 10.png",
    "src": "/Assets/4thrive Merch/Artboard 10.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-2",
    "title": "4Thrive Apparel Design Artboard 11",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 11.png",
    "src": "/Assets/4thrive Merch/Artboard 11.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-3",
    "title": "4Thrive Apparel Design Artboard 14",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 14.png",
    "src": "/Assets/4thrive Merch/Artboard 14.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-4",
    "title": "4Thrive Apparel Design Artboard 19",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 19.png",
    "src": "/Assets/4thrive Merch/Artboard 19.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-5",
    "title": "4Thrive Apparel Design Artboard 21",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 21.png",
    "src": "/Assets/4thrive Merch/Artboard 21.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-6",
    "title": "4Thrive Apparel Design Artboard 8",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 8.png",
    "src": "/Assets/4thrive Merch/Artboard 8.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-7",
    "title": "4Thrive Apparel Design Artboard 9",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 9.png",
    "src": "/Assets/4thrive Merch/Artboard 9.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-8",
    "title": "4Thrive Apparel Design Artboard 4",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "Artboard 4.jpg",
    "src": "/Assets/4thrive Merch/Artboard 4.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "merch-4thrive-9",
    "title": "4Thrive Apparel Design Showcase 3",
    "type": "2D Design",
    "folder": "4thrive Merch",
    "file": "3.jpg",
    "src": "/Assets/4thrive Merch/3.jpg",
    "isVideo": false,
    "size": "normal"
  },

  // TLPH Esports
  {
    "id": "tlph-1",
    "title": "TLPH Esports - Game Day Graphic",
    "type": "Posters",
    "folder": "TLPH Sample",
    "file": "gameday.png",
    "src": "/Assets/TLPH Sample/gameday.png",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "tlph-2",
    "title": "TLPH Esports - MVP Sanford Showcase",
    "type": "Posters",
    "folder": "TLPH Sample",
    "file": "mvp sanford.png",
    "src": "/Assets/TLPH Sample/mvp sanford.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "tlph-3",
    "title": "TLPH Esports - Road To EWC Banner",
    "type": "Posters",
    "folder": "TLPH Sample",
    "file": "road to ewc.png",
    "src": "/Assets/TLPH Sample/road to ewc.png",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "tlph-4",
    "title": "TLPH Esports - Sanji Player Spotlight",
    "type": "Posters",
    "folder": "TLPH Sample",
    "file": "sanji tlph.png",
    "src": "/Assets/TLPH Sample/sanji tlph.png",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "tlph-5",
    "title": "TLPH Esports - Official Team Roster",
    "type": "Posters",
    "folder": "TLPH Sample",
    "file": "tlph roster.png",
    "src": "/Assets/TLPH Sample/tlph roster.png",
    "isVideo": false,
    "size": "wide"
  },

  // Twitch Emotes & Branding Suite
  {
    "id": "twitch-emote-1",
    "title": "Twitch Emote Suite - Character Branding Frame 1",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 1.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 1.jpg",
    "isVideo": false,
    "size": "wide"
  },
  {
    "id": "twitch-emote-2",
    "title": "Twitch Emote Suite - Expression Pack Frame 2",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 2.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 2.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "twitch-emote-3",
    "title": "Twitch Emote Suite - Custom Badges Frame 3",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 3.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 3.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "twitch-emote-4",
    "title": "Twitch Emote Suite - Subscriber Emotes Frame 4",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 4.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 4.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "twitch-emote-5",
    "title": "Twitch Emote Suite - Animated Emotes Frame 5",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 5.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 5.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "twitch-emote-6",
    "title": "Twitch Emote Suite - Hype Badges Frame 6",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 6.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 6.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "twitch-emote-7",
    "title": "Twitch Emote Suite - Channel Points Frame 7",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 7.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 7.jpg",
    "isVideo": false,
    "size": "normal"
  },
  {
    "id": "twitch-emote-8",
    "title": "Twitch Emote Suite - Stream Overlay Frame 8",
    "type": "2D Design",
    "folder": "Twitch emote presentation",
    "file": "Frame 8.jpg",
    "src": "/Assets/Twitch emote presentation/Frame 8.jpg",
    "isVideo": false,
    "size": "normal"
  }
];
