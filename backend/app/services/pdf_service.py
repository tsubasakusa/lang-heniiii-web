import weasyprint
from typing import Optional


def generate_handout_html(
    analyze_data: dict,
    vocabulary_data: dict,
    grammar_data: dict,
    title: str = "Language Study Handout",
    source_lang: str = "ja",
    target_lang: str = "zh-TW",
    level: str = "N3",
) -> str:
    sentences_html = ""
    for s in analyze_data.get("sentences", []):
        words_html = ""
        for w in s.get("words", []):
            words_html += f'<span class="word-tag">{w.get("word", "")} ({w.get("reading", "")})</span> '
        sentences_html += f"""
        <div class="sentence-block">
            <p class="original">{s.get("original", "")}</p>
            <p class="translation">{s.get("translation", "")}</p>
            {f'<p class="words">{words_html}</p>' if words_html else ''}
        </div>
        """

    vocab_rows = ""
    for w in vocabulary_data.get("words", []):
        vocab_rows += f"""
        <tr>
            <td>{w.get("word", "")}</td>
            <td>{w.get("reading", "")}</td>
            <td>{w.get("pos", "")}</td>
            <td>{w.get("meaning", "")}</td>
            <td>{w.get("level", "")}</td>
            <td>{w.get("example", "")}<br/><small>{w.get("example_translation", "")}</small></td>
        </tr>
        """

    grammar_html = ""
    for g in grammar_data.get("grammar_points", []):
        grammar_html += f"""
        <div class="grammar-block">
            <h3>{g.get("pattern", "")} <span class="level-badge">{g.get("level", "")}</span></h3>
            <p>{g.get("explanation", "")}</p>
            <p class="example">{g.get("example", "")}</p>
            <p class="example-trans">{g.get("example_translation", "")}</p>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="{target_lang}">
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Noto+Sans+JP&display=swap');
        body {{
            font-family: 'Noto Sans TC', 'Noto Sans JP', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
            line-height: 1.6;
        }}
        h1 {{ color: #1a1a2e; border-bottom: 2px solid #16213e; padding-bottom: 10px; }}
        h2 {{ color: #16213e; margin-top: 30px; }}
        .meta {{ color: #666; font-size: 0.9em; margin-bottom: 20px; }}
        .sentence-block {{
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-left: 3px solid #0f3460;
            border-radius: 4px;
        }}
        .original {{ font-size: 1.2em; margin: 0 0 5px 0; }}
        .translation {{ color: #555; margin: 0; }}
        .words {{ margin-top: 8px; }}
        .word-tag {{
            display: inline-block;
            background: #e8eaf6;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.85em;
            margin: 2px;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }}
        th, td {{
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
        }}
        th {{ background: #16213e; color: white; }}
        tr:nth-child(even) {{ background: #f8f9fa; }}
        .grammar-block {{
            background: #fff3e0;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border: 1px solid #ffe0b2;
        }}
        .grammar-block h3 {{ margin-top: 0; color: #e65100; }}
        .level-badge {{
            background: #ff6f00;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.75em;
        }}
        .example {{ font-style: italic; color: #333; }}
        .example-trans {{ color: #666; font-size: 0.9em; }}
        .toggle-answer {{
            cursor: pointer;
            background: #e3f2fd;
            padding: 10px;
            border-radius: 4px;
            margin: 5px 0;
        }}
        .answer {{ display: none; }}
        .answer.show {{ display: block; }}
    </style>
</head>
<body>
    <h1>{title}</h1>
    <div class="meta">Level: {level} | {source_lang} → {target_lang}</div>

    <h2>Sentence Analysis</h2>
    {sentences_html}

    <h2>Vocabulary</h2>
    <table>
        <thead>
            <tr>
                <th>Word</th>
                <th>Reading</th>
                <th>POS</th>
                <th>Meaning</th>
                <th>Level</th>
                <th>Example</th>
            </tr>
        </thead>
        <tbody>
            {vocab_rows}
        </tbody>
    </table>

    <h2>Grammar Points</h2>
    {grammar_html}

    <script>
        document.querySelectorAll('.toggle-answer').forEach(el => {{
            el.addEventListener('click', () => {{
                const answer = el.nextElementSibling;
                if (answer) answer.classList.toggle('show');
            }});
        }});
    </script>
</body>
</html>"""
    return html


def generate_pdf(html_content: str) -> bytes:
    doc = weasyprint.HTML(string=html_content)
    return doc.write_pdf()
