<template>
    <div class="row cart-item-row">
        <div class="col-md-6">
            <Product :product="product" />
        </div>
        <div class="col-md-4">
            <div class="row">
                <div class="col-md-5">
                    <button
                        type="button"
                        @click="changeQuantity()"
                        class="btn btn-primary btn-block"
                    >
                        +
                    </button>
                </div>
                <div class="col-md-2 text-center">{{ itemQuantity }}</div>
                <div class="col-md-5">
                    <button
                        type="button"
                        @click="changeQuantity('decrease')"
                        class="btn btn-warning btn-block"
                    >
                        -
                    </button>
                </div>
            </div>
            <div class="row cart-remove-button">
                <div class="col-md-12">
                    <button
                        type="button"
                        @click="removeItem()"
                        class="btn btn-danger btn-block"
                    >
                        Remove Item
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Product from "@/components/Product.vue";

export default defineComponent({
    name: "CartItem",
    props: [
        'product'
    ],
    components: {
        Product
    },
    setup(props) {
        const store = useStore();

        let cart = computed(function() {
            return store.state.cart;
        });

        let itemQuantity = computed(function() {
            let getProduct = cart.value.filter((item: any) => item.id === props.product.id);
            console.log("currentProduct: ", getProduct[0]);
            
            return getProduct[0].quantity;
        });

        function changeQuantity(action = 'add') {
            if (action === 'add') {
                console.log("increase: ", props.product);
                
                store.commit("increasementProductQuantity", props.product);
                store.commit("updateCartItem", props.product);
            } else {
                if (props.product.quantity > 1) {
                    store.commit("decreasementProductQuantity", props.product);
                    store.commit("updateCartItem", props.product);
                } else {
                    store.commit("removeCartItem", props.product);
                }
            }
        }

        function removeItem() {
            store.commit("removeCartItem", props.product);
        }

        return {
            cart,
            itemQuantity,
            changeQuantity,
            removeItem
        }
    } 
});
</script>

<style>
.cart-item-row {
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
}
.cart-remove-button {
    margin-top: 20px;
}

</style>