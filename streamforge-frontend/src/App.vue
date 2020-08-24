<template>
  <main id="vue">
    <div id="in">
      <input v-model="username" type="text" placeholder="Enter your twitch name...">
      <button @click="fetch">Submit</button>
    </div>

    <div v-if="loading" class="gradient loading"></div>
    <div v-if="error" class="error"><p>{{error}}</p></div>

    <div id="out" v-if="followCount">
      <p>{{username}}</p>   
      <p>Follower Count: {{followCount}}</p>
    </div>
  </main>

</template>

<script>

export default {
  name: 'App',
  data:function(){
    return {
      username:"",
      followCount:0,
      loading:false,
      error:""
    }
  },
  methods:{
    fetch(){
      this.loading = true
      this.error  = ""
      this.followCount = 0

      fetch(`http://localhost:80/twitch/${this.username}`).then(res=>res.json()).then(data=>{
        this.loading = false
    
        if(data.error){
          this.error = data.error
        }else{
          this.followCount = data.followers
        }
        
      })
    }
  }
}
</script>

<style lang="scss">
html,body,#app{
  height: 100%;
  width: 100%;
  margin: 0;
}

#vue{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #in{
    margin-bottom: 40px;

    input,button{
      border:2px solid black;
      padding:25px;
      background: transparent;
    }

    input{
      width: 65%;
    }

    button{
      width: 23%;
      cursor:pointer;
    }
    button:hover{
      color:white;
      background: black;
    }
  }

  #out{
    border:2px solid black;
    
    padding:25px;
    box-sizing: border-box;
    
    p{
      margin:0;
    }
  }

  .loading{
    height: 70px;
  }
  .error{
    height: 70px;
    color:maroon;
    font-weight:bold;
    background: #f006;
    border:2px solid maroon;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.gradient {
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #f4f4f4 38%, #fafafa 54%);
    background-size: 1000px 640px;
    
    position: relative;
    
}

@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

::placeholder {
  opacity: 1;
}

</style>
