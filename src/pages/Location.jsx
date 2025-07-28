import {useEffect} from "react";
import "./Location.css"; // 스타일 파일 추가
const {kakao} = window; // 전역 kakao 객체 사용

function Location() {
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.47892810052104, 127.01305252974291), // 지도의 중심좌표
        level: 2, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);

    kakao.maps.event.addListener(map, "center_changed", function () {
      // 지도의  레벨을 얻어옵니다
      var level = map.getLevel();

      // 지도의 중심좌표를 얻어옵니다
      var latlng = map.getCenter();

      var message = "<p>지도 레벨은 " + level + " 이고</p>";
      message +=
        "<p>중심 좌표는 위도 " +
        latlng.getLat() +
        ", 경도 " +
        latlng.getLng() +
        "입니다</p>";

      var resultDiv = document.getElementById("result");
      resultDiv.innerHTML = message;
    });

    var areas = [
      {
        name: "예술의전당",
        path: [
          new kakao.maps.LatLng(37.479784000719405, 127.01357275069294),
          new kakao.maps.LatLng(37.47958581463431, 127.01325615007072),
          new kakao.maps.LatLng(37.47944166137885, 127.01318263649556),
          new kakao.maps.LatLng(37.47925695384987, 127.01318825696576),
          new kakao.maps.LatLng(37.4791127854074, 127.01325041360394),
          new kakao.maps.LatLng(37.478977615513735, 127.01341432373884),
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
          new kakao.maps.LatLng(37.479784000719405, 127.01357275069294),
        ],
      },
    ];
    for (var i = 0, len = areas.length; i < len; i++) {
      displayArea(areas[i]);
    }

    // 다각형을 생상하고 이벤트를 등록하는 함수입니다
    function displayArea(area) {
      // 다각형을 생성합니다
      var polygon = new kakao.maps.Polygon({
        map: map, // 다각형을 표시할 지도 객체
        path: area.path,
        strokeWeight: 2,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
      kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
        polygon.setOptions({fillColor: "#09f"});

        customOverlay.setContent('<div class="area">' + area.name + "</div>");

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(map);
      });

      // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
      kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
        customOverlay.setPosition(mouseEvent.latLng);
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
      // 커스텀 오버레이를 지도에서 제거합니다
      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({fillColor: "#fff"});
        customOverlay.setMap(null);
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
      kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
        var content =
          '<div class="info">' +
          '   <div class="title">' +
          area.name +
          "</div>" +
          '   <div class="size">총 면적 : 약 ' +
          Math.floor(polygon.getArea()) +
          " m<sup>2</sup></div>" +
          "</div>";

        infowindow.setContent(content);
        infowindow.setPosition(mouseEvent.latLng);
        infowindow.setMap(map);
      });
    }

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다
      position: map.getCenter(),
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";

      var resultDiv = document.getElementById("clickLatlng");
      resultDiv.innerHTML = message;
    });
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  return (
    <>
      <main style={{paddingTop: "60px"}}>
        <h1>오시는 길</h1>
        <div id="map" style={{width: "1000px", height: "800px"}}></div>
        <div id="clickLatlng"></div>
        <p id="result"></p>
        <p> 여기에 오시는 길에 대한 정보를 입력하세요.</p>
        <p>예: 서울특별시 강남구 테헤란로 123</p>
        <p>지하철: 2호선 강남역 5번 출구</p>
        <p>버스: 400, 402, 740번 버스 이용</p>
      </main>
    </>
  );
}

export default Location;
