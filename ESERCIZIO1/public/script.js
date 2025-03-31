// Script that logs "hello world" to the console after DOM is loaded with a 2000ms delay
function helloWorld() {
    console.log('hello world');
}

document.addEventListener('DOMContentLoaded', function() {
    helloWorld();
    }, 2000);
