var app = new Vue({
    el:'#app',
    data:{
        product:'Boots',
        description:'These are my cowboy boots',
        image:'./brownBoots.jpeg',
        link: "https://v3.vuejs.org/",
       inventory: 0,
       onSale: true,
       details:["80% leather", "20% faux", "Gender-neutral"],
       variants:[
           {
               id: 25,
               color: 'brown',
               image:"./brownBoots.jpeg"
            },
           {
               id: 38,
               color: "black",
               image:"./blackBoots.jpeg"
           }
       ],
       sizes:["UK size 40", "UK size 38", "US size 10", "US size 11"],
       cart: 0
    }, 
    methods:{
        addToCart() {
            this.cart += 1;
        },
        updateProduct(img) {
            this.image = img
        },
        removeFromCart(){
            if(this.cart === 0){
                this.cart = 0
            } else {
                this.cart -= 1;
            }
        }
    }
})