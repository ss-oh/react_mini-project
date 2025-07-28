import {useState} from "react";

function Hangaram() {
  const [selectedUrl, setSelectedUrl] = useState(null);

  const sampleItems = [
    {
      title: "기업형절지도",
      url: "https://www.mmca.go.kr/collections/collectionsDetailPage.do?museumId=8wrkinfoSeong&artistNm=변성규&wrkMnNo=08447",
    },
    // 다른 항목 추가 가능
  ];

  return (
    <div>
      <h1>자원 목록</h1>
      <ul>
        {sampleItems.map((item, idx) => (
          <li key={idx}>
            <button onClick={() => setSelectedUrl(item.url)}>
              {item.title} 이미지 보기
            </button>
          </li>
        ))}
      </ul>

      {selectedUrl && (
        <div style={{marginTop: "20px"}}>
          <h2>페이지 미리보기</h2>
          <iframe
            src={selectedUrl}
            width="100%"
            height="600"
            style={{border: "1px solid #ccc"}}
            title="자원 미리보기"
          />
        </div>
      )}
    </div>
  );
}

export default Hangaram;
