#!/usr/bin/env node

/**
 * Test script for MCP server
 * Tests the generate_website tool with sample data
 */

const { spawn } = require('child_process');
const path = require('path');

// Sample test data
const testData = {
  business_name: "Kopi Kiro",
  business_type: "coffee shop",
  tagline: "Your Daily Brew",
  short_description: "Artisan coffee shop serving the finest Indonesian beans",
  contact_whatsapp: "628123456789",
  instagram_handle: "kopikiro",
  menu_items: [
    { name: "Espresso", price: "Rp 25,000" },
    { name: "Cappuccino", price: "Rp 30,000" },
    { name: "Latte", price: "Rp 32,000" }
  ],
  theme_choice: "classic"
};

console.log('Testing MCP Server...\n');

// Start the MCP server
const serverPath = path.join(__dirname, 'website-generator-server.js');
const server = spawn('node', [serverPath]);

let responseBuffer = '';

server.stdout.on('data', (data) => {
  responseBuffer += data.toString();
  
  // Try to parse complete JSON responses
  const lines = responseBuffer.split('\n');
  responseBuffer = lines.pop(); // Keep incomplete line in buffer
  
  lines.forEach(line => {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log('Response:', JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('Raw output:', line);
      }
    }
  });
});

server.stderr.on('data', (data) => {
  console.error('Server error:', data.toString());
});

// Send initialize request
setTimeout(() => {
  console.log('Sending initialize request...');
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  }) + '\n');
}, 100);

// List tools
setTimeout(() => {
  console.log('\nSending tools/list request...');
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list'
  }) + '\n');
}, 500);

// Call generate_website tool
setTimeout(() => {
  console.log('\nSending generate_website request...');
  server.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'generate_website',
      arguments: testData
    }
  }) + '\n');
}, 1000);

// Cleanup after test
setTimeout(() => {
  console.log('\nTest complete. Shutting down server...');
  server.kill();
  process.exit(0);
}, 3000);
