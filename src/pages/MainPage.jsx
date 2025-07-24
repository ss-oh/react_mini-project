import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useState, useEffect} from "react";
import {Card, CardImg, CardText, Carousel} from "react-bootstrap";

function MainPage() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]); // API 데이터를 저장할 상태
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 페이지 로딩 시 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(
          // 환경 변수 사용 권장: import.meta.env.VITE_API_KEY
          "https://api.kcisa.kr/openapi/API_CCA_149/request?serviceKey=9fe7ab3c-b871-45f3-beb9-c907d3a79140&numOfRows=5&pageNo=4"
        );
        setData(res.data.response.body.items.item); // item 배열 저장
        console.log("API 응답:", res.data.response.body.items.item);
        setLoading(false);
      } catch (error) {
        setError("API 호출 실패: " + error.message);
        console.error("API 호출 실패:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {loading && <div>로딩 중...</div>}
      {error && <div style={{color: "red"}}>{error}</div>}
      {data.length > 0 ? (
        <main>
          <section className="imgslide">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {data.map((item, idx) => (
                <Carousel.Item key={item.LOCAL_ID || idx}>
                  <img
                    className="d-block w-100"
                    src={item.IMAGE_OBJECT}
                    alt={item.TITLE}
                    style={{
                      height: "100vh",
                      objectFit: "cover",
                      position: "relative",
                    }}
                  />
                  <Carousel.Caption
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      padding: "40px",
                      background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 90%)",
                      boxShadow: "inset 0 -10px 20px rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      textAlign: "right",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "2rem",
                        fontWeight: "900",
                      }}
                    >
                      {item.TITLE}
                    </h3>
                    <p>
                      <br />
                      기간: {item.PERIOD}
                      <br />
                      시간: {item.EVENT_PERIOD}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>
          <div
            className="warp"
            style={{
              padding: "30px 0px",
              width: "98%",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {data.map((item, idx) => (
              <Card
                className="bg-dark text-white"
                key={idx}
                style={{height: "400px", width: "300px", marginBottom: "15px"}}
              >
                <Card.Img src={item.IMAGE_OBJECT} alt="Card image" />
                <Card.ImgOverlay>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                  <Card.Text>Last updated 3 mins ago</Card.Text>
                </Card.ImgOverlay>
              </Card>
            ))}
          </div>
        </main>
      ) : (
        !loading && <div>데이터가 없습니다.</div>
      )}
    </>
  );
}

export default MainPage;
