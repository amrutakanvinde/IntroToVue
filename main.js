Vue.component('product',{
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img :src="image" :alt="description" />
    </div>
    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 &&inventory > 0">Almost sold out!</p>
        <p v-else
            :class="{outOfStock: !inStock}">Out of Stock</p>
        <!-- <span v-show="onSale">On Sale!!</span> -->
        <p>{{ printSale }}</p>
        <productDetails :details="details"></productDetails>
        <div v-for="(variant, index) in variants" 
        :key = "variant.id"
        class = "color-box"
        :style = "{ backgroundColor: variant.color }"
        @mouseover="updateProduct(index)">
        </div>
        <ul>
            <li v-for="x in sizes">{{ x }}</li>
        </ul>
        <p>Shipping: {{ shipping }}</p>
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{disabledButton: !inStock}">
                Add to cart</button>
        <button @click="removeFromCart">Remove</button>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews</p>
            <ul>
                <li v-for="review in reviews">
                    <p> {{ review.name }} </p>
                    <p> Rating: {{ review.rating }} </p>
                    <p> {{ review.review }} </p>
                </li>
            </ul>
        </div>
        <productReview @review-submitted="addReview"></productReview>
        
    </div>
</div>
    `,
    data() {
        return {
            product:'Boots',
        description:'These are my cowboy boots',
        brand:"Vue Mastery",
        selectedVariant : 0,
        link: "https://v3.vuejs.org/",
       inventory: 0,
       onSale: true,
       details:["80% leather", "20% faux", "Gender-neutral"],
       variants:[
           {
               id: 25,
               color: 'brown',
               image:"./assets/brownBoots.jpeg",
               quantity: 10
            },
           {
               id: 38,
               color: "black",
               image:"./assets/blackBoots.jpeg", 
               quantity: 0
           }
       ],
       sizes:["UK size 40", "UK size 38", "US size 10", "US size 11"],
       reviews:[]
        }
    }, 
    methods:{
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
            
        },
        addReview(productReview){
            this.reviews.push(productReview)
            console.log("Here", this.reviews)
        }
    },
    computed:{
        title() {
            return this.brand + ' '     + this. product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        printSale(){
            if(this.onSale){
                return this.brand + ' ' + this.product + ' are on sale'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping() {
            if(this.premium){
                return "Free"
            }
            return "$2.99"
        }
    }
})

Vue.component('productDetails',{
    props:{
        details:{
            type: Array
        }
    },
    template: `
        <div>
            <ul>
             <li v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
    `
})

Vue.component("productReview", {
    template:`
    
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview={
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit("review-submitted", productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            
            }
        }
    }
})

var app = new Vue({
    el:'#app',
    data:{
        premium: false,
        cart: []
    }, 
    methods:{
        updateCart(id) {
            this.cart.push(id)
        },
        updateRemove(id){
            for(let i = this.cart.length - 1; i>=0; i--){
                if(this.cart[i] === id){
                    this.cart.splice(i,1);
                } 
            }
        }
    },
    computed:{
        
    }
})