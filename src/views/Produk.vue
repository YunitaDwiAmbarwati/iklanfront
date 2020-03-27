<template>

    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row">
                    <div class="col-lg-6">
                        <div class="product-pic-zoom">
                           <a class="product-big-img" href="index.html"><img src="assets/img/product-single/product-1.jpg"></a>
                            
                            <div class="zoom-icon">
                                <i class="fa fa-search-plus"></i>
                            </div>
                        </div>
                        <a class ="product-thumbs">
                            <a class="product-thumbs-track ps-slider owl-carousel">
                                <a class="pt active" data-imgbigurl="assets/img/product-single/product-1.jpg" href="index.html"><img src="assets/img/product-single/product-1.jpg" ></a>
                                <a class="pt" data-imgbigurl="assets/img/product-single/product-2.jpg"><img src="assets/img/product-single/product-2.jpg" alt=""></a>
                                <a class="pt" data-imgbigurl="assets/img/product-single/product-3.jpg"><img src="assets/img/product-single/product-3.jpg" alt=""></a>
                                <a class="pt" data-imgbigurl="assets/img/product-single/product-3.jpg"><img src="assets/img/product-single/product-3.jpg" alt=""></a>
                            </a>
                        </a>
                    </div>
                    <div class="col-lg-6">
                        <div class="product-details">
                            <div class="pd-title">
                                <span>Mobil</span>
                                <h3>Honda Brio</h3>
                                <a href="#" class="heart-icon"><i class="icon_heart_alt"></i></a>
                            </div>
                            <div class="pd-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                                <span>(5)</span>
                            </div>
                            <div class="pd-desc">

                                <h4>Rp195.000.000 <span>629.99</span></h4>
                            </div>


                            <div class="quantity">
                                <div class="pro-qty">
                                    <input type="text" value="1">
                                </div>
                                <a href="#" class="primary-btn pd-cart">Pasang Iklan </a>
                            </div>
                            <ul class="pd-tags">
                                <li><span>Deskripsi</span> 
                                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in</p></li>

                                <li><span>Lokasi</span> 
                                    <p> Sleman, Yogyakarta, Indonesia</p></li>

                            </ul>
                            </div>

                        </div>
                    </div>
                </div>
                </section>
               
                    <!-- <div class="tab-item-content">
                        <div class="tab-content">
                            <div class="tab-pane fade-in active" id="tab-1" role="tabpanel">
                                <div class="product-content">
                                    <div class="row">
                                        <div class="col-lg-7">
                                            <h5></h5>
                                            <p> </p>

                                        </div>

                                    </div>
                                </div>
                            </div>

                         
                        </div>
                    </div>   -->
</template>
<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id_siswa: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      data_poin: [],
      detail_poin: [],
      fields: ["nis", "nama_siswa", "kelas","total_poin", "Aksi"],
      fields_detail: ["tanggal", "nama_pelanggaran", "kategori", "keterangan","poin"],
    }
  },
  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/poin_siswa/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.data_poin = response.data.poin;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data poin pelanggaran semua siswa."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },
    Detail : function(item){
    let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.axios.get("/poin_siswa/" + item.id, conf)
      .then(response => {
      this.detail_poin = response.data.detail
      })
    },
    
    searching : function(){
    let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
          let offset = (this.currentPage - 1) * this.perPage;
          this.$bvToast.show("loadingToast");
          let form = new FormData();
          form.append("find", this.search);
          this.axios.post("/poin_siswa/" + this.perPage + "/" + offset, form, conf)
          .then(response => {
            // if(response.data.status == 1){
              this.$bvToast.hide("loadingToast");
              this.data_poin = response.data.poin;
              this.rows = response.data.count;
            // } else {
            //   window.location = "/poinsiswa";
            // }
          })
          .catch(error => {
              console.log(error);
          });
          // console.log('abc')
    },
    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.search();
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>