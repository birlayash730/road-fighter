const staticRoadRace = "road-race-site-v1"
const assets = [
  "/",
  "/index.html",
  "/registration.css",
  "/backgrass.png",
  "/car_landing.css",
  "/car-145008_1280.png",
  "/car-145009_960_720.png",
  "/car_race_index.css",
  "/favicon.png",
  "/grass2.jpg",
  "/start.png",
  "/road.jpg",
  "/red.png",
  "/yellow2.png",
  "/car_race_index_single_player.html",
  "/car_race_index.css",
  "/car_race_index.html",
  "/create-area.html",
  "/createjoin.html",
  "/join-area.html",
  "/leaderboard.css",
  "/login.html",
  "/registration.css",
  "/registration.html",
  "/single_double_player.html",
  "/yellowbackground.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticRoadRace).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })