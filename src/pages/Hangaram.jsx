import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useState, useEffect} from "react";
import {Card, Carousel} from "react-bootstrap";
import "./MainPage.css";

function Hangaram() {
  const [index, setIndex] = useState(0);
  const [carouselData, setCarouselData] = useState([]); // 캐러셀용
  const [cardData, setCardData] = useState([]); // 카드리스트용
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // 1페이지 데이터만 캐러셀/카드 모두에 사용
  useEffect(() => {
    fetchFirstPage();
  }, []);

  const fetchFirstPage = async () => {
    try {
      const res = await axios(
        "https://api.kcisa.kr/openapi/API_CCA_149/request?serviceKey=" +
          import.meta.env.VITE_ART_API_KEY +
          `&numOfRows=6&pageNo=1`
      );
      const items = res.data.response.body.items.item;
      setCarouselData(items); // 캐러셀은 1페이지 데이터만
      setCardData(items); // 카드리스트는 누적
      setLoading(false);
    } catch (error) {
      setError("API 호출 실패: " + error.message);
      setLoading(false);
    }
  };

  // 더보기: 카드리스트만 추가
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const res = await axios(
        "https://api.kcisa.kr/openapi/API_CCA_149/request?serviceKey=" +
          import.meta.env.VITE_ART_API_KEY +
          `&numOfRows=6&pageNo=${nextPage}`
      );
      const items = res.data.response.body.items.item;
      setCardData((prev) => [...prev, ...items]);
    } catch (error) {
      setError("API 호출 실패: " + error.message);
    }
  };

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
      {cardData.length > 0 ? (
        <main>
          <section className="imgslide">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {carouselData.map((item, idx) => (
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
            {cardData.map((item, idx) => (
              <Card
                className="bg-dark text-white"
                key={item.LOCAL_ID || idx}
                style={{
                  height: "400px",
                  width: "300px",
                  marginBottom: "15px",
                  position: "relative",
                  transition: ".4s",
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
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
          <div style={{textAlign: "center", margin: "30px 0"}}>
            <button onClick={handleLoadMore} className="btn btn-primary">
              더보기
            </button>
          </div>
        </main>
      ) : (
        !loading && <div>데이터가 없습니다.</div>
      )}
    </>
  );
}

export default Hangaram;
