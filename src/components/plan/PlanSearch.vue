<template>
	<div class="container" style="margin-top: 2%;">
		<div class="row" style="margin-left: 0%; width:100%">
			<input id="search-keyword" class="form-control search" type="search" placeholder="검색어를 입력하세요"
				aria-label="검색어를 입력하세요" style="margin-right: 1%; width:69.5%" v-model.lazy:value="keyWord"
				@keyup.enter="getById" />
			<button id="btn-search" class="btn btn-outline-success" type="button" style="margin-right: 1%; width :14%"
				@click="getById">검색</button>
			<button id="btn-search" class="btn btn-outline-success" type="button" style="width: 11%" @click="toSavePage">저장
				하기</button>
		</div>
		<div class="row" style="margin-top: 1%">
			<div class="col-5">
				<map-list :items="items" :checkedId="checkedId" @checkedIdFromChild="getChecked"></map-list>
			</div>
			<div class="col-7">
				<div id="map"></div>
			</div>
		</div>
		<div class="row">
			<plan-list style="margin-top: 1.5%"></plan-list>
		</div>
	</div>
</template>

<script>
import MapList from '@/components/plan/MapList'
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'
import PlanList from '@/components/plan/PlanList.vue';

export default {
	components: {
		MapList,
		PlanList
	},
	created() {
		window.closeInfoWindowByIndex = this.closeInfoWindowByIndex
		window.addPlanList = this.addPlanList
		this[Constant.INITIATE_ROUTE]()
		// this[Constant.INITIATE_PLANS]()
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
		};
	},
	mounted() {
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
		...mapActions([Constant.GET_ROUTES, Constant.INITIATE_ROUTE, Constant.GET_PLANS, Constant.INITIATE_PLANS]),

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

		getById() {
			this.closeInfoWindow()
			if (this.keyWord == null || this.keyWord.length == 0) {
				return
			}
			this[Constant.GET_ROUTES](this.keyWord)
				.then(
					() => {
						this.makeList(this.data)
					}
				).catch((data) => {
					if (data == "Error") {
						this.getById()
					}
				});
		},

		makeList(data) {
			this.positions = [];
			let trips = data.documents;
			if (this.markers != null) {
				for (let mark of this.markers) {
					mark.setMap(null);
				}
			}
			this.markers = [];
			if (trips.length == 0) {
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

			for (var i = 0; i < this.positions.length; i++) {
				var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";
				if (this.items[i].id == this.checkedId) {
					imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
				}
				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new window.kakao.maps.Size(24, 35);

				// 마커 이미지를 생성합니다
				var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

				// var points = [];

				// 마커를 생성합니다
				var marker = new window.kakao.maps.Marker({
					map: this.map, // 마커를 표시할 지도
					position: this.positions[i].latlng, // 마커를 표시할 위치
					title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image: markerImage, // 마커 이미지
					clickable: true,
				});

				if (this.items[i].id == this.checkedId) {
					marker.setZIndex(10);
				} else {
					marker.setZIndex(5);
				}
				this.markers.push(marker);

				this.bounds.extend(this.positions[i].latlng);

				// this.markers.push(marker);

				var infowindow = new window.kakao.maps.InfoWindow({
					content: '<div class="wrap" style="width: 270px; font-size: 13px">' +
						'     	<div class="info">' +
						'       	<div class="title">' +
						area[i].place_name +
						`           <div class="close" onclick="closeInfoWindowByIndex(${i})" style="font-size : 13px; margin:5px">닫기</div>` +
						'        	</div>' +
						`</div>` +
						'       <div class="body">' +
						'           <div class="desc">' +
						area[i].address_name +
						`<div class="close" onclick="addPlanList(${i})" style="font-size : 13px; margin:3px -28px 0 0">추가하기</div>` +
						`      		</div>` +
						`</div>` +
						'	  </div>'// 인포윈도우에 표시할 내용
				});
				infowindow.setZIndex(11)
				if (this.items[i].id == this.checkedId) {
					var checkedidx = i
				}
				this.infos.push(infowindow);
			}

			for (let i = 0; i < this.infos.length; i++) {
				window.kakao.maps.event.addListener(this.markers[i], 'click', () => {
					this.closeInfoWindow()
					this.infos[i].open(this.map, this.markers[i]);
				});
			}

			if (checkedidx != null) {
				this.infos[checkedidx].open(this.map, this.markers[checkedidx]);
				this.bounds = new window.kakao.maps.LatLngBounds();
				console.log(this.markers[checkedidx])
				this.bounds.extend(this.markers[checkedidx].getPosition())
				this.map.setBounds(this.bounds, 1000, 1000, 1000, 1000);
			} else {
				this.map.setBounds(this.bounds);
			}
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
			if (this.planList.length != 0) {
				this.$router.push('/plan/savePlan')
			} else {
				alert("여행지를 최소 하나는 선택 해야 합니다.");
			}
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