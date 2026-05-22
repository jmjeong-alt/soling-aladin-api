export default async function handler(req, res) {
  // 1. 사용자가 보낸 검색어 받기
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: '검색어가 필요해요' });
  }

  // 2. 알라딘 API 주소 만들기 (TTBKey는 환경변수에서 가져옴)
  const TTB_KEY = process.env.ALADIN_TTB_KEY;
  const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${TTB_KEY}&Query=${encodeURIComponent(query)}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;

  try {
    // 3. 알라딘에 요청 보내고 결과 받기
    const response = await fetch(url);
    const data = await response.json();

    // 4. CORS 허용 (Claude 아티팩트에서 부를 수 있게)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '알라딘 API 호출 실패' });
  }
}
