<template>

 <div class="register-login-section spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 offset-lg-3">
                    <div class="login-form">
                        <h2>Login</h2>
                          <form class="pt-3" v-on:submit.prevent="Login">
                            <div class="group-input">
                                <label for="username">Email *</label>
                                <input type="email" class="form-control-lg border-left-0" id="input_email" name="input_email" placeholder="Masukkan email"  v-model="email" required>
                            </div>
                            <div class="group-input">
                                <label for="pass">Password *</label>
                                <input type="password" class="form-control-lg border-left-0" id="input_password" name="input_password" placeholder="Masukkan kata sandi" v-model="password"  required>
                            </div>
                            <div class="group-input gi-check">
                                <div class="gi-more">
                                    <label for="save-pass">
                                        Simpan Password
                                        <input type="checkbox" id="save-pass">
                                        <span class="checkmark"></span>
                                    </label>
                                    <a href="#" class="forget-pass">Lupa Password</a>
                                </div>
                            </div>
                            <div class="my-3">  
                            <input type="submit" href="#pablo" name="login" class="site-btn login-btn" value="LOGIN">
                             </div>
                        </form>
                        <div class="switch-login">
                            <a href="/register" class="or-login">Daftar</a>
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