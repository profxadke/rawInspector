self.addEventListener("fetch", event => {
  request = event.request;

  if (!request.url.split(":")[0].includes("http")) {
    return;
  }; // console.log(request);
  console.log("-".repeat(44));

  path = request.url.split("/").slice(3).join('/');
  console.log(`${request.method} /${path} HTTP/1.1`);

  // workaround to use headers object - since, logging request.headers returns {}
  headers = {};
  request.headers.forEach( (h, i) => {
    console.log(`${i}: ${h}`);
    headers[i] = h;
  });
  // console.log(headers);

  /*
  // This didn't work for some reason. Since, request.bodyUsed returned false.
  console.log(request.bodyUsed);
  if (request.bodyUsed) {
    request.text().then( txt => {
      console.log(txt);
    })
  }
  */

  if ( !["GET", "HEAD"].includes( request.method.toUpperCase() ) ) {
    if (!request.body) {
      return;
    }
    reader = request.body.getReader();
    reader.read().then( o => {
      console.log(new TextDecoder().decode(o.value));
    })
  }

})
