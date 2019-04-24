<template>
 <div>
     <br>
     <br>
     
     <br>
     <br>
       <div class="row">
                    <div class="col-8 mx-auto mb-30" style="width:40rem;">
                        <div class="card ">
                            <div class="card-head px-2 pt-3">
                                <a href="#" class="text-dark text-center">
                                    <h2 class="card-title">{{question.title}}</h2>
                                </a>
                                <div class="d-flex justify-content-between px-2">
                                    <p><small>question by: {{question.user.name}}</small></p>
                                    <p><small>{{question.updatedAt}}</small></p>
                                </div>

                            </div>
                            
                            <div class="card-body">
                                <p class="card-text">{{
                                    question.description}}
                                </p>
                            </div>
                             <div class="card-footer" v-if="islogin">
                                <div class="form-group">
                                  <label for="exampleInputTitle">Title</label>
                                  <input v-model="titleAnswer" type="Title" class="form-control" id="exampleInputTitle" aria-describedby="TitleHelp"
                                    placeholder="Enter Title">
                                </div>
                                <wysiwyg v-model="descriptionAnswer"></wysiwyg>
                                  <button type="submit" class="btn btn-primary" @click.prevent="addAnswer">addAnswer</button>
                            </div>
                             <div class="card-head px-2 pt-3" v-for="(answer,index) in question.answers">
                                <a href="#" class="text-dark text-center">
                                    <h4 class="card-title text-align-left">{{answer.title}}</h4>
                                </a>
                                <div class="d-flex justify-content-between px-2">
                                    <p><small>answer by: {{answer.user.name}}</small></p>
                                    <p><small>{{answer.updatedAt}}</small></p>
                                     <p class="card-text">{{
                                    answer.description}}
                                </p>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
                </br>
                </br>
 </div>
</template>

<script>
import axios from 'axios'
import { constants } from 'crypto';
const serverUrl = 'http://localhost:3000'
export default{
     props: [
    'ceklogin'
  ],
  name: 'detailQuestion',
   components: {
          wysiwyg: vueWysiwyg.default.component,
  },
  data(){
      return {
          question: {},
          descriptionAnswer: '',
          islogin : false,
          titleAnswer : ''
      }
  },
  mounted(){
    this.loginGak(),
    this.getdata()
    // console.log($route.params.id)
        
  },
    methods:{
        getdata(){
        axios.get(`${serverUrl}/question/${this.$route.params.id}`,{
         headers:{
           access_token : localStorage.access_token
         }
       })
       .then(({data})=>{
         console.log(data)
        this.question = data         
         })
       .catch(err=>{
         console.log(err)
       })
       

        },
        addAnswer(){
            axios.post(`${serverUrl}/answer/`, {
            title: this.titleAnswer,
            description: this.descriptionAnswer,
            question:this.$route.params.id
        },{
            headers:{
                access_token : localStorage.access_token
            }
        })
            .then(({ data }) => {
              console.log('berhasil')
              this.descriptionAnswer=""
              this.titleAnswer=""    
              this.getdata()
              this.$router.push(`/question/${this.$route.params.id}`)                      
           })
            .catch(err => {
              this.descriptionAnswer=""
              this.titleAnswer=""    
                   
              console.log(err)                 
            })
        },
        loginGak() {
           if (localStorage.getItem('access_token')) {
            this.islogin = true
           }        
        }
        
        
        
   }

}
</script>

