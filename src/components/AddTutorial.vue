<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="tutorial.title"
                    name="title"
                 />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tutorial.description"
                    name="description"
                />
            </div>

            <button class="btn btn-success" @click="saveTutorial">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TutorialDataService from '@/services/TutorialDataService';
import Tutorial from '@/types/Tutorial';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
    name: 'add-tutorial',
    data() {
        return {
            tutorial: {
                id: null,
                title: "",
                description: "",
                published: false
            } as Tutorial,
            submitted: false
        };
    },
    methods: {
        saveTutorial: function () {
            var data = {
                title: this.tutorial.title,
                description: this.tutorial.description
            };

            TutorialDataService.create(data)
                .then((response: ResponseData) => {
                    this.tutorial.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        newTutorial: function() {
            this.submitted = false;
            this.tutorial = {} as Tutorial;
        }
    }
});
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>
