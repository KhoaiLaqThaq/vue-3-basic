<template>
  <div class="col mb-4">
      <div class="card">
          <img :src="product.url" alt="" class="card-img-top" />
          <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">
                  ${{ product.price }} <br/>
                  <small>{{ product.shortdesc }}</small>
              </p>
              <button
                type="button"
                @click="addToCart()"
                class="btn btn-primary btn-block"
                :disabled="itemAlreadyInCart"
              >
                  {{itemAlreadyInCart? "Added" : "Add to Cart"}}
              </button>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "Product",
    props: [
        'product'
    ],
    setup(props) {
        const store = useStore();

        let cart = computed(function() {
            return store.state.cart;
        });

        let itemAlreadyInCart = computed(function() {
            let inCart = false;

            cart.value.forEach((item: any) => {
                if (item.id === props.product.id) {
                    inCart = true;
                }
            });

            return inCart;
        });

        function addToCart() {
            if (!itemAlreadyInCart.value) {
                store.commit("addCartItem", props.product);
            } else {
                alert("Item Already added to Cart");
            }
        }

        return {
            cart,
            itemAlreadyInCart,
            addToCart
        }
    }
})
</script>

<style>

</style>