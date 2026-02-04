/**
 * File System Operations - Synchronous vs Asynchronous
 * 
 * This module demonstrates the difference between blocking and non-blocking file operations in Node.js
 * 
 * BLOCKING EXECUTION (Synchronous):
 * - The program pauses and waits for the operation to complete before moving to the next line
 * - Subsequent code cannot execute until the file operation finishes
 * - Simple but can cause performance issues with large files or frequent operations
 * - Methods: writeFileSync(), readFileSync()
 * 
 * NON-BLOCKING EXECUTION (Asynchronous):
 * - The program registers a callback function and continues executing other code immediately
 * - The file operation happens in the background
 * - When the operation completes, the callback function is invoked with results or errors
 * - Better for performance and user experience, especially in server applications
 * - Methods: writeFile(), readFile()
 * 
 * @requires fs - Node.js file system module
 * 
 * @example
 * // Synchronous: blocks until file is written
 * fs.writeFileSync('./example.txt', 'content');
 * console.log('This prints after file is written');
 * 
 * @example
 * // Asynchronous: continues execution while file is being written
 * fs.writeFile('./example.txt', 'content', (err) => {
 *     if (err) throw err;
 *     console.log('File written');
 * });
 * console.log('This prints immediately, before file is written');
 */
const fs = require('fs');

// SYNCHRONOUS WRITE - blocks execution
fs.writeFileSync('./example.txt', 'This is an example file.');
console.log('File written (sync)');

// ASYNCHRONOUS WRITE - non-blocking
fs.writeFile('./example2.txt', 'Updated async content', (err) => {
    if (err) throw err;
    console.log('File written (async)');
});

// SYNCHRONOUS READ - blocks execution
const dataSynced = fs.readFileSync('./example.txt', 'utf8');
console.log('Sync read:', dataSynced);

// ASYNCHRONOUS READ - non-blocking
fs.readFile('./example2.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Async read:', data);
});

console.log('File created successfully.');

// APPEND SYNCHRONOUSLY - blocks execution
fs.appendFileSync('./example.txt', '\nAppended content synchronously.');
console.log('File appended (sync)');

// APPEND ASYNCHRONOUSLY - non-blocking
fs.appendFile('./example2.txt', '\nAppended content asynchronously.', (err) => {
    if (err) throw err;
    console.log('File appended (async)');
});
