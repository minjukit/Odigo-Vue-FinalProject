<template>

  <b-row class="mb-1">
  
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">

        <b-form-group
          id="title-group"
          label="제목:"
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
          <b-button-toolbar class="ml-0.5">
          <b-button-group class="mr-1" @click="chooseImage">
            <input
              type="file"
              style="display: none"
              ref="imageInput"
              accept="image/png,image/jpeg,image/jpg"
              @change="onFileChange"
              multiple files
            />
          <b-button title="New File" >
            <b-icon icon="camera" aria-hidden="true"></b-icon>
            &nbsp;사진
          </b-button>
          
          <b-button title="New loc">
            <b-icon icon="map" aria-hidden="true"></b-icon>
             &nbsp;위치
          </b-button>
          </b-button-group>
          
          <b-button-group class="mr-1">
            <b-button title="Align left">
              <b-icon icon="text-left" aria-hidden="true"></b-icon>
            </b-button>
            <b-button title="Align center">
              <b-icon icon="text-center" aria-hidden="true"></b-icon>
            </b-button>
            <b-button title="Align right">
              <b-icon icon="text-right" aria-hidden="true"></b-icon>
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
          ></b-form-textarea>
           
        </b-form-group>
        
      
        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="danger" class="m-1">초기화</b-button>


        
        <div id="imagebound">
          <div v-for ="image in images" :key = "image.url" class="imageelement" >
            <img :src="image.url"  max-width= "1000" height="auto">
          </div>
        </div>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/util/http-common.js";

export default {
  name: "BoardInputItem",
  
  data() {
    return {
      article: {
        id: 0,
        user: "",
        title: "",
        content: "",
         
      },
      isUserid: false,
      //file: null,
      files: [], //업로드용 파일
      images: [],
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      console.log(this.type)
      http.get(`/board/${this.$route.params.id}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        console.log(data)
        this.article = data
        // this.article = {...data}
        // this.id = data.id;
        // this.title = data.title;
        // this.content = data.content;
        // console.log(this.article.title)
      });
      //this.isUserid = true;
    }
    // console.log("데이터왜안나와")
    // console.log(this.article.title)
    // console.log(this.article)
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
      this.article.id = 0;
      this.article.title = "";
      this.article.content = "";
      this.$router.push({ name: "boardList" });
    },
    registArticle() {
      console.log(this.article);
      http
        .post(`/board`, {
          userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
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
        .put(`/board/${this.article.id}`,  {
          id: this.article.id,
          //userid: this.article.userid,
          title: this.article.title,
          content: this.article.content,
        })
        .then(() => {
          // 현재 route를 /list로 변경.
          this.moveList();
        }).catch(() => {    let msg = "수정 중 문제가 발생했습니다."; alert(msg);});

    },
    moveList() {
      this.$router.push({ name: "HotPlaceList" });
    },
    chooseImage() {
      this.$refs.imageInput.click();
    },
    clearFiles() {
        this.$refs['image-input'].reset()
      },
    onFileChange(event) {
      const files = event.target.files;

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          console.log("file input method")
          const file = files[i];
          const reader = new FileReader();
          var imageData = null;
          reader.onload = (event)=>{
            imageData = {
              url: event.target.result
            };
            this.images.push(imageData)
          }
          console.log("===========imageData")
          console.log(imageData)

          console.log(this.images)
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
  },
};
</script>

<style scoped>
#imagebound {
  width: 100%;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 30px auto auto auto;
  border-radius: 1%;
  border: 1px solid rgb(218, 218, 218);
}

.imageelement{
  display: flex;
  align-content: center;
  align-items: center;
}
</style>
