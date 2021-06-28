<template>
	<div v-if="currentTutorial" class="edit-form">
		<h1>Tutorial</h1>
		<div class="badge badge-danger" v-if="isCheckLoading">
			Not found this tutorial!
			<button
				type="button"
				class="btn btn-primary"
				@click="backtoTutorials"
			>
				Back
			</button>
		</div>
		<div class="row" v-else>
			<form class="col-12">
				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" class="form-control" id="title"
							v-model="currentTutorial.title"
					/>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea
							type="text"
							class="form-control"
							id="description"
							v-model="currentTutorial.description"
					></textarea>
				</div>

				<div class="form-group">
					<label><strong>Status:</strong></label>
					{{ currentTutorial.published ? "Published" : "Pending" }}
				</div>
			</form>

			<div class="col-12">
				<button
					type="button"
					class="btn btn-primary mr-2"
					v-if="currentTutorial.published"
					@click="updatePublished(false)"
				>
					UnPublish
				</button>
				<button
					type="button"
					v-else class="btn btn-primary mr-2"
					@click="updatePublished(true)"
				>
					Publish
				</button>

				<button
					type="button"
					class="btn btn-danger mr-2"
					@click="deleteTutorial"
				>
					Delete
				</button>

				<button
					type="submit"
					class="btn btn-success"
					@click="updateTutorial"
				>
					Update
				</button>

				<button
					type="button"
					class="btn btn-primary"
					@click="backtoTutorials"
				>
					Back
				</button>
			</div>
			<p>{{ message }}</p>
		</div>
	</div>

	<div v-else>
		<br />
		<p>Please click on a Tutorial...</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TutorialDataService from '@/services/TutorialDataService';
import Tutorial from '@/types/Tutorial';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
    name: 'tutorial',
    data() {
        return {
            currentTutorial: {} as Tutorial,
            message: '',
            isCheckLoading: false
        };
    },
    methods: {
        getTutorial: function(id: any) {
            TutorialDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentTutorial = response.data;
                    console.log(response.data);
                    if (response.data == null) {
                        this.isCheckLoading = true;
                    }
                })
                .catch((e: Error) => {
                    this.isCheckLoading = true;
                    console.log(e);
                });
        },

        updatePublished: function(status: boolean) {
            var data = {
                id: this.currentTutorial.id,
                title: this.currentTutorial.title,
                description: this.currentTutorial.description,
                published: status
            };

            TutorialDataService.update(this.currentTutorial.id, data)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.currentTutorial.published = status;
                    this.message = 'The status was updated successfully!';
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        updateTutorial: function() {
            TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.message = 'The tutorial was updated successfully!';
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        deleteTutorial() {
            TutorialDataService.delete(this.currentTutorial.id)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.backtoTutorials();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        backtoTutorials: function() {
            this.$router.push({ path: "/" });
        }
    },
		beforeMount: function() {
			this.getTutorial(this.$route.params.id);
		},
    mounted() {
        this.message = '';
    }
});
</script>

<style>
.edit-form {
    max-width: 500px;
    margin: auto;
}
</style>
