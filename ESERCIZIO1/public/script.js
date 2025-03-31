// Wait for the DOM to be fully loaded

function helloWorld() {
    // Print "hello world" to the console
    console.log("hello world");
}
document.addEventListener('DOMContentLoaded', function() {
    // Set a timeout of 2000 milliseconds (2 seconds)
    setTimeout(function() {
        // Print "hello world" to the console
        helloWorld();
    }, 2000);
});