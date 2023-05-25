<template>

  <b-row class="mb-1">
  
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset" enctype="multipart/form-data">
          
        <b-button
          type="submit"
          variant="outline-success"
          class = "btnForm"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="outline-success" class = "btnForm" v-else
          >글수정</b-button
        >
        <b-button type="reset"  variant="outline-danger" class = "btnForm"
         v-if="this.type === 'register'">초기화</b-button>
        <b-button @click ="moveList"  variant="outline-secondary" class = "btnForm"
         v-else>글목록</b-button>


        <b-form-group
          id="title-group"
          label-for="title"
  
        >
          <b-form-input
            id="title"
            v-model="article.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        

        <div class="mb-3">
          <b-button-toolbar class="ml-0.5" >
          
          <b-button-group class="mr-1" >
            <b-button title="Align left" variant="outline-success">
              <b-icon icon="text-left" aria-hidden="true" @click = "changeAlign(`left`)"></b-icon>
            </b-button>
            <b-button title="Align center" variant="outline-success">
              <b-icon icon="text-center" aria-hidden="true" @click = "changeAlign(`center`)"></b-icon>
            </b-button>
            <b-button title="Align right" variant="outline-success">
              <b-icon icon="text-right" aria-hidden="true" @click = "changeAlign(`right`)"></b-icon>
        </b-button>
      </b-button-group>


          </b-button-toolbar>
          
        </div>
        <b-form-group id="content-group" label="  " label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용을 입력하세요"
            rows="10"
            max-rows="15"
            :style="{ textAlign: align }"
          ></b-form-textarea>
           
        </b-form-group>


        <div class="mr-1" >
          <b-button title="New File" class="mr-1" variant="outline-success" @click="chooseImage">
            <b-icon icon="camera" aria-hidden="true"></b-icon>
            &nbsp;사진
          </b-button>
            <input
              type="file"
              style="display: none"
              ref="imageInput"
              accept="image/png,image/jpeg,image/jpg"
              @change="onFileChange"
              multiple files
            />
      
          </div>
          
  
        <div id="imagebound">
          <div v-for ="image in images" :key = "image.url" class="imageelement" >
            <img :src="image.url" class="containImage">
          </div>
        </div>

        <b-button title="New loc" class="mt-3" variant="outline-success">
            <b-icon icon="map" aria-hidden="true"></b-icon>
             &nbsp;위치
        </b-button>  
        <b-row>
           <b-col>
            <b-card style="margin-top: 3%; height:280px" class="searchContainer">
              
              <b-card-header id="cardheader" v-if="this.placeName!=''">
                {{placeName}}
              </b-card-header>
              
              <b-card-body class="text-center"  style="margin-top: 9%;" v-if="this.placeName!=''">
                 {{roadName}}
                 <br/>  <br/>
                 <b-link :href="article.url">상세페이지로 이동</b-link>
              </b-card-body>
              <b-card-body class="searchBefore" v-else >
                검색 후 위치를 선택해주세요
              </b-card-body>
            </b-card>
           </b-col>
          <b-col>
        <div class="container" style="margin-top: 3%;">
          <div class="row" style="width:100%">
            <b-form-input id="input-valid" class="form-control valid"  placeholder="검색어를 입력하세요"
              aria-label="검색어를 입력하세요" style="margin-left:2%; margin-right: 1%; width:80%;" v-model.lazy:value="keyWord"
              @keyup.enter="getById" />
            <button id="btn-search" class="btn btn-outline-success" type="button" style="margin-right: 1%; width :14%"
              @click="getById">검색</button>
          </div>
          <div class="row" style="margin-top: 5%;">
            <div class="col-12">
              <div id="map"></div>
            </div>
          </div>
        </div>
          </b-col>
      </b-row>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/util/http-common.js";
import { mapActions, mapGetters } from 'vuex';
import Constant from '@/common/Constant'

export default {
  name: "BoardInputItem",
  
  data() {
    return {
      article: {
        id: 0,
        user: "",
        title: "",
        content: "",
        fileInfo: [],
         
      },
      isUserid: false,
      //file: null,
      fileInfos: [
      ], //업로드용 파일
      images: [],
      formData: [],
      align: "left",
      // kakao map
      map: null,
      result: {},
			keyWord: "",
			positions: [],
			markers: [],
			infos: [],
			bounds: {},
      roadName: "",
      placeName: "",
      url: "",
      x: Number,
      y: Number,
      
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapGetters(["nickName", "accessToken", "items", "data"])
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
  created() {
    window.closeInfoWindowByIndex = this.closeInfoWindowByIndex
    window.setHotPlaceLoc = this.setHotPlaceLoc

    if (this.type === "modify") {
      console.log(this.type)
      http.get(`/hotplace/${this.$route.params.id}`).then(({ data }) => {
        console.log(data)
        this.article = data
        
        this.roadName = this.article.roadName
        this.placeName = this.article.placeName
        this.x = this.article.lat
        this.y = this.article.lon
        this.url = this.article.url

        for(let i =0;i< this.article.fileInfos.length; i++){
          let imageData = {
              url: this.article.fileInfos[i].originFile
            };
            this.images.push(imageData)
        }
        
        this.loadMaker(this.article.lat, this.article.lon); 
       
      // console.log(this.items[idx])
      });
     
      
    }

  },

  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      
      err &&
        !this.article.title &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.title.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.title = "";
      this.article.content = "";
      this.roadName = "";
      this.placeName = "";
      this.image = "";
      //this.$router.push({ name: "hotPlaceList" });
    },
    registArticle() {
      console.log(this.article);
      console.log("=========file========")
      console.log(this.x + this.url +this.y)
 
      http
        .post(`/hotplace`, {
          userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
          fileInfos: this.fileInfos,
          roadName: this.roadName,
          placeName: this.placeName,
          url: this.url,
          lat: this.x,
          lon: this.y,
        },{
        headers: {
            ACCESS_TOKEN: this.accessToken,
            REFRESH_TOKEN: "noneToken",
          }
        })
        .then(response => {
          if (response.status === 200) {
            // 200 OK 상태 코드 처리
            this.moveList();
          } else {
            // 다른 상태 코드 처리
            alert(response.status);
          }
        }).catch(()=>{
             let msg = "등록 처리시 문제가 발생했습니다.";
             alert(msg);
             });
    },
    modifyArticle() {
      
      http
        .put(`/hotplace/${this.article.id}`,  {
          id: this.article.id,
          //userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
          roadName: this.roadName,
          placeName: this.placeName,
          url: this.url,
          lat: this.x,
          lon: this.y,
          })
        .then(() => {
          // 현재 route를 /list로 변경.
          this.moveList();
        }).catch(() => {    let msg = "수정 중 문제가 발생했습니다."; alert(msg);});

    },
    moveList() {
      this.$router.push({ name: "hotPlaceList" });
    },
    chooseImage() {
      this.$refs.imageInput.click();
    },
    clearFiles() {
        this.$refs['image-input'].reset()
      },
    onFileChange(event) {
      const files = event.target.files;
      this.fileInfos= [];
       this.images= [];
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          console.log("file input method")
          const file = files[i];
          let reader = new FileReader();
         
          var imageData = null;
          reader.onload = (event)=>{
            imageData = {
              url: event.target.result
            };
            this.images.push(imageData)
            // console.log("===========imageData")
            let temp = reader.result;
            this.fileInfos.push(temp);
            console.log("===========change fileInfos")
            console.log(this.fileInfos)
          }
           reader.readAsDataURL(file);
        }
      }
    },
    clearImage() {
     
    },
    fileDeleteButton(e) {
        const name = e.target.getAttribute('name');
        this.files = this.files.filter(data => data.number !== Number(name));
        // console.log(this.files);
    },
    changeAlign(alignEvent){
      this.align = alignEvent
    },
    ...mapActions([Constant.GET_ROUTES, Constant.SET_STARTDATE, Constant.SET_ENDDATE,
		Constant.INITIATE_ROUTE, Constant.GET_PLANS, Constant.INITIATE_PLANS]),

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
    loadMaker(x,y) {
      
			const markerPosition = new window.kakao.maps.LatLng(
				x,
				y
			);

			const marker = new window.kakao.maps.Marker({
				position: markerPosition,
			});

			marker.setMap(this.map);
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
						`<div class="close" onclick="setHotPlaceLoc(${i})" style="font-size : 13px; margin:3px -28px 0 0;">위치선택</div>` +
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
				).catch((response) => {
					if (response == "Error") {
						this.getById()
					}
				});
		},
    setHotPlaceLoc(idx) {
      
			this.roadName = this.items[idx].road_address_name
      this.placeName = this.items[idx].place_name
      this.x = this.items[idx].x
      this.y = this.items[idx].y
      this.url = this.items[idx].place_url
      console.log(this.items[idx])
		},
  },
};
</script>

<style scoped>
#imagebound {
  width: 100%;
  padding: 10px;
  overflow: hidden;
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px auto auto auto;
  border-radius: 1%;
  border: 1px solid rgb(218, 218, 218);
}

.imageelement{
  display: flex;
  align-content: center;
  align-items: center;
}

.btnForm{
  margin: 5px 5px 30px 5px;
  float: right;
}

#map{
  width: 96%;
	height: 200px;
	margin-top: 1%;
	margin-left: -10px;
	padding: 0;
}

.close{
  border-radius: 30%;
}
#cardheader{
  background: rgba(180, 231, 202, 0.342);
  border-radius: 5px;
}

.containImage{
  padding: 10px;
  width: 400px;
  object-fit: cover
}

.searchContainer{
  display: flex;
  justify-content: stretch;
  justify-items: stretch;
    align-items: stretch;
}

.searchBefore{
  text-align: center;
  margin-top: 75px ;
}
</style>
