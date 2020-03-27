<template>
    <header class="header-section">
    <div class="container">
            <div class="inner-header">
                <div class="row">
                    <div class="col-lg-2 col-md-2">
                        <div class="logo">
                            <a href="./index.html">
                               <a class="navbar-brand brand-logo" href="index.html"><img src="assets/img/logo.png"></a>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-8">
                        <div class="advanced-search">
                            <button type="button" class="category-btn">Kategori</button>
                            <div class="input-group">
                                <input type="text" placeholder="Temukan Produk...">
                                <button type="button"><i class="ti-search"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 text-right col-md-7">
                        <ul class="nav-right">
                            <li class="heart-icon">
                                <a href="login.html">
                                    <i class=""></i>Login</a>
                            </li>
                            <li class="cart-icon">
                                <a href="#">
                                    <i class="icon_bag_alt"></i>Jual
                                    <!-- <span>3</span> -->
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-item ">
            <div class="container ">
                <div class="nav-depart ">
                    <div class="depart-btn ">
                        <i class="ti-menu "></i>
                        <span>Semua Kategori</span>
                        <ul class="depart-hover ">
                            <li class="active "><a href="# ">Mobil</a></li>
                            <li><a href="# ">Motor</a></li>

                        </ul>
                    </div>
                </div>

                <div id="mobile-menu-wrap "></div>
            </div>
        </div>
    </header>


</template>

<script>
export default {
    name: 'navbar',
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          let form = new FormData();
          this.axios.post('/logout', form, conf).then(response => {
            if (response.data.logged === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },
  },
}
</script>