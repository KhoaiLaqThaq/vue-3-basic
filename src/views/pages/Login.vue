<template>
	<div class="col-md-12">
		<div class="card card-container">
			<img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
			<Form @submit="handleLogin">
				<div class="form-group">
					<label for="username">Username</label>
					<Field name="username" type="text" class="form-control" />
					<ErrorMessage class="error-feedback" name="username"></ErrorMessage>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<Field class="form-control" name="password" type="password" />
					<ErrorMessage name="password" class="error-feedback" />
				</div>
				<div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
				<div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
			</Form>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';
import {
	Form,
	Field,
	ErrorMessage
} from 'vee-validate';
import * as yup from "yup";

export default defineComponent({
	name: "Login",
	components: {
		Form,
		Field,
		ErrorMessage
	},
	setup() {
		const store = useStore();
		const router = useRouter()
		let loading = false;
		let message = ref("");
		const schema = yup.object().shape({
			username: yup.string().required("Username is required!"),
			password: yup.string().required("Password is required!"),
		});
		
		let loggedIn = computed(() => store.state.authState.status.loggedIn);

		function handleLogin(user: any) {
			loading = true;
			store.dispatch('authState/login', user)
				.then(() => {
					router.push('/profile');
				}),
				(error: any) => {
					loading = false;
					message = 
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
				}
		}

		return {
			loggedIn,
			message,
			loading,
			schema,
			handleLogin
		}
	},
	created() {
		if (this.loggedIn) {
			this.$router.push('/profile');
		}
	},
})
</script>

<style>

</style>