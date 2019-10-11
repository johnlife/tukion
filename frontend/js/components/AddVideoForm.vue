<template>
    <v-card class="pa-3 mb-3">
        <v-form v-model="valid" ref="form">
            <v-layout justify-center align-center>
                <v-flex>
                    <v-text-field
                        label="Add Video"
                        :rules="[$rules.required, $rules.supported]"
                        v-model="link"
                    ></v-text-field>
                </v-flex>
                <v-flex xs3 md2 xl1 v-if="valid">
                    <v-btn color="primary" @click="submit">Add</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            link: '',
            rules: {
            }
        }),
        props: {
        },
        computed: {
        },
        methods: {
            submit() {
                this.$store.dispatch("downloadVideo", this.link);
                this.link = '';
                if (this.$refs.form) this.$refs.form.resetValidation();
            },
        },
        mounted() {
        },
        watch: {
        }
    }
</script>
