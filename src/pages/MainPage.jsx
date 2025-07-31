import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useState, useEffect} from "react";
import {Card, CardImg, CardText, Carousel} from "react-bootstrap";
import "./MainPage.css";

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
          "https://api.kcisa.kr/openapi/API_CCA_149/request?serviceKey=" +
            import.meta.env.VITE_ART_API_KEY +
            "&numOfRows=6&pageNo=1"
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
      {loading && (
        <div className="mask">
          <img
            className="loadingImg"
            src="https://i.ibb.co/20zw80q/1487.gif"
            alt="Loading..."
          />
          <p className="loadingText">페이지 로딩중...</p>
        </div>
      )}
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
                        color: "white",
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
              perspective: "1100px",
            }}
          >
            {data.map((item, idx) => (
              <Card
                className="bg-dark text-white"
                key={idx}
                style={{
                  height: "400px",
                  width: "300px",
                  marginBottom: "15px",
                  position: "relative",
                  transition: ".4s",
                  transformStyle: "preserve-3d",
                }}
              >
                <Card.Img
                  src={item.IMAGE_OBJECT}
                  alt="Card image"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                  }}
                />
                <Card.ImgOverlay
                  className="card-back"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundImage: `url(${item.IMAGE_OBJECT})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Card.Title
                    style={{
                      position: "relative",
                      zIndex: 2,
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    {item.TITLE}
                  </Card.Title>
                  <Card.Text style={{position: "relative", zIndex: 2}}>
                    기간: {item.PERIOD}
                  </Card.Text>
                  <Card.Text style={{position: "relative", zIndex: 2}}>
                    시간: {item.EVENT_PERIOD}
                  </Card.Text>
                  <Card.Text style={{position: "relative", zIndex: 2}}>
                    <a href={item.URL}>바로가기</a>
                  </Card.Text>
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
