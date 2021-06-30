<template>
  <div class="home-container">
        <div class="row">
            <div class="col-md-8 pt-5" v-if="cart.length > 0">
                <CartItem
                    v-for="product in cart"
                    :product="product"
                    :key="product.id"
                />
            </div>
            <div class="col-md-8 pt-5" v-else>
                <p class="text-center d-block">Your cart is empty!</p>
                <router-link to="/" class="btn btn-primary btn-block">
                    Buy now!
                </router-link>
            </div>
            <div class="col-md-4 pt-5">
                <Cart />
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import CartItem from "@/components/CartItem.vue";
import Cart from "@/components/Cart.vue";

export default defineComponent({
    name: "ShoppingCart",
    components: {
        CartItem,
        Cart
    },
    setup() {
        const store = useStore();

        let cart = computed(function() {
            return store.state.cart;
        });

        return {
            cart
        }
    }
});
</script>