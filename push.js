const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJHsjq8iyjF-GxnFsZOdx3XRyrmunkOas-ZLSYAzPSGvaQ5IA-8CLoATPcBesW52b92nrBtTZmBjqyRbSpVPEKc",
   "privateKey": "jNXiqh4bdLb2EEvPWDVHZmp0EM1dQi3QV3lJ3glBasA"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fE2X3_R5NyE:APA91bH0gb7CXTOZB2r7HiNrsuWlT57Gl1cts7aTgGrq-7MXMHhUN-SC0dsTA0miCCIW17SEg2f7PaHY3mI6zYt6q_q2sYx814_UUvMc515LlG84guH7SNR689XgHi_cYSSnIbJ4DYVr",
   "keys": {
       "p256dh": "BKYVzfb6BZxbonaKbFRqM4HJ0b0M609gl1AKZLJG1LfAMyDcFto7CVucGz9xraeFCD9dVzwBcQC1C1cz1g6ZV7c=",
       "auth": "ulJo1oiZGv/AuphmrYztTw=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '95468702959',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);