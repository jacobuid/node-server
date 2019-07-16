const url = require('url');

const myUrl = new URL('http://www.website.com:8080/hello-world.html?id=100&status=active');

// Serialized URL
console.log('url: ', myUrl.href)
console.log('url(toString): ', myUrl.href.toString());

// Protocol Name
console.log('protocol: ', myUrl.protocol)

// Host Name
console.log('host: ', myUrl.host)

// Host Name
console.log('hostname: ', myUrl.hostname)

// Port Name
console.log('port: ', myUrl.port)

// Path Name
console.log('path: ', myUrl.pathname)

// Path Name
console.log('search: ', myUrl.search)

// Path Name
console.log('search params: ', myUrl.searchParams)

// Add param
myUrl.searchParams.append('abc', '123');
console.log('modified search: ', myUrl.search)
console.log('modified search params: ', myUrl.searchParams)

console.log('\n\n***********************************\n\n')
