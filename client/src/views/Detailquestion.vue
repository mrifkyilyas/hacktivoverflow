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
                                  <div style="display:block; float:left">
                                    <a href="" @click.prevent="votes(question._id,'upvotes','question')" class="btn btn-secondary"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a> <h4>{{question.upvotes.length-question.downvotes.length}}</h4>
                                    <a href="" class="btn btn-secondary" @click.prevent="votes(question._id,'downvotes','question')"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
                                    </div>                                    
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
                             <div class="card-footer">
                               <h5>{{question.answers.length}} Answer</h5> 
                               <div v-if="$store.state.idLogin==question.user._id" style="float:right"> <a href="" class="btn btn-danger mr-2" @click.prevent="deleteOne(question._id,'question')"> delete</a>
                                <router-link :to="{ name: 'editquestion', params: { id: question._id }}" >  
                               <a href="" class="btn btn-info">update</a>
                                </router-link>
                               </div>                          
                            </div>
                             <div class="card-head px-2 pt-3" v-for="(answer,index) in question.answers">
                                <a href="#" class="text-dark text-center">
                                  <div style="display:block; float:left">
                                    <a href="" @click.prevent="votes(answer._id,'upvotes','answer')" class="btn btn-secondary"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a> <h4>{{answer.upvotes.length-answer.downvotes.length}}</h4>
                                    <a href="" @click.prevent="votes(answer._id,'downvotes','answer')" class="btn btn-secondary"><i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
                                    </div>
                                    <h4 class="card-title text-align-left">{{answer.title}}</h4>
                                </a>
                                <br>
                                <br>
                                <br>
                                <div class="d-flex justify-content-between px-2">
                                   
                                    <p><small>{{answer.updatedAt}}</small></p>
                                     <p class="card-text">{{
                                    answer.description}}
                                </p>
                                <br>                              
                                </div>
                                 <p><small>answer by: {{answer.user.name}}</small></p>
                                  <div v-if="$store.state.idLogin==answer.user._id" style="float:right"> <a href="" class="btn btn-danger mr-2" @click.prevent="deleteOne(answer._id,'answer')">delete</a>
                                   <router-link :to="{ name: 'editanswer', params: { id: answer._id }}" >    <a href="" class="btn btn-info">update</a>
                                   </router-link>
                                   </div> 
                                <br> 
                                
                                  <hr width="75%">
                                
                            </div>    
                              <div class="card-footer" v-if="$store.state.isLogin">
                                <div class="form-group">
                                  <label for="exampleInputTitle">Title</label>
                                  <input v-model="titleAnswer" type="Title" class="form-control" id="exampleInputTitle" aria-describedby="TitleHelp"
                                    placeholder="Enter Title">
                                </div>
                                <wysiwyg v-model="descriptionAnswer"></wysiwyg>
                                  <button type="submit" class="btn btn-primary" @click.prevent="addAnswer">addAnswer</button>
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
        },
        votes(params,command,model){
          console.log(model)
          let url = `${serverUrl}/${model}/${command}/${params}`
          console.log(url,'ini params')
          axios.post(url,{},{
            headers:{
                access_token : localStorage.access_token
            }
          })
            .then(({ data }) => {
              console.log('berhasil')
              this.getdata()
              this.$router.push(`/question/${this.$route.params.id}`)                      
           })
            .catch(err => {
              console.log(err.responds)
                   
              console.log(err)                 
            })
        },
        deleteOne(params,model){
          let url = `${serverUrl}/${model}/${params}`
          console.log(url)
            axios.delete(url,{
            headers:{
                access_token : localStorage.access_token
            }
          })
           .then(({ data }) => {
              console.log('berhasil')
              this.getdata()
             if(model=='question'){
                this.$router.push(`/question`)      
             }else{
               this.$router.push(`/question/${this.$route.params.id}`)
             }                
           })
            .catch(err => {
              console.log(err.responds)
                   
              console.log(err)                 
            })

        }
        
   }

}
</script>

