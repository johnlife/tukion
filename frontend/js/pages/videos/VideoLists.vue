<template>
    <div>
        <v-select
            :items="lists"
            item-text="title"
            return-object
            label="List"
            v-model="current"
            append-outer-icon="add_circle_outline"
            @click:append-outer="showAddDialog"
        />
        <v-dialog
            v-model="dialog.visible"
            max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Add Video List</v-card-title>

                <v-card-text>
                    <v-text-field
                        label="List Title"
                        :rules="[$rules.required]"
                        v-model="dialog.title"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        flat="flat"
                        @click="cancel"
                        >
                        Cancel
                    </v-btn>

                    <v-btn
                        color="primary"
                        flat="flat"
                        @click="submit"
                        >
                        Create
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data: () => ({
            dialog: {
                visible: false,
                title: '',
            }
        }),
        props: {
        },
        computed: {
            ...mapState({
                lists: state => state.lists.lists,
            }),
            current: {
                get() {
                    return this.$store.state.lists.current;
                },
                set(newCurrent) {
                    this.$store.commit("selectList", newCurrent);
                }
            }
        },
        methods: {
            showAddDialog() {
                this.dialog.visible = true;
            },
            cancel() {
                this.dialog.visible = false;
                this.dialog.title = '';
            },
            submit() {
                this.$store.dispatch("createList", this.dialog.title);
                this.cancel(); //close and cleanup
            }
        },
        mounted() {
        },
        watch: {
        }
    }
</script>
