<template>
    <nav class="navbar navbar-expand-lg navbar-danger bg-info fixed-top">
       <router-link to="/">
           <a class="navbar-brand position text-light" href="#"><i class="fa fa-street-view" style="font-size:25px"></i>HacktivOverFlow</a>
             </router-link>  
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav ">
        <li class="nav-item">
             <router-link to="/question">
          <a class="nav-link text-light" href="#">question <span class="sr-only">(current)</span></a>
             </router-link>
        </li>
      </ul>
    </div>
    <div class="collapse navbar-collapse d-flex flex-row-reverse ">
      <ul class="navbar-nav float-right ">    
        <li class="nav-item"  v-if="$store.state.isLogin">
           <p class="nav-link text-light "> hallo, {{$store.state.nameLogin}}</p>
          </li>   
        <li class="nav-item"  v-if="$store.state.isLogin">
          <router-link to="/question/add">          
          <a class="nav-link text-light btn btn-info" href="#"> new question</a>
          </router-link>
        </li>
        
         <li class="nav-item" v-if="$store.state.isLogin == false">
          <router-link to="/login">
          <a class="nav-link text-light" >login</a>
          </router-link>
        </li>
        <li class="nav-item"  v-else>          
          <a class="nav-link text-light btn " @click="logout" >logout</a>       
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
    props:[
    'ceklogin'
  ],
  methods:{
    logout(){
      console.log('logout')
      localStorage.clear()
      this.$router.push('/login')
       this.$store.commit('loginout', false); 
     
    }
  }
}
</script>


