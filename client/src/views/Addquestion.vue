<template>
<div>
  <br>
  <br>
  <br>
  <div class="container-fluid py-8 row ">
    <div class="card text-left col-6 mx-auto py-10">
      <div class="card-body">
        <form>
          <h1>Add new Question</h1>
          <div class="form-group">
            <label for="exampleInputTitle">Title</label>
            <input v-model="title" type="Title" class="form-control" id="exampleInputTitle" aria-describedby="TitleHelp"
              placeholder="Enter Title">
          </div>
           <div class="form-group">
            <label for="exampleInputDescription">Description</label>
            <wysiwyg v-model="text"></wysiwyg>
          </div>          
          <button type="submit" class="btn btn-primary" @click.prevent="addQuestion">addQuestion</button>
        </form>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>
  </div>
</template>
<script>
import axios from 'axios'
import { constants } from 'crypto';
const serverUrl = 'http://localhost:3000'
export default {
  props:['islogin'],
  components: {
          wysiwyg: vueWysiwyg.default.component,
  },
  data() {
          return {
              text:'',
              title:''
          };
  }, 
  methods:{
    addQuestion() {   
      console.log(this.title,this.text)
        axios.post(`${serverUrl}/question/`, {
            title: this.title,
            description: this.text
        },{
            headers:{
                access_token : localStorage.access_token
            }
        })
            .then(({ data }) => {
              console.log('berhasil')
              this.text=""
              this.title=""                            
           })
            .catch(err => {
              this.text=""
               this.title=""     
              console.log(err)                 
            })
    }
  }    
}
</script>