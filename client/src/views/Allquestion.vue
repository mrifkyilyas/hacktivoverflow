<template>
 <div>
   <br>
   <br>
  <br>
  <br>
  <br>
  <br>
  <div class="container-fluid py-10 row ">
    <div class="card text-left col-9 mx-auto py-10"> 
      <div class="card-body">
        <table class="table">
          <tbody>            
            <tr v-for="(question,index) in questions"  :key="index">
               <router-link :to="{ name: 'detailquestion', params: { id: question._id }}" >
              <td>{{question.upvotes.length - question.downvotes.length }} votes</td>
               </router-link>
               <router-link :to="{ name: 'detailquestion', params: { id: question._id }}" >
              <td>{{question.answers.length}} answer
              </td>
               </router-link>
                <router-link :to="{ name: 'detailquestion', params: { id: question._id }}" >
              <td>{{question.title}}</td>
                  </router-link>  
                  <td>{{moment(question.createdAt).fromNow()}}</td>   
                   <router-link :to="{ name: 'detailuser', params: { id: question.user._id }}" >
              <td>{{question.user.name}}</td>
              </router-link>       
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
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
  data(){
    return{
      questions  : [],
      vote: 0
    } 

  },
  created(){
       axios.get(`${serverUrl}/question`)
       .then(({data})=>{
         this.questions = data.reverse()      
       })
       .catch(err=>{
         console.log(err)
       })
  },
  methods:{
    detail(id){
       this.$router.push(`/question/${id}` )
       console.log(id)
    },
      moment: function (date) {
      return moment(date);
    },
  },
 

  
}
</script>

