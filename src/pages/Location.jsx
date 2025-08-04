import {useEffect, useState} from "react";
import "./Location.css"; // 스타일 파일 추가
import {Tab, Tabs} from "react-bootstrap";
const {kakao} = window; // 전역 kakao 객체 사용

function Location() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [map, setMap] = useState(null); // 지도 객체 저장
  const [activeButton, setActiveButton] = useState("currentLocation"); // 초기 활성화: 예술의전당

  useEffect(() => {
    // 지도를 표시할 div
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.479147, 127.011717), // 예술의전당 좌표로 설정
      level: 3, // 지도의 확대 레벨
      scrollwheel: false,
    };
    const kakaoMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(kakaoMap); // 지도 객체 저장

    // 명시적으로 초기 중심을 예술의전당으로 설정
    kakaoMap.setCenter(new kakao.maps.LatLng(37.479147, 127.011717));

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLat(lat);
          setLng(lon);

          const locPosition = new kakao.maps.LatLng(lat, lon);
          const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
          displayMarker(locPosition, message);
        },
        (error) => {
          console.error("Geolocation error:", error);
          const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
          const message = "geolocation을 사용할 수 없어요..";
          setLat(33.450701);
          setLng(126.570667);
          displayMarker(locPosition, message);
        }
      );
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = "geolocation을 사용할 수 없어요..";
      setLat(33.450701);
      setLng(126.570667);
      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: locPosition,
      });

      const iwContent = message;
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(kakaoMap, marker);

      kakaoMap.setCenter(new kakao.maps.LatLng(37.479147, 127.011717));
    }

    // 3개의 마커와 텍스트를 위한 배열
    const markers = [
      {
        position: new kakao.maps.LatLng(37.47933796037272, 127.0139231512912),
        text: "예술의전당",
      },
      {
        position: new kakao.maps.LatLng(37.47992374784796, 127.0127587485928),
        text: "한가람미술관",
      },
      {
        position: new kakao.maps.LatLng(37.479207549880535, 127.01175240814149),
        text: "콘서트홀",
      },
    ];

    // 마커와 CustomOverlay 객체를 저장할 배열
    const markerObjects = [];
    const overlayObjects = [];

    // 마커와 CustomOverlay 생성
    markers.forEach((markerData) => {
      const marker = new kakao.maps.Marker({
        position: markerData.position,
      });
      const customOverlay = new kakao.maps.CustomOverlay({
        position: markerData.position,
        content: `<div style="background:white;padding:5px;border:1px solid black;border-radius:3px;">${markerData.text}</div>`,
        yAnchor: -0.1,
      });

      marker.setMap(kakaoMap);
      customOverlay.setMap(kakaoMap);

      markerObjects.push(marker);
      overlayObjects.push(customOverlay);
    });

    // 중심 변경 이벤트 리스너
    kakao.maps.event.addListener(kakaoMap, "center_changed", function () {
      const level = kakaoMap.getLevel();
      const latlng = kakaoMap.getCenter();
      const message = `<p>지도 레벨은 ${level} 이고</p><p>중심 좌표는 위도 ${latlng.getLat()}, 경도 ${latlng.getLng()}입니다</p>`;
      document.getElementById("result").innerHTML = message;
    });

    // 다각형 데이터
    const areas = [
      {
        name: "예술의전당",
        path: [
          new kakao.maps.LatLng(37.47958581463431, 127.01325615007072),
          new kakao.maps.LatLng(37.47944166137885, 127.01318263649556),
          new kakao.maps.LatLng(37.47925695384987, 127.01318825696576),
          new kakao.maps.LatLng(37.4791127854074, 127.01325041360394),
          new kakao.maps.LatLng(37.478977615513735, 127.01341432373884),
          new kakao.maps.LatLng(37.4789055134422, 127.01360085625942),
          new kakao.maps.LatLng(37.47888747690363, 127.01374217523615),
          new kakao.maps.LatLng(37.478707266465506, 127.0138156296269),
          new kakao.maps.LatLng(37.47872077099562, 127.01390607814938),
          new kakao.maps.LatLng(37.47863516843998, 127.01396259099495),
          new kakao.maps.LatLng(37.47866667818826, 127.01417740603888),
          new kakao.maps.LatLng(37.47883333204825, 127.01444877603915),
          new kakao.maps.LatLng(37.47904054333141, 127.014618402976),
          new kakao.maps.LatLng(37.479261281491084, 127.01469193390979),
          new kakao.maps.LatLng(37.479292810478206, 127.01474281636578),
          new kakao.maps.LatLng(37.479382915630914, 127.01470891650503),
          new kakao.maps.LatLng(37.47942794983601, 127.01483894273437),
          new kakao.maps.LatLng(37.479531570860786, 127.0147993926563),
          new kakao.maps.LatLng(37.47955858834872, 127.01490115091129),
          new kakao.maps.LatLng(37.479869456377635, 127.0147429296552),
          new kakao.maps.LatLng(37.47983119252698, 127.0145083242599),
          new kakao.maps.LatLng(37.47991454245766, 127.0144546371864),
          new kakao.maps.LatLng(37.48003170924416, 127.0141607050027),
          new kakao.maps.LatLng(37.47994161002124, 127.0141465555772),
          new kakao.maps.LatLng(37.47981102155077, 127.01365472349151),
          new kakao.maps.LatLng(37.47985157738212, 127.01356428347195),
          new kakao.maps.LatLng(37.47982455648818, 127.01348231066166),
          new kakao.maps.LatLng(37.479765992180376, 127.01347099422762),
          new kakao.maps.LatLng(37.479707437499854, 127.01337488353907),
          new kakao.maps.LatLng(37.479644376423316, 127.0132900780968),
          new kakao.maps.LatLng(37.47958356274534, 127.01325049673068),
          new kakao.maps.LatLng(37.47958581463431, 127.01325615007072),
        ],
      },
      {
        name: "한가람미술관",
        path: [
          new kakao.maps.LatLng(37.48001163682945, 127.01237718775629),
          new kakao.maps.LatLng(37.47997784720809, 127.01239414109894),
          new kakao.maps.LatLng(37.479957579532396, 127.0123460875026),
          new kakao.maps.LatLng(37.47991703175475, 127.01236869270103),
          new kakao.maps.LatLng(37.47990577416028, 127.01232064062987),
          new kakao.maps.LatLng(37.479820174746166, 127.01235454433625),
          new kakao.maps.LatLng(37.47963090605655, 127.01288589008415),
          new kakao.maps.LatLng(37.479666935284214, 127.01298764934484),
          new kakao.maps.LatLng(37.47981560893019, 127.0129170126919),
          new kakao.maps.LatLng(37.47984262990134, 127.01300746511924),
          new kakao.maps.LatLng(37.479921471312714, 127.01297921394692),
          new kakao.maps.LatLng(37.47996650678986, 127.0131148930431),
          new kakao.maps.LatLng(37.480040843805455, 127.01308098817478),
          new kakao.maps.LatLng(37.48005660739192, 127.01311773527902),
          new kakao.maps.LatLng(37.48009264807163, 127.01311491508898),
          new kakao.maps.LatLng(37.480110662596346, 127.01316579507517),
          new kakao.maps.LatLng(37.48020076791266, 127.01312623996286),
          new kakao.maps.LatLng(37.48017374421794, 127.01306687887516),
          new kakao.maps.LatLng(37.4802075342468, 127.01304709929666),
          new kakao.maps.LatLng(37.48001163682945, 127.01237718775629),
        ],
      },
      {
        name: "콘서트홀",
        path: [
          new kakao.maps.LatLng(37.47929321551734, 127.01102884774599),
          new kakao.maps.LatLng(37.478811153674734, 127.01126054514677),
          new kakao.maps.LatLng(37.4787795896913, 127.0115573167004),
          new kakao.maps.LatLng(37.478820101164644, 127.0118993224676),
          new kakao.maps.LatLng(37.478883151438026, 127.01210001004284),
          new kakao.maps.LatLng(37.478991253012296, 127.01228939954451),
          new kakao.maps.LatLng(37.47907909019999, 127.01239681911025),
          new kakao.maps.LatLng(37.4791939575673, 127.01250424343145),
          new kakao.maps.LatLng(37.479329114927474, 127.0124477367216),
          new kakao.maps.LatLng(37.47935388551627, 127.01251557593007),
          new kakao.maps.LatLng(37.479439486773565, 127.01246471382396),
          new kakao.maps.LatLng(37.47942597847499, 127.0123997028806),
          new kakao.maps.LatLng(37.479511578203514, 127.01236297293535),
          new kakao.maps.LatLng(37.47953184290162, 127.01243929094197),
          new kakao.maps.LatLng(37.4795971687461, 127.0124138635259),
          new kakao.maps.LatLng(37.47958141055278, 127.01232341384537),
          new kakao.maps.LatLng(37.479673768999604, 127.01227537894553),
          new kakao.maps.LatLng(37.47954316679891, 127.01184290773053),
          new kakao.maps.LatLng(37.479545430599984, 127.01172984929978),
          new kakao.maps.LatLng(37.479527419359776, 127.01163939947571),
          new kakao.maps.LatLng(37.4795026474379, 127.01158003980358),
          new kakao.maps.LatLng(37.479493639835866, 127.01155460020382),
          new kakao.maps.LatLng(37.47944409176558, 127.01147827799578),
          new kakao.maps.LatLng(37.47929321551734, 127.01102884774599),
        ],
      },
    ];

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({zIndex: 1});

    // 다각형 생성 및 이벤트 등록
    function displayArea(area) {
      const polygon = new kakao.maps.Polygon({
        map: kakaoMap,
        path: area.path,
        strokeWeight: 2,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });

      const polygonOverlay = new kakao.maps.CustomOverlay({});

      kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
        polygon.setOptions({fillColor: "#09f"});
        polygonOverlay.setContent(`<div class="area">${area.name}</div>`);
        polygonOverlay.setPosition(mouseEvent.latLng);
        polygonOverlay.setMap(kakaoMap);
      });

      kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
        polygonOverlay.setPosition(mouseEvent.latLng);
      });

      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({fillColor: "#fff"});
        polygonOverlay.setMap(null);
      });

      kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
        const content = `
          <div class="info">
            <div class="title">${area.name}</div>
            <div class="size">총 면적 : 약 ${Math.floor(
              polygon.getArea()
            )} m<sup>2</sup></div>
          </div>`;
        infowindow.setContent(content);
        infowindow.setPosition(mouseEvent.latLng);
        infowindow.setMap(kakaoMap);
      });
    }

    // 다각형 표시
    areas.forEach((area) => displayArea(area));

    // 지도 컨트롤 추가
    const mapTypeControl = new kakao.maps.MapTypeControl();
    kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const moveToCurrentLocation = () => {
    if (map && lat && lng) {
      map.setCenter(new kakao.maps.LatLng(lat, lng));
      setActiveButton("currentLocation");
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  };

  const moveToArtsCenter = () => {
    if (map) {
      map.setCenter(
        new kakao.maps.LatLng(37.47933796037272, 127.0139231512912)
      );
      setActiveButton("artsCenter");
    }
  };

  return (
    <main style={{paddingTop: "60px"}}>
      <h3>오시는 길</h3>
      <div id="location-wrap">
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab
            eventKey="home"
            title="대중교통 이용안내"
            className="location-tab"
          >
            <dl className="subwaylist">
              <dt>
                <h3 className="dt-title">지하철</h3>
              </dt>
              <dd>
                <div className="subway-box">
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="pink-txt">• 3호선</p>
                    </div>
                    <div className="right-box">
                      <p className="pink-txt">남부터미널역 5번출구</p>
                      <p className="txt-info">
                        <span className="location-span">1</span> 도보이동 (약
                        5~10분 소요)
                      </p>
                      <p className="txt-info">
                        <span className="location-span">2</span> 마을버스
                        22번(초록색)을 타고 두 정거장 이동
                      </p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="green-txt">• 2호선</p>
                    </div>
                    <div className="right-box">
                      <p className="green-txt">서초역 3번출구</p>
                      <p className="txt-info">
                        <span className="location-span">1</span> 마을버스
                        11번(초록색)을 타고 네 정거장 이동
                      </p>
                      <p className="txt-info">
                        <span className="location-span">2</span> 도보이동 (약
                        20~25분 소요)
                      </p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="blue-txt">• 4호선</p>
                    </div>
                    <div className="right-box">
                      <p className="blue-txt">사당역 1번출구</p>
                      <p className="txt-info">
                        <span className="location-span">1</span> 마을버스
                        17번(초록색)을 타고 16개 정거장 이동
                      </p>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
            <dl className="subwaylist">
              <dt>
                <h3 className="dt-title">버스</h3>
              </dt>
              <dd>
                <div className="subway-box">
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="blue-txt">간선</p>
                    </div>
                    <div className="right-box">
                      <p className="blue-txt">406, 405</p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="green-txt">지선</p>
                    </div>
                    <div className="right-box">
                      <p className="green-txt">5413</p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="pink-txt">직행</p>
                    </div>
                    <div className="right-box">
                      <p className="pink-txt">1500-2, 1553</p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="green-txt">마을</p>
                    </div>
                    <div className="right-box">
                      <p className="green-txt">서초11, 서초17, 서초22</p>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
          </Tab>
          <Tab
            eventKey="profile"
            title="승용차 이용안내"
            className="location-tab"
          >
            <dl className="subwaylist">
              <dt>
                <h3 className="dt-title">남부순환로</h3>
              </dt>
              <dd>
                <div className="subway-box">
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="car-txt">양재방면에서 오시는 경우</p>
                    </div>
                    <div className="right-box">
                      <p className="car-txt">
                        경부고속도로 서초IC 예술의전당 방향 → 남부순환로
                      </p>
                      <p className="car-txt">
                        사당방면으로 직진 → 예술의전당앞 교차로 좌측에
                      </p>
                      <p className="car-txt">예술의전당</p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="car-txt">사당 방면에서 오시는 경우</p>
                    </div>
                    <div className="right-box">
                      <p className="car-txt">
                        남부순환로 양재방면으로 직진 → 예술의전당앞 교차로
                      </p>
                      <p className="car-txt">우측에 예술의전당</p>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
            <dl className="subwaylist">
              <dt>
                <h3 className="dt-title">올림픽대로</h3>
              </dt>
              <dd>
                <div className="subway-box">
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="car-txt">공항방면에서 오시는 경우</p>
                    </div>
                    <div className="right-box">
                      <p className="car-txt">
                        올림픽대로 반포대교 분기점에서 고속터미널 방면으로
                      </p>
                      <p className="car-txt">
                        좌회전 → 곧바로 반포대교 고가차로를 타고
                      </p>
                      <p className="car-txt">
                        서초역 방면으로 직진 → 서초3동 사거리를 지나 우면산
                      </p>
                      <p className="car-txt">
                        터널 옆으로 우측 도로 진입 → 예술의전당앞 교차로 정면에
                      </p>
                      <p className="car-txt">예술의전당</p>
                    </div>
                  </div>
                  <div className="subway-info-box">
                    <div className="left-box">
                      <p className="car-txt">잠실 방면에서 오시는 경우</p>
                    </div>
                    <div className="right-box">
                      <p className="car-txt">
                        올림픽대로 한남대교 분기점에서 한남IC 진입 → 곧이어
                      </p>
                      <p className="car-txt">
                        한남IC 부산방향으로 경부고속도로 진입 → 서초IC
                      </p>
                      <p className="car-txt">
                        예술의전당 방향으로 나와 사당방면으로 직진 → 예술의전당
                      </p>
                      <p className="car-txt">앞 교차로 좌측에 예술의전당</p>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
          </Tab>
          <Tab
            eventKey="longer-tab"
            title="예술의전당 안내도"
            className="location-tab"
          >
            <div>
              <p>예술의 전당 전체지도</p>

              <img
                src={`${import.meta.env.BASE_URL}images/map_main.jpg`}
                alt=""
                srcSet=""
              />
            </div>
            <div>
              <p>비타민스테이션 안내도</p>

              <img
                src={`${import.meta.env.BASE_URL}images/map01.jpg`}
                alt=""
                srcSet=""
              />
            </div>
            <div className="map03">
              <p>주차장 전기충전소 위치안내</p>

              <img
                src={`${import.meta.env.BASE_URL}images/map03.jpg`}
                alt=""
                srcSet=""
              />
            </div>
          </Tab>
        </Tabs>

        <div style={{position: "relative"}}>
          <div id="map" style={{}}></div>
          <div className="map-buttons">
            <button
              className={activeButton === "currentLocation" ? "active" : ""}
              onClick={moveToCurrentLocation}
            >
              현위치
            </button>
            <button
              className={activeButton === "artsCenter" ? "active" : ""}
              onClick={moveToArtsCenter}
            >
              예술의전당
            </button>
            <button
              className={activeButton === "route" ? "active" : ""}
              onClick={() => {
                openModal();
                setActiveButton("route");
              }}
            >
              길찾기
            </button>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="modal-close" onClick={closeModal}>
                &times;
              </span>
              <h2>경로 안내</h2>
              {lat && lng ? (
                <iframe
                  src={`https://map.kakao.com/link/from/현재위치,${lat},${lng}/to/예술의전당,37.47933796037272,127.0139231512912`}
                  style={{width: "100%", height: "500px", border: "none"}}
                  title="Kakao Maps Route"
                ></iframe>
              ) : (
                <p>현재 위치를 가져올 수 없습니다.</p>
              )}
              <p>
                <a
                  href={`https://map.kakao.com/link/from/현재위치,${lat},${lng}/to/예술의전당,37.47933796037272,127.0139231512912`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  새 탭에서 경로 안내 열기
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Location;
