import json
from http.server import BaseHTTPRequestHandler
import urllib.parse

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        query = urllib.parse.parse_qs(parsed_path.query)

        action = query.get('action', ['verse'])[0]
        book = query.get('book', [None])[0]
        book_id = query.get('bookId', [None])[0]
        chapter = query.get('chapter', [None])[0]
        verse = query.get('verse', [None])[0]

        try:
            with open('../frontend/src/data/bible.json', 'r', encoding='utf-8') as f:
                bible_data = json.load(f)
        except FileNotFoundError:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Bible data file not found.'}).encode('utf-8'))
            return
        except json.JSONDecodeError:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Error decoding Bible data file.'}).encode('utf-8'))
            return

        # 책 목록 반환
        if action == 'books':
            books_list = [{
                'id': b['id'],
                'name': b['name'],
                'name_en': b['name_en'],
                'testament': b['testament'],
                'chapters': len(b['chapters'])
            } for b in bible_data['books']]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'version': bible_data['version'],
                'version_en': bible_data.get('version_en', ''),
                'copyright': bible_data.get('copyright', ''),
                'books': books_list
            }).encode('utf-8'))
            return

        # 책 찾기 (이름 또는 ID로)
        book_data = None
        if book_id:
            book_data = next((b for b in bible_data['books'] if b['id'] == book_id), None)
        elif book:
            book_data = next((b for b in bible_data['books'] if b['name'] == book or b['name_en'].lower() == book.lower()), None)

        if not book_data:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'Book not found: {book or book_id}'}).encode('utf-8'))
            return

        # 장 전체 반환
        if action == 'chapter':
            if not chapter:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Missing chapter parameter'}).encode('utf-8'))
                return

            chapter_data = next((c for c in book_data['chapters'] if c['chapter'] == int(chapter)), None)

            if not chapter_data:
                self.send_response(404)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': f'Chapter not found: {chapter}'}).encode('utf-8'))
                return

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'book': {
                    'id': book_data['id'],
                    'name': book_data['name'],
                    'name_en': book_data['name_en'],
                    'testament': book_data['testament'],
                    'totalChapters': len(book_data['chapters'])
                },
                'chapter': chapter_data['chapter'],
                'verses': chapter_data['verses'],
                'totalVerses': len(chapter_data['verses'])
            }).encode('utf-8'))
            return

        # 단일 절 반환 (기본 동작)
        if not all([chapter, verse]):
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Missing required query parameters: book/bookId, chapter, verse'}).encode('utf-8'))
            return

        chapter_data = next((c for c in book_data['chapters'] if c['chapter'] == int(chapter)), None)

        if not chapter_data:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'Chapter not found: {chapter}'}).encode('utf-8'))
            return

        verse_data = next((v for v in chapter_data['verses'] if v['verse'] == int(verse)), None)

        if not verse_data:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': f'Verse not found: {verse}'}).encode('utf-8'))
            return

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({
            'book': {
                'id': book_data['id'],
                'name': book_data['name'],
                'name_en': book_data['name_en']
            },
            'chapter': int(chapter),
            'verse': verse_data
        }).encode('utf-8'))
        return
