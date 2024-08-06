self.addEventListener('sync', function (event) {
  if (event.tag === 'workbox-background-sync:todo-api-background-sync') {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        console.log('🚀 ~ clients.forEach ~ client:', client);
        client.postMessage({ type: 'RELOAD_PAGE' });
      });
    });
  }
});
