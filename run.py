#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 3000

class StaticFileHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        mimetype, encoding = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript', encoding
        elif path.endswith('.css'):
            return 'text/css', encoding
        elif path.endswith('.html'):
            return 'text/html', encoding
        return mimetype, encoding

print("Starting Electric Home Hub Preview Server...")
print(f"Serving files from: {os.getcwd()}")
print(f"Server will run on port {PORT}")

with socketserver.TCPServer(("0.0.0.0", PORT), StaticFileHandler) as httpd:
    print(f"✅ Server running at http://0.0.0.0:{PORT}")
    print("📱 Your Electric Home Hub is ready for preview!")
    print("\nPress Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")