<template>
	<div class="container" style="margin-top: 1%;">
		<div class="row" style="margin-top: 1%">
			<div class="col-5">
				<plan-register></plan-register>
			</div>
			<div class="col-7">
				<div id="map"></div>
			</div>
		</div>
		<div class="row">
			<plan-list-detail style="margin-top: 1.5%" @changeIndexEvent="reloadMap"></plan-list-detail>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'
import PlanRegister from '@/components/plan/PlanRegister.vue';
import PlanListDetail from '@/components/plan/PlanListDetail.vue';

export default {
	components: {
		PlanRegister,
		PlanListDetail,
	},
	created() {
		console.log("create")
		window.closeInfoWindowByIndex = this.closeInfoWindowByIndex
		window.RemovePlanList = this.toRemovePlan
		this[Constant.INITIATE_ROUTE]()
		// this[Constant.INITIATE_PLANS]()
	},
	watch: {
		planList() {
			this.startPlanMap()
		}
	},
	computed: {
		...mapGetters(["items", "data", "planList"]),
	},
	data() {
		return {
			map: null,
			result: {},
			keyWord: "",
			positions: [],
			markers: [],
			infos: [],
			bounds: {},
			checkedId: "",
			polyline: {},
			linePositionpath: [],
			markerImage: null,
		};
	},
	mounted() {
		this.loadScript();
		if (window.kakao && window.kakao.maps) {
			// 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
			this.loadMap();
		} else {
			// 없다면 카카오 스크립트 추가 후 맵 실행
			this.loadScript();
		}
	},
	methods: {
		// [Constant.GET_ROUTES]() {
		// 	return this.$store.dispatch(Constant.GET_ROUTES, this.keyWord)
		// },
		...mapActions([Constant.GET_ROUTES, Constant.INITIATE_ROUTE, Constant.GET_PLANS, Constant.INITIATE_PLANS, Constant.REMOVE_PLAN]),

		toRemovePlan(idx) {
			console.log(this.planList[idx]);
			this[Constant.REMOVE_PLAN](this.planList[idx].id)
			this.setPolyLine();
		},

		addPlanList(idx) {
			console.log(this.items[idx].place_name)
			this[Constant.GET_PLANS](this.items[idx])
		},
		getChecked(checkedId) {
			this.checkedId = checkedId
			this.closeInfoWindow()
			this.markerAndItemsInit()
			this.makeList(this.data)
		},

		markerAndItemsInit() {
			this.infos = []
			for (let i = 0; i < this.markers.length; i++) {
				this.markers[i].setMap(null);
			}
			this.markers = []
		},

		loadScript() {
			const script = document.createElement("script");
			script.src =
				"//dapi.kakao.com/v2/maps/sdk.js?appkey=ea948ca1959359f34e669fcc0ba5e6b4&autoload=false"; // &autoload=false api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
			script.onload = () => window.kakao.maps.load(this.loadMap); // 스크립트 로드가 끝나면 지도를 실행될 준비가 되어 있다면 지도가 실행되도록 구현
			document.head.appendChild(script); // html>head 안에 스크립트 소스를 추가
		},

		loadMap() {
			const container = document.getElementById("map"); // 지도를 담을 DOM 영역
			const options = {
				// 지도를 생성할 때 필요한 기본 옵션
				center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: 3, // 지도의 레벨(확대, 축소 정도)
			};

			this.map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
			this.startPlanMap()

		},

		loadMaker() {
			const markerPosition = new window.kakao.maps.LatLng(
				33.450701,
				126.570667
			);

			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
			});

			marker.setMap(this.map);
		},
		startPlanMap() {
			this.closeInfoWindow()

			this.makeList(this.planList)
		},

		makeList(data) {
			this.positions = [];
			let trips = data;
			if (this.markers != null) {
				for (let mark of this.markers) {
					mark.setMap(null);
				}
			}
			this.markers = [];

			if (trips == null) {
				alert("검색 결과가 없습니다. 다시 검색해주세요");
				return;
			}

			trips.forEach((area) => {
				let markerInfo = {
					title: area.place_name,
					latlng: new window.kakao.maps.LatLng(area.y, area.x),
				};
				this.positions.push(markerInfo);
			});
			this.displayMarker(trips);
		},

		displayMarker(area) {
			this.bounds = new window.kakao.maps.LatLngBounds();
			this.markers = [];
			this.infos = [];
			// draw line
			this.setPolyLine();

			for (var i = 0; i < this.positions.length; i++) {

				var marker = this.addMarker(this.positions[i].latlng, i);

				this.markers.push(marker);

				this.bounds.extend(this.positions[i].latlng);

				// line - position에 담긴 좌표 path에 추가
				this.linePositionpath.push(this.positions[i].latlng);

				var infowindow = new window.kakao.maps.InfoWindow({
					content: '<div class="wrap" style="width: 300px; font-size: 13px">' +
						'     	<div class="info">' +
						'       	<div class="title">' +
						area[i].place_name +
						`           <div class="close" onclick="closeInfoWindowByIndex(${i})" style="font-size : 13px; margin:5px">닫기</div>` +
						'        	</div>' +
						`</div>` +
						'       <div class="body">' +
						'           <div class="desc">' +
						area[i].address_name +
						`</div>` +
						'	  </div>'// 인포윈도우에 표시할 내용
				});
				infowindow.setZIndex(11)
				this.infos.push(infowindow);
			}

			for (let i = 0; i < this.infos.length; i++) {
				window.kakao.maps.event.addListener(this.markers[i], 'click', () => {
					this.closeInfoWindow()
					this.infos[i].open(this.map, this.markers[i]);
				});
			}

			this.map.setBounds(this.bounds);
			// line
			this.polyline.setPath(this.linePositionpath); //line path 메소드로 지정
			this.polyline.setMap(this.map); // 지도에 line 표시

		},

		closeInfoWindow() {
			if (this.infos != null && this.infos.length != 0) {
				for (var idx = 0; idx < this.infos.length; idx++) {
					this.infos[idx].close();
				}
			}
		},
		closeInfoWindowByIndex(idx) {
			this.infos[idx].close();
		},

		moveCenter(lat, lng) {
			this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
		},
		toSavePage() {
			console.log(this.planList.length)
		},
		setPolyLine() {

			this.linePositionpath = [];
			this.polyline = new window.kakao.maps.Polyline({
				map1: this.map,
				strokeWeight: 4,
				strokeColor: '#0066a0',
				strokeOpacity: 1,
				strokeStyle: 'shortdash',
			});
			// 지도에 line 초기화
			this.polyline.setMap(null);
		},
		addMarker(position, idx) {
			var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
			const imageSize = new window.kakao.maps.Size(36, 37);  // 마커 이미지의 크기
			const imgOptions = {
				spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
				spriteOrigin: new window.kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
				offset: new window.kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
			};
			const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
			const marker = new window.kakao.maps.Marker({
				image: markerImage,
				position: position, // 마커를 표시할 위치
				title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
				clickable: true,
			});

			marker.setMap(this.map); // 지도 위에 마커를 표출합니다
			//this.markers.push(marker);  // 배열에 생성된 마커를 추가합니다

			return marker;
		},
		reloadMap() {
			// 지도에 line 초기화
			this.polyline.setMap(null);
		}
	}
}
</script>

<style scoped>
#map {
	width: 96%;
	height: 500px;
	margin-top: 1%;
	margin-left: -10px;
	padding: 0;
}
</style>