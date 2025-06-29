#!/usr/bin/env python3
import http.server
import socketserver
import threading
import time
import os

PORT = 3000

class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

def start_server():
    os.chdir('.')
    with socketserver.TCPServer(("0.0.0.0", PORT), PreviewHandler) as httpd:
        print(f"Preview server running on port {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Server stopped")