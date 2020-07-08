importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');


if (workbox) {
    console.log(`Workbox berhasil dimuat`);

} else {
    console.log(`Workbox gagal dimuat`);
}


///Precaching App Shell
workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '1'
    },
    {
        url: '/nav.html',
        revision: '1'
    },
    {
        url: '/index.html',
        revision: '1'
    },
    {
        url: '/article.html',
        revision: '1'
    }
    ,
    { 
        url: '/manifest.json',
        revision: '1'
    },
    {
        url: '/push.js',
        revision: '1'
    },
    {
        url: '/pages/home.html',
        revision: '1'
    },
    {
        url: '/pages/saved.html',
        revision: '1'
    },
    {
        url: '/pages/standings.html',
        revision: '1'
    },
    {
        url: '/css/materialize.min.css',
        revision: '1'
    },
    {
        url: '/css/style.css',
        revision: '1'
    },
    {
        url: '/js/materialize.min.js',
        revision: '1'
    },
    {
        url: '/js/nav.js',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/db.js',
        revision: '1'
    },
    {
        url: '/js/idb.js',
        revision: '1'
    },
    {
        url: '/js/api.js',
        revision: '1'
    },
    {
        url: '/js/script.js',
        revision: '1'
    },
    {
        url: '/js/regis.js',
        revision: '1'
    },
    {
        url: '/js/article.js',
        revision: '1'
    },
    {
        url: '/js/notif.js',
        revision: '1'
    },
    {
        url: '/icons/icon-72x72.png',
        revision: '1'
    },
    {
        url: '/icons/icon-96x96.png',
        revision: '1'
    },
    {
        url: '/icons/icon-128x128.png',
        revision: '1'
    },
    {
        url: '/icons/icon-144x144.png',
        revision: '1'
    },
    {
        url: '/icons/icon-152x152.png',
        revision: '1'
    },
    {
        url: '/icons/icon-192x192.png',
        revision: '1'
    },
    {
        url: '/icons/icon-384x384.png',
        revision: '1'
    },
     {
        url: '/icons/icon-512x512.png',
        revision: '1'
    }
  
], {
    // Ignore all URL parameters.
    ignoreURLParametersMatching: [/.*/]
  });

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
})
  );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'resource',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);



//Response Push Notification
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'image/notif.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

