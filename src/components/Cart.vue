<template>
	<div class="card">
		<div class="card-header">
			<h5 class="card-title">Your cart</h5>
		</div>
		<div class="card-body">
			<p v-if="cart.length === 0">
				Your Cart is Empty
			</p>
			<ul class="list-group list-group-flush">
				<li
					v-for="item in cart"
					:key="item.id"
					class="list-group-item d-flex justify-content-between align-items-center"
				>
					{{ item.name }}
					<span class="badge badge-primary badge-pill">{{ item.quantity }}</span>
				</li>
				<li class="list-group-item d-flex justity-content-between align-items center">
					Price &nbsp; <b>${{ totalPrice }}</b>
				</li>
			</ul>
		</div>
		<div class="card-body">
			<router-link
				to="/shop"
				class="btn btn-primary btn-block"
			>
				Checkout
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	name: "Cart",
	setup() {
		const store = useStore();

		let cart = computed(function() {
			return store.state.cart;
		});

		let totalPrice = computed(function() {
			return cart.value.reduce((total: any, next: any) => {
				return total + (next.quantity * next.price)
			}, 0)
		});

		return {
			cart,
			totalPrice
		}
	},
});
</script>
