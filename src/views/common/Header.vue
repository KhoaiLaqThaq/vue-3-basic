<template>
    <div id="id">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <router-link to="/" class="navbar-brand">Logo Learning</router-link>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/shop" class="nav-link">Checkout to cart</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">About me</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Header"
});
</script>
