<template>
	<div class="container" style="margin-top: 2%;">
		<div class="row" style="margin-left: 0%; width:103%">
			<input id="search-keyword" class="form-control col-8 search" type="search" placeholder="검색어를 입력하세요"
				aria-label="검색어를 입력하세요" style="margin-right: 2%;" v-model.lazy:value="keyWord" />
			<button id="btn-search" class="btn btn-outline-success col-3" type="button" @click="getById">검색</button>
		</div>
		<div class="row" style="margin-top: 1.5%">
			<div class="col-4">
				<map-list :items="items"></map-list>
			</div>
			<div class="col-8">
				<div id="map"></div>
			</div>
		</div>
	</div>
</template>

<script>
import MapList from '@/components/map/MapList'
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'

export default {
	components: {
		MapList
	},
	created() {
		window.closeInfoWindowByIndex = this.closeInfoWindowByIndex
	},
	computed: {
		...mapGetters(["items", "data"]),
		// items() {
		// 	return this.$store.getters.items;
		// }
	},
	// watch: {
	// 	items() {
	// 		console.log();
	// 		this.makeList(this.items)
	// 	}
	// },
	data() {
		return {
			map: null,
			result: {},
			keyWord: "",
			positions: [],
			markers: [],
			infos: [],
			bounds: new window.kakao.maps.LatLngBounds(),
			// items: [],
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
		...mapActions([Constant.GET_ROUTES]),
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
			// this.loadMaker();
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
			console.log(this.keyWord);
			if (this.keyWord == null || this.keyWord.length == 0) {
				return
			}
			this[Constant.GET_ROUTES](this.keyWord)
				.then(
					() => {
						console.log(this.data),
							this.makeList(this.data)
					}
				);
			// empRestAPI.get(`/trip/map/${this.keyWord}`)
			// 	.then(({ data }) => {
			// 		this.result = data
			// 		this.items = this.result.documents;
			// 		console.log(this.items)
			// 		console.log(this.result.meta)
			// 	})
			// .catch(() => console.log('목록 조회에 실패하였습니다.'));
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

			// 마커 이미지의 이미지 주소입니다
			var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

			for (var i = 0; i < this.positions.length; i++) {
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
				this.bounds.extend(this.positions[i].latlng);

				this.markers.push(marker);

				// vm.removePoint = function(id) { console.log(`removing point ${id}...`) }

				var infowindow = new window.kakao.maps.InfoWindow({
					content: '<div class="wrap" style="width: 250px; font-size: 13px">' +
						'    <div class="info">' +
						'        <div class="title">' +
						area[i].place_name +
						// `<a class="btn btn-danger" @click.native="removePoint(${vm.asd})">Remove</a>` +
						`           <div class="close" onclick="closeInfoWindowByIndex(${i})" style="font-size : 13px; margin:5px">닫기</div>` +
						'        </div>' +
						'        <div class="body">' +
						// '            <div class="img">' +
						// `                <img src="` +
						// area[i].first_image +
						// `" width="73" height="70">` +
						// '           </div>' +
						'            <div class="desc">' +
						`                <div class="ellipsis">`
						+ area[i].address_name
						+ `</div>` +
						'            </div>' +
						'        </div>' +
						'    </div>' +
						'</div>'// 인포윈도우에 표시할 내용
				});

				this.infos.push(infowindow);
				window.kakao.maps.event.addListener(marker, 'click', () => {
					infowindow.open(this.map, marker);
				});
			}
			this.map.setBounds(this.bounds);
			for (let i = 0; i < this.infos.length; i++) {
				window.kakao.maps.event.addListener(this.markers[i], 'click', () => {
					this.closeInfoWindow()
					this.infos[i].open(this.map, this.markers[i]);
				});
			}


			// 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
			// this.map.setCenter(this.positions[0].latlng);
		},
		// makeOverListener(map, marker, infowindow) {
		// 	return function () {
		// 		this.closeInfoWindow();
		// 		this.infos.push(infowindow);
		// 		infowindow.open(map, marker);
		// 	}
		// },
		closeInfoWindow() {
			console.log("close");
			for (var idx = 0; idx < this.infos.length; idx++) {
				this.infos[idx].close();
			}
		},
		closeInfoWindowByIndex(idx) {
			console.log("close");
			this.infos[idx].close();
		},

		test(id) {
			console.log(id);
		},

		moveCenter(lat, lng) {
			this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
		},
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