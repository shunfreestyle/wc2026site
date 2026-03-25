#!/usr/bin/env python3
"""
Jリーグデータ取得サーバー
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime

BASE_URL = "https://www.jleague.jp"
HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
ICON_MAP = {'ion-ios-football': 'goal', 'yellow': 'yellow', 'red': 'red'}

def fetch_standings(league='j1', top_n=20):
    url = f"{BASE_URL}/standings/" if league == 'j1' else f"{BASE_URL}/standings/{league}/"
    res = requests.get(url, headers=HEADERS, timeout=10)
    res.encoding = res.apparent_encoding
    soup = BeautifulSoup(res.text, 'html.parser')
    teams = []
    for table in soup.find_all('table', class_='tablesorter'):
        for row in table.find('tbody').find_all('tr'):
            cols = row.find_all('td')
            if len(cols) < 12:
                continue
            span = cols[2].find('span')
            team = span.text.strip() if span else cols[2].text.strip()
            teams.append({
                'rank': cols[1].text.strip(),
                'team': team,
                'pts': cols[3].text.strip(),
                'played': cols[4].text.strip(),
                'wins': cols[5].text.strip(),
                'draws': cols[6].text.strip() if len(cols) > 6 else '-',
                'losses': cols[8].text.strip(),
                'gf': cols[9].text.strip(),
                'ga': cols[10].text.strip(),
                'gd': cols[11].text.strip(),
            })
    return teams[:top_n]

def get_latest_section(league='j1'):
    res = requests.get(f"{BASE_URL}/match/{league}/", headers=HEADERS, timeout=10)
    res.encoding = res.apparent_encoding
    soup = BeautifulSoup(res.text, 'html.parser')
    sections = []
    for a in soup.find_all('a', href=True):
        m = re.search(rf'/match/section/{league}/(\d+)/', a['href'])
        if m:
            sections.append(int(m.group(1)))
    return max(sections) if sections else None

def get_section_matches(section_num, league='j1'):
    url = f"{BASE_URL}/match/section/{league}/{section_num}/"
    res = requests.get(url, headers=HEADERS, timeout=10)
    res.encoding = res.apparent_encoding
    soup = BeautifulSoup(res.text, 'html.parser')
    matches = []
    seen_ids = set()
    for table in soup.find_all('table', class_='matchTable'):
        for row in table.find_all('tr'):
            match_id = None
            for a in row.find_all('a', href=True):
                m = re.search(rf'/match/{league}/\d+/(\d+)/live/', a['href'])
                if m:
                    match_id = m.group(1)
                    break
            if not match_id or match_id in seen_ids:
                continue
            seen_ids.add(match_id)
            gt = row.find('table', class_='gameTable')
            if not gt:
                continue
            tds = gt.find_all('td')
            home_a = tds[0].find('a') if len(tds) > 0 else None
            away_a = tds[4].find('a') if len(tds) > 4 else None
            home = home_a.text.strip() if home_a else ''
            away = away_a.text.strip() if away_a else ''
            home_score = tds[1].text.strip() if len(tds) > 1 else '-'
            away_score = tds[3].text.strip() if len(tds) > 3 else '-'
            status_el = row.find('span', class_='off')
            status = status_el.text.strip() if status_el else '未定'
            stadium_td = row.find('td', class_='stadium')
            kickoff, stadium = '', ''
            if stadium_td:
                raw = stadium_td.text.strip()
                km = re.search(r'\d+:\d+', raw)
                kickoff = km.group(0) if km else ''
                stad_a = stadium_td.find('a')
                stadium = stad_a.text.strip() if stad_a else re.sub(r'\d+:\d+', '', raw).strip()
            matches.append({
                'id': match_id, 'league': league,
                'home': home, 'away': away,
                'home_score': home_score, 'away_score': away_score,
                'status': status, 'kickoff': kickoff, 'stadium': stadium,
            })
    return matches

def get_match_detail(match):
    url = f"{BASE_URL}/match/{match['league']}/2026/{match['id']}/live/"
    res = requests.get(url, headers=HEADERS, timeout=10)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, 'html.parser')
    teams = soup.find_all(class_='leagAccTeam')
    def get_team_name(el):
        texts = [t.strip() for t in el.strings if t.strip()]
        return texts[-1] if texts else ''
    home_full = get_team_name(teams[0]) if len(teams) > 0 else match['home']
    away_full = get_team_name(teams[1]) if len(teams) > 1 else match['away']
    scorers_home, scorers_away = [], []
    home_el = soup.find(class_='gameInfo__Member__home')
    away_el = soup.find(class_='gameInfo__Member__away')
    def parse_scorers(el):
        if not el: return []
        result = []
        for m in re.finditer(r"(\d+)'([^'\d]+?)(?=\d+'|$)", el.text.strip()):
            result.append({'time': m.group(1), 'player': m.group(2).strip()})
        return result
    scorers_home = parse_scorers(home_el)
    scorers_away = parse_scorers(away_el)
    timeline = []
    table = soup.find('table', class_='goalTimeLine__table')
    if table:
        for row in table.find_all('tr'):
            time_el = row.find('th', class_='time')
            time_str = time_el.text.strip() if time_el else ''
            for side in ['home', 'away']:
                td = row.find('td', class_=lambda c: c and side in c.split() and 'noPlay' not in c.split() if c else False)
                if not td: continue
                for a in td.find_all('a'):
                    icon_el = a.find('i')
                    icon_classes = ' '.join(icon_el.get('class', [])) if icon_el else ''
                    event_type = next((v for k, v in ICON_MAP.items() if k in icon_classes), 'sub')
                    action = icon_el.text.strip() if icon_el and icon_el.text.strip() in ['OUT', 'IN'] else ''
                    player = a.text.strip().replace(action, '').strip()
                    timeline.append({'time': time_str, 'side': side, 'type': event_type, 'action': action, 'player': player})
    return {'home_full': home_full, 'away_full': away_full,
            'scorers_home': scorers_home, 'scorers_away': scorers_away, 'timeline': timeline}

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args): pass

    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            with open('index.html', 'rb') as f:
                self.wfile.write(f.read())
        elif self.path.startswith('/api/'):
            self.handle_api()
        else:
            self.send_response(404)
            self.end_headers()

    def handle_api(self):
        try:
            params = {}
            path = self.path[5:]
            if '?' in path:
                path, qs = path.split('?', 1)
                for part in qs.split('&'):
                    if '=' in part:
                        k, v = part.split('=', 1)
                        params[k] = v

            league = params.get('league', 'j1')
            data = {}

            if path == 'standings':
                data = {'standings': fetch_standings(league)}
            elif path == 'matches':
                section = params.get('section')
                if not section:
                    section = get_latest_section(league)
                else:
                    section = int(section)
                matches = get_section_matches(section, league)
                data = {'section': section, 'matches': matches}
            elif path == 'match_detail':
                match_id = params.get('id')
                match = {'id': match_id, 'league': league}
                data = get_match_detail(match)
            elif path == 'all':
                section = get_latest_section(league)
                standings = fetch_standings(league)
                matches = get_section_matches(section, league)
                details = []
                for m in matches:
                    d = get_match_detail(m)
                    details.append({**m, 'detail': d})
                data = {'section': section, 'standings': standings, 'matches': details, 'updated': datetime.now().strftime('%Y/%m/%d %H:%M')}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 8765), Handler)
    print('✅ サーバー起動: http://localhost:8765')
    server.serve_forever()
