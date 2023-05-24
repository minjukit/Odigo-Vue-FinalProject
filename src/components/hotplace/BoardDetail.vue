<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
         <b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>

        <b-card class= "mt-3">
        <b-card-header class="mb-2 d-flex flex-column">
        
          <div class="d-flex">
            <div class='text-left'><h3>{{article.title}} </h3></div>
            <div class="flex-item1"><h6>{{modifiedDate}}</h6></div>
          </div>
          <div class="d-flex">
          <div class="flex-item2"><h6>{{article.nickName}}</h6></div>
          <div class="flex-item1"><h6> {{article.count}} 읽음</h6></div>
          </div>
        </b-card-header>

          <b-card-body class="text-left">
            
            <div>
              <b-card>
                위치 
                <div id="map"></div>
                HOTPLACE: {{article.placeName}}
              <p>주소: {{article.roadName}}</p>
              <b-link href="#foo">{{article.url}}</b-link>
              </b-card>
            </div>
            <div v-html="message"></div>
            <div id="imagebound">
              
              <div v-for ="image in article.fileInfos" :key = "image.id" class="imageelement" >
                <img :src="image.originFile"  max-width= "1000" height="auto">
              </div>

            </div>
           
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="mb-1" align-self="center">
        <b-button variant="outline-secondary" @click="listArticle">목록</b-button>
      </b-col>
     
      <button class = "btn mr-3" @click="updateHeart">
        <b-icon class ="icon" :icon="iconHeart" font-scale="1.2"></b-icon>
        &nbsp;좋아요</button>
        
    </b-row>
    <!--댓글-->
    <b-button
      v-if="isScrolled && showButton"
      @click="scrollToTop"
      class="button-float"
    ><b-icon icon="arrow-up"></b-icon></b-button>
    <div class="mt-5">
    <comment-list></comment-list>
    </div>
  </b-container>

</template>

<script>
import http from "@/util/http-common.js";
import moment from "moment"
import CommentList from "./CommentList.vue";
import { mapGetters } from 'vuex';

export default {
  components: {CommentList},
  name: "hotPlaceDetail",
  
  data() {
    return {
      article: {},
      modifiedDate: new Date(),
      isScrolled: false,
      showButton: false,
      map: null,
      iconHeart: "heart"
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
     ...mapGetters(["nickName", "accessToken", "items", "data"])
  },
  mounted() {
    this.loadScript(); // 맵 로딩지연되는거 
  
  // if (window.kakao && window.kakao.maps) {
	// 		// 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
	// 		this.loadMap();
	// 	} else {
	// 		// 없다면 카카오 스크립트 추가 후 맵 실행
	// 		this.loadScript();
	// 	}
    window.addEventListener('scroll', this.handleScroll);
  },
  created() {
    http.get(`/hotplace/${this.$route.params.id}`).then(({ data }) => {
      this.article = data;
      
      console.log("createdDetail")

      this.modifiedDate= moment(this.article.modifiedDate).format("YYYY.MM.DD HH:MM");
    });
    window.setHotPlaceLoc = this.setHotPlaceLoc
  },
  methods: {
    updateHeart(){
      http.get(`/hotplace/${this.$route.params.id}/heart`).then(response => {
          if (response.status === 200) {
            // 200 OK 상태 코드 처리
            this.iconHeart = "heart-fill"
          } else {
            // 다른 상태 코드 처리
            alert(response.status);
          }
        }).catch(()=>{
             let msg = "좋아요 처리시 문제가 발생했습니다.";
             alert(msg);
     });
    },
    listArticle() {
      this.$router.push({ name: "hotPlaceList" , 
      params: {
        currentPage: this.$route.params.currentPage,
        sortBy: this.$route.params.sortBy
      }
      });
      // console.log("listarticle")
      // console.log(this.$route.params.currentPage)
      // console.log(this.$route.params.sortBy)
    },
    moveModifyArticle() {
      this.$router.push({
        name: "hotPlaceModify",
        params: { id: this.article.id },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
     
      if (confirm("정말로 삭제?")) {
        this.$router.push({
          name: "hotPlaceDelete",
          params: { id: this.article.id },
        });
      }
    },
    handleScroll() {
    this.isScrolled = window.pageYOffset > 0;
    this.showButton = window.innerHeight < document.documentElement.scrollHeight;
    },
    scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
  loadScript() {
			const script = document.createElement("script");
			script.src =
				"//dapi.kakao.com/v2/maps/sdk.js?appkey=ea948ca1959359f34e669fcc0ba5e6b4&autoload=false"; // &autoload=false api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
			script.onload = () => window.kakao.maps.load(this.loadMap); // 스크립트 로드가 끝나면 지도를 실행될 준비가 되어 있다면 지도가 실행되도록 구현
			document.head.appendChild(script); // html>head 안에 스크립트 소스를 추가
      this.displayMarker();
		},
		loadMap() {
			const container = document.getElementById("map"); // 지도를 담을 DOM 영역
			const options = {
				// 지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(
            this.article.lon,
            this.article.lat
          ), // 지도의 중심좌표
				level: 3, // 지도의 레벨(확대, 축소 정도)
			};
			this.map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      this.displayMarker();
		},
    displayMarker() {
			//this.bounds = new window.kakao.maps.LatLngBounds();
			console.log("=========display marker==========")
			var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
				
				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new window.kakao.maps.Size(24, 35);

				// 마커 이미지를 생성합니다
				var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

				// var points = [];

				// 마커를 생성합니다
				var marker = new window.kakao.maps.Marker({
					map: this.map, // 마커를 표시할 지도
					position: new window.kakao.maps.LatLng(
            this.article.lon,
            this.article.lat
          ), // 마커를 표시할 위치
					//title: this.aricle.placeName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image: markerImage, // 마커 이미지
					clickable: true,
				});

				marker.setZIndex(10);
				//this.bounds.extend(new window.kakao.maps.LatLng(this.article.lat, this.article.lon));
				
        marker.setMap(this.map);
			}

		},
    
    // moveCenter(lat, lng) {
		// 	this.map.setCenter(new window.kakao.maps.LatLng(lat, lng));
		// },
  // filters: {
  //   dateFormat() {
  //     this.modifiedDate = moment(this.article.modifiedDate).format("YY.MM.DD hh:mm:ss");
  //   },
  // },

};
</script>

<style scoped>
#boardcard{
  border: none;
  background: white;
}

.flex-item2{
  flex:1;
  text-align: left;

}


.flex-item1{
  flex:1;
  margin-top: 7px;
  text-align: right;
}

.button-float {
  position: fixed;
  bottom: 80px;
  right: 90px;
  font-size: 40%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(62, 165, 255);
  border: none;
}
.button-float .b-icon{
  scale: 300%;
  margin-top: 1px;
}

#imagebound {
  width: 100%;
  padding: 10px;
  overflow:hidden;
	height:auto;
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 30px auto auto auto;
  border-radius: 1%;

}

.imageelement{
  border: 1px solid  rgb(162, 205, 255);
  display: flex;
  align-content: center;
  align-items: center;
}

#map{
  width: 80%;
	height: 200px;
	margin :auto;
	padding: 0;
}
</style>
