<template>
      <div class="register-login-section spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                        <div class="register-form">
                            <h2>Register</h2>
                            <form action="#">
                                <div class="group-input">
                                    <label for="username">Username atau email  *</label>
                                    <input type="text" id="username">
                                </div>
                                <div class="group-input">
                                    <label for="pass">Password *</label>
                                    <input type="text" id="pass">
                                </div>
                                <div class="group-input">
                                    <label for="con-pass">Konfirmasi Password *</label>
                                    <input type="text" id="con-pass">
                                </div>
                                <button type="submit" class="site-btn register-btn">REGISTER</button>
                            </form>
                            <div class="switch-login">
                                <a href="/login.html" class="or-login"> Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
        Login: function(){
            let email = this.email 
            let password = this.password
            this.$store.dispatch('login', { email, password })
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        }
    }
}
</script>



//v model utnuk mengirim sebuah input agar bisa dikirim ke api/server
//let variabel baru  
//vuex menyimpan data analogi sot session di php