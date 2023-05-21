<template>
	<div class="container" style="margin-top: 5%;">
		<div class="row" id="searchRow">
			<!-- 관광지 검색 start -->
			<select id="search-area" class="form-select col-2 marginSearch" @change="categoryChange(this)"
				v-model="sidoCode">
				<option value="0" selected>검색 할 시/도 선택</option>
				<option value="1">서울</option>
				<option value="2">인천</option>
				<option value="3">대전</option>
				<option value="4">대구</option>
				<option value="5">광주</option>
				<option value="6">부산</option>
				<option value="7">울산</option>
				<option value="8">세종특별자치시</option>
				<option value="31">경기도</option>
				<option value="32">강원도</option>
				<option value="33">충청북도</option>
				<option value="34">충청남도</option>
				<option value="35">경상북도</option>
				<option value="36">경상남도</option>
				<option value="37">전라북도</option>
				<option value="38">전라남도</option>
				<option value="39">제주도</option>
			</select>
			<select id="search-area2" class="form-select col-2 marginSearch" v-model="gugunCode">
				<option value="0" selected>검색 할 구/군 선택</option>
				<option v-for="(gugun) in gugunList" :key="gugun.gugun_code" :value="gugun.gugun_code">{{ gugun.gugun_name
				}}</option>
			</select>
			<select id="search-content-id" class="form-select col-2 marginSearch" v-model="category">
				<option value="0" selected>관광지 유형</option>
				<option value="12">관광지</option>
				<option value="14">문화시설</option>
				<option value="15">축제공연행사</option>
				<option value="25">여행코스</option>
				<option value="28">레포츠</option>
				<option value="32">숙박</option>
				<option value="38">쇼핑</option>
				<option value="39">음식점</option>
			</select>
			<input type="text" class="col-3 marginSearch" v-model="keyWord">
			<input id="btn-search" class="btn btn-outline-success col-2 marginSearch" value="검색" @click="findTravel" />
		</div>
		<div class="row" style="margin-top: 1%">
			<div id="map" class="w"></div>
		</div>
		<check-modal v-if="showModal" @close="showModal = false"></check-modal>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'
import empRestAPI from "@/util/http-common.js";
import CheckModal from './checkModal.vue';

export default {
	components: {
		CheckModal
	},
	created() {
		window.closeInfoWindowByIndex = this.closeInfoWindowByIndex
		window.addPlanList = this.addPlanList

		this[Constant.INITIATE_ROUTE]()
		// this[Constant.INITIATE_PLANS]()
	},
	computed: {
		...mapGetters(["items", "data", "planList", "isLogin"]),
	},
	data() {
		return {
			showModal: false,
			map: null,
			result: [],
			keyWord: "",
			positions: [],
			markers: [],
			infos: [],
			bounds: {},
			checkedId: "",
			gugunList: [],
			sidoCode: 0,
			gugunCode: 0,
			category: 0,

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
		...mapActions([Constant.SET_PLAN, Constant.GET_ROUTE, Constant.GET_ROUTES, Constant.INITIATE_ROUTE, Constant.GET_PLANS, Constant.INITIATE_PLANS]),
		openModal() {
			this.showModal = true
		},
		findTravel() {
			empRestAPI.get(`/travel/spot?sido=${this.sidoCode}&gugun=${this.gugunCode}` +
				`&category=${this.category}&keyWord=${this.keyWord}`)
				.then((data) => {
					this.closeInfoWindow();
					this.result = data.data;
					if (data.data.length > 0) {
						this.makeList(data);
					}
				})
				.catch(() => { })
		},

		categoryChange() {
			empRestAPI.get(`/travel/gugun/${this.sidoCode}`)
				.then((data) => {
					this.gugunList = data.data;
				})
				.catch(() => { })
		},

		addPlanList(idx) {
			if (this.isLogin == true) {
				let address = this.result[idx].addr1
				this[Constant.GET_ROUTE](address)
					.then(({ data }) => this.checkPlan(data.documents, this.result[idx]))
					.catch((data) => {
						if (data == "Error") {
							this.addPlanList(idx)
							return;
						}
					})
			} else {
				let origin = this.result[idx];
				console.log(origin)
				let findPlan = {
					address_name: origin.addr1,
					place_name: origin.title,
					x: origin.longitude,
					y: origin.latitude,
					id: origin.content_id + "1324212312123",
				}
				this[Constant.SET_PLAN](findPlan)
			}
			this.openModal()
		},

		checkPlan(list, origin) {
			let findPlan = null;
			for (let i = 0; i < list.length; i++) {
				if (list[i].place_name === origin.title) {
					findPlan = list[i];
				}
			}
			console.log(origin)
			if (findPlan == null) {
				findPlan = {
					address_name: origin.addr1,
					place_name: origin.title,
					x: origin.longitude,
					y: origin.latitude,
					id: origin.content_id + "12312413123"
				}
			}
			this[Constant.SET_PLAN](findPlan)
		},

		// addr1:"서울특별시 강동구 동남로 588"
		// content_id:"2839618"
		// content_type_id:"39"
		// first_image:"http://tong.visitkorea.or.kr/cms/resource/16/2839616_image2_1.jpg"
		// gugun_code:"2"
		// latitude:37.52697301
		// longitude:127.1480956
		// sido_code:"1"
		// title:"산수고원"

		// address_name:"대전 서구 둔산동 1085"
		// category_group_code:"FD6"
		// category_group_name:"음식점"
		// category_name:"음식점 > 한식 > 육류,고기"
		// id:"1893446286"
		// phone:"042-253-8077"
		// place_name:"돈대장"
		// place_url:"http://place.map.kakao.com/1893446286"
		// road_address_name:"대전 서구 대덕대로195번길 55"
		// x:"127.3750283258"
		// y:"36.3515415452515"


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
		makeList(response) {
			this.positions = [];
			let trips = response.data;
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
					title: area.title,
					latlng: new window.kakao.maps.LatLng(area.latitude, area.longitude),
				};
				this.positions.push(markerInfo);
			});
			this.displayMarker(trips);
		},

		displayMarker(area) {
			this.bounds = new window.kakao.maps.LatLngBounds();
			this.markers = [];
			this.infos = [];
			for (let i = 0; i < this.positions.length; i++) {
				var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png";
				// if (this.items[i].id == this.checkedId) {
				// 	imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
				// }
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
				// marker.setMap(this.map);
				// if (this.items[i].id == this.checkedId) {
				// 	marker.setZIndex(10);
				// } else {
				marker.setZIndex(5);
				// }
				this.markers.push(marker);

				this.bounds.extend(this.positions[i].latlng);

				var infowindow = new window.kakao.maps.InfoWindow({
					content: '<div class="wrap" style="width: 270px; font-size: 13px">' +
						'     	<div class="info">' +
						'       	<div class="title">' +
						area[i].title +
						`           <div class="close" onclick="closeInfoWindowByIndex(${i})" style="font-size : 13px; margin:5px">닫기</div>` +
						'        	</div>' +
						`</div>` +
						'       <div class="body">' +
						'           <div class="desc">' +
						area[i].addr1 +
						`<div class="close" onclick="addPlanList(${i})" style="font-size : 13px; margin:3px -28px 0 0">추가하기</div>` +
						`      		</div>` +
						`</div>` +
						'	  </div>'// 인포윈도우에 표시할 내용
				});
				infowindow.setZIndex(11)
				// if (this.items[i].id == this.checkedId) {
				// 	var checkedidx = i
				// }
				this.infos.push(infowindow);
			}

			for (let i = 0; i < this.infos.length; i++) {
				window.kakao.maps.event.addListener(this.markers[i], 'click', () => {
					this.closeInfoWindow()
					this.infos[i].open(this.map, this.markers[i]);
				});
			}
			// if (checkedidx != null) {
			// 	this.infos[checkedidx].open(this.map, this.markers[checkedidx]);
			// 	this.bounds = new window.kakao.maps.LatLngBounds();
			// 	this.bounds.extend(this.markers[checkedidx].getPosition())
			// 	this.map.setBounds(this.bounds, 1000, 1000, 1000, 1000);
			// } else {
			this.map.setBounds(this.bounds);
			// }
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
	}
}
</script>

<style scoped>
#map {
	height: 610px;
	width: 97%;
}

#searchRow {
	width: 106.2%;
	margin-top: -3.2%;
}

.marginSearch {
	margin-right: 0.5%;
	border-color: rgba(0, 0, 0, 0.1);
}
</style>